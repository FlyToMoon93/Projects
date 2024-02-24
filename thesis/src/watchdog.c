/**
 * The watchdog supervises the controller,
 * receiving error messages through a message queue from the controller,
 * and takes appropriate actions in response to ensure the controller is in a safe state.
**/
#include "../headers/watchdog.h"
#include "../headers/config.h"

bool isCoolingSystemActivated;
bool watchdogStarted;
pid_t newControllerPID;
bool setNewControllerPID;

void watchdogProcess(int messageQueueID, pid_t watchdogPID, pid_t controllerPID) {

    if (ENABLE_PRINT_SYMBOL) { printSymbol(LENGTH_SYMBOL_SIZE); }
    printf(PREFIX_WATCHDOG DARK_GREEN_COLOR"is active with PID: %d"RESET_COLOR"\n", watchdogPID);
    setNewControllerPID = false;
    watchdogStarted = true;
    // Get the current time
    time_t startTime = getCurrentTimeInMilliseconds();
    while (true) {
        Message message;
        if (setNewControllerPID) { controllerPID = newControllerPID; }
        // Get the current time
        time_t currentTime = getCurrentTimeInMilliseconds();

        // Calculate the time elapsed since the start
        long long elapsedTime = currentTime - startTime;
        if (elapsedTime > MAX_TIME_THRESHOLD * 1000) {
            printf(PREFIX_WATCHDOG BLUE_COLOR"Expected response time from controller: %d milliseconds, current time: %lld milliseconds\n"RESET_COLOR,
                   MAX_TIME_THRESHOLD * 1000, elapsedTime);
            startTime = currentTime; // Reset the start time
            restoreSafeState(messageQueueID, controllerPID);
        }
        if (msgrcv(messageQueueID, &message, sizeof(Error), 1, IPC_NOWAIT) != -1) {
            if (message.error.errorCode == TRIGGERING) {
                printf(PREFIX_WATCHDOG YELLOW_COLOR"with PID: %d received a message from the controller with PID: %d : %s\n"RESET_COLOR,
                       watchdogPID, controllerPID, toString(message.error.errorCode));
                startTime = currentTime; // Reset the start time
                message.error.errorCode = TRIGGERED;
            }
            if (elapsedTime < MIN_TIME_THRESHOLD) {
                printf(PREFIX_WATCHDOG "Early response from controller: %lld milliseconds,Expected response time %d milliseconds.\n",
                       elapsedTime, MIN_TIME_THRESHOLD * 1000);
                startTime = currentTime; // Reset the start time
                restoreSafeState(messageQueueID, controllerPID);

            }
            if (message.error.errorCode != TRIGGERED) {
                printf(PREFIX_WATCHDOG YELLOW_COLOR"with PID: %d received a message from the controller with PID:  %d and with error: %s\n"RESET_COLOR,
                       watchdogPID, controllerPID, toString(message.error.errorCode));
                fixError(messageQueueID, message.error, controllerPID);
                message.error.errorCode = ERROR_NO_ERROR;

            }
            message.messageType = 2;
            message.error.errorDetected = false;
            msgsnd(messageQueueID, &message, sizeof(Error), 0);
            printf(PREFIX_WATCHDOG YELLOW_COLOR"sent a message to the controller: %s\n"RESET_COLOR,
                   toString(message.error.errorCode));
            if (ENABLE_PRINT_SYMBOL) { printSymbol(LENGTH_SYMBOL_SIZE); }
            if (!message.error.errorDetected) {
                if (message.error.errorCode != TRIGGERED) {
                    printf(PREFIX_WATCHDOG BLUE_COLOR"Error fixed. Proceeding with the controller process.\n"RESET_COLOR);
                    if (ENABLE_PRINT_SYMBOL) { printSymbol(LENGTH_SYMBOL_SIZE); }
                    sleep(1);
                } else {
                    printf(PREFIX_WATCHDOG BLUE_COLOR"Proceeding with the controller process.\n"RESET_COLOR);
                    if (ENABLE_PRINT_SYMBOL) { printSymbol(LENGTH_SYMBOL_SIZE); }
                    sleep(1);
                }
            }
            startTime = currentTime;

        }
        usleep(PERIOD * 1000);
    }
}

/**
 * to get the current time in milliseconds
 * **/
