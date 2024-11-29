/**
 * The watchdog supervises the controller,
 * receiving error messages through a message queue from the controller,
 * and takes appropriate actions in response to ensure the controller is in a safe state.
**/

#include "../headers/watchdog.h"
#include "../headers/config.h"
#include "../headers/controller.h"

bool isCoolingSystemActivated;
bool watchdogStarted;
pid_t newControllerPID;
bool setNewControllerPID;
Message message;

void watchdogProcess(pid_t watchdogPID) {
    if (ENABLE_PRINT_SYMBOL) { printSymbol(LENGTH_SYMBOL_SIZE); }
    printf(PREFIX_WATCHDOG DARK_GREEN_COLOR"is active with PID: %d"RESET_COLOR"\n", watchdogPID);
    setNewControllerPID = false;
    watchdogStarted = true;
    // Get the current time
    time_t startTime = time(NULL);
    pid_t controllerPID;

    while (watchdogStarted) {

        int flags = fcntl(client_socket, F_GETFL, 0);
        fcntl(client_socket, F_SETFL, flags | O_NONBLOCK);

        if (setNewControllerPID) {  message.controllerPID= newControllerPID; }
        // Get the current time
        time_t currentTime = time(NULL);

        // Calculate the time elapsed since the start
        double elapsedTime = difftime(currentTime, startTime);
        if (elapsedTime > MAX_TIME_THRESHOLD) {

            printf(PREFIX_WATCHDOG BLUE_COLOR"Expected response time from controller: %d seconds, current time: %.2f seconds\n"RESET_COLOR,
                   MAX_TIME_THRESHOLD, elapsedTime);
            startTime = currentTime; // Reset the start time
            restoreSafeState(message.controllerPID);
        }
        // Empfange Nachricht vom Controller
        if (recv(client_socket, &message, BUFFER_SIZE, 0) > 0) {
               controllerPID = message.controllerPID;
            if (elapsedTime < MIN_TIME_THRESHOLD) {
                printf(PREFIX_WATCHDOG"Early response from controller: %.2f seconds,Expected response time %d\n",
                       elapsedTime, MIN_TIME_THRESHOLD);
                startTime = currentTime; // Reset the start time
                restoreSafeState(controllerPID);
            }

            printf(PREFIX_WATCHDOG YELLOW_COLOR"with PID  %d received a message from the controller with PID:  %d and with error: %s\n"RESET_COLOR,
                   watchdogPID, controllerPID, toString(message.error.errorCode));
            fixError(message.error,controllerPID);

            message.messageType = 2;
            message.error.errorDetected = false;
            message.error.errorCode = ERROR_NO_ERROR;
            send(client_socket, &message, sizeof(Message), 0);
            printf(PREFIX_WATCHDOG YELLOW_COLOR"sent a message to the controller: %s\n"RESET_COLOR,
                   toString(message.error.errorCode));
            if (ENABLE_PRINT_SYMBOL) { printSymbol(LENGTH_SYMBOL_SIZE); }
            if (!message.error.errorDetected) {
                printf(PREFIX_WATCHDOG BLUE_COLOR"Error fixed. Proceeding with the controller process.\n"RESET_COLOR);
                if (ENABLE_PRINT_SYMBOL) { printSymbol(LENGTH_SYMBOL_SIZE); }
                sleep(1);
            }
            startTime = currentTime;
        }

        usleep(PERIOD * 1000);
    }
}


void fixError(Error error, pid_t controllerPID) {
    if (!error.errorDetected)
        return;

    printf(PREFIX_WATCHDOG YELLOW_COLOR"is fixing the problem: %s \n"RESET_COLOR, toString(error.errorCode));
    switch (error.errorCode) {
        case TIMEOUT_ERROR:
            handleWatchdogTimeoutStrategy(controllerPID);
            break;
        case OVERHEATING_ERROR:
            handleWatchdogTemperatureStrategy(controllerPID);
            break;
        case UNKNOWN_ERROR:
            restoreSafeState(controllerPID);
            break;
        default:
            printf(PREFIX_WATCHDOG "No errors detected. Proceeding...\n");
    }
}

void restoreSafeState(pid_t controllerPID) {

    printf(PREFIX_WATCHDOG YELLOW_COLOR"Restoring the safe state...\n"RESET_COLOR);
    printf(PREFIX_WATCHDOG YELLOW_COLOR"Restarting the program..." RESET_COLOR "\n");
    if (ENABLE_PRINT_SYMBOL) { printSymbol(LENGTH_SYMBOL_SIZE); }
    printf(PREFIX_WATCHDOG RED_COLOR"killed the controller process with PID: %d\n"RESET_COLOR, message.controllerPID);
    // Kill the controller process
    if (kill(controllerPID, SIGKILL) == 0) {

        send(client_socket, &message.controllerPID, sizeof(message.controllerPID), 0);

        printf(PREFIX_WATCHDOG RED_COLOR "Controller process with PID %d has been successfully killed.\n" RESET_COLOR,
               controllerPID);

    } else {
        printf(PREFIX_WATCHDOG RED_COLOR "Failed to kill controller process with PID %d.\n" RESET_COLOR,
               controllerPID);
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
                   controllerPID, WEXITSTATUS(status));
        } else if (WIFSIGNALED(status)) {
            printf(PREFIX_WATCHDOG RED_COLOR "Controller process with PID %d was terminated by signal: %d\n" RESET_COLOR,
                   controllerPID, WTERMSIG(status));
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
         controllerProcess(getpid());
        exit(0);
    } else {
        printf(PREFIX_WATCHDOG RED_COLOR"Watchdog process continues with the same PID: %d\n"RESET_COLOR, getpid());
        setNewControllerPID = true;
        isCoolingSystemActivated = false;

    }

}

void handleWatchdogTimeoutStrategy(pid_t controllerPID) {
    restoreSafeState(controllerPID);
}

void handleWatchdogTemperatureStrategy(pid_t controllerPID) {
    activateCoolingSystem(controllerPID);
}

void activateCoolingSystem(pid_t controllerPID) {

    if (!isCoolingSystemActivated) {
        printf(PREFIX_WATCHDOG RED_COLOR "Cooling system activated."RESET_COLOR "\n");
        isCoolingSystemActivated = true;
    } else {
        printf(PREFIX_WATCHDOG RED_COLOR"Cooling system is already activated."RESET_COLOR "\n");
        printf(PREFIX_WATCHDOG RED_COLOR"the controller must be restarted"RESET_COLOR"\n");
        sleep(2);
        restoreSafeState(controllerPID);
    }
}