unsigned long long getCurrentTimeInMilliseconds() {
    struct timeval tv;
    gettimeofday(&tv, NULL);
    return (unsigned long long) (tv.tv_sec) * 1000 + (unsigned long long) (tv.tv_usec) / 1000;
}

void fixError(int messageQueueID, Error error, pid_t controllerPID) {
    if (!error.errorDetected)
        return;

    printf(PREFIX_WATCHDOG YELLOW_COLOR"is fixing the problem: %s \n"RESET_COLOR, toString(error.errorCode));
    switch (error.errorCode) {
        case TIMEOUT_ERROR:
            handleWatchdogTimeoutStrategy(messageQueueID, controllerPID);
            break;
        case OVERHEATING_ERROR:
            handleWatchdogTemperatureStrategy(messageQueueID, controllerPID);
            break;
        case UNKNOWN_ERROR:
            restoreSafeState(messageQueueID, controllerPID);
            break;
        default:
            printf(PREFIX_WATCHDOG"No errors detected. Proceeding...\n");
    }
}

void restoreSafeState(int messageQueueID, pid_t controllerPID) {

    printf(PREFIX_WATCHDOG YELLOW_COLOR"Restoring the safe state...\n"RESET_COLOR);
    printf(PREFIX_WATCHDOG YELLOW_COLOR "Restarting the program..." RESET_COLOR "\n");
    if (ENABLE_PRINT_SYMBOL) { printSymbol(LENGTH_SYMBOL_SIZE); }
    printf(PREFIX_WATCHDOG RED_COLOR"killed the controller process with PID: %d\n"RESET_COLOR, controllerPID);
    // Kill the controller process
    if (kill(controllerPID, SIGKILL) == 0) {
        printf(PREFIX_WATCHDOG RED_COLOR "Controller process with PID %d has been successfully killed.\n" RESET_COLOR,
               controllerPID);
    } else {
        printf(PREFIX_WATCHDOG RED_COLOR "Failed to kill controller process with PID %d.\n" RESET_COLOR, controllerPID);
    }
    // Wait for the controller process to exit and clean up its resources
    int status;
    pid_t result;
    do {
        result = waitpid(controllerPID, &status, 0);
    } while (result == -1 && errno == EINTR);  // handle interrupt errors

    if (result != -1) {
        if (WIFEXITED(status)) {
            printf(PREFIX_WATCHDOG RED_COLOR "Controller process with PID %d has exited with status: %d\n" RESET_COLOR,
                   controllerPID,
                   WEXITSTATUS(status));
        } else if (WIFSIGNALED(status)) {
            printf(PREFIX_WATCHDOG RED_COLOR "Controller process with PID %d was terminated by signal: %d\n" RESET_COLOR,
                   controllerPID,
                   WTERMSIG(status));
        }
    } else {
        printf(PREFIX_WATCHDOG RED_COLOR "Failed to wait for the controller process with PID %d\n" RESET_COLOR,
               controllerPID);
    }

    // Start the new controller process
    newControllerPID = fork();
    if (newControllerPID == -1) {
        printf(PREFIX_WATCHDOG "Error creating new controller process.\n");
        exit(1);
    } else if (newControllerPID == 0) {
        controllerProcess(messageQueueID, getpid());
        exit(0);
    } else {
        printf(PREFIX_WATCHDOG RED_COLOR"continues with the same PID: %d\n"RESET_COLOR, getpid());
        setNewControllerPID = true;
        isCoolingSystemActivated = false;

    }
}

void handleWatchdogTimeoutStrategy(int messageQueueID, pid_t controllerPID) {
    restoreSafeState(messageQueueID, controllerPID);
}

void handleWatchdogTemperatureStrategy(int messageQueueID, pid_t controllerPID) {
    activateCoolingSystem(messageQueueID, controllerPID);
}

void activateCoolingSystem(int messageQueueID, pid_t controllerPID) {

    if (!isCoolingSystemActivated) {
        printf(PREFIX_WATCHDOG RED_COLOR "Cooling system activated."RESET_COLOR "\n");
        isCoolingSystemActivated = true;
    } else {
        printf(PREFIX_WATCHDOG RED_COLOR"Cooling system is already activated."RESET_COLOR "\n");
        printf(PREFIX_WATCHDOG RED_COLOR"the controller must be restarted"RESET_COLOR"\n");
        sleep(2);
        restoreSafeState(messageQueueID, controllerPID);
    }
}

