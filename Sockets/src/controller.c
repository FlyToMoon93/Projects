/**
 * The controller simulates various errors such as Timeout, Temperature, and Deadlocks.
 * Upon detecting an error, it sends a corresponding message to the "Watchdog" using a message queue.
 * The "Watchdog" receives these messages and takes necessary actions to address the error
 * and put the controller in a safe state.
 **/

#include <signal.h>
#include "../headers/controller.h"
#include "../headers/config.h"


Error errorDetected;
Message message;

void controllerProcess(pid_t controllerPID) {

    errorDetected.errorDetected = false;
    int selectedError;

    while (true) {


        printf(PREFIX_CONTROLLER DARK_GREEN_COLOR  "is active with PID: %d\n" RESET_COLOR, controllerPID);
        if (SIMULATE_ALL_ERROR) {
            if (ENABLE_PRINT_SYMBOL) { printSymbol(LENGTH_SYMBOL_SIZE); }
        }

        if (!SIMULATE_ALL_ERROR) {
            sleep(1);
            if (ENABLE_PRINT_SYMBOL && !SIMULATE_ALL_ERROR) { printSymbol(LENGTH_SYMBOL_SIZE); }
            char input[100];
            printErrorChoices();
            // Read user input and validate it
            fgets(input, sizeof(input), stdin);
            if (sscanf(input, "%d", &selectedError) != 1) {
                printf("Invalid selection. Please try again..\n");
                continue;
            }
            // Validate selectedError against valid options
            if (!(START_TIMEOUT_ERROR && selectedError == ERROR_OPTION_TIMEOUT) &&
                !(START_TEMPERATURE_ERROR && selectedError == ERROR_OPTION_TEMPERATURE) &&
                !(START_DEADLOCK && selectedError == ERROR_OPTION_DEADLOCK)) {
                printf("Invalid Number. Please try again..\n");
                continue;
            }
        }


        if (SIMULATE_ALL_ERROR) {
            int numErrorOptions = 0;
            if (START_TIMEOUT_ERROR) numErrorOptions++;
            if (START_TEMPERATURE_ERROR) numErrorOptions++;
            if (START_DEADLOCK) numErrorOptions++;

            if (numErrorOptions > 0) {
                int allowedErrorOptions[numErrorOptions];
                int currentIndex = 0;

                if (START_TIMEOUT_ERROR) {
                    allowedErrorOptions[currentIndex] = ERROR_OPTION_TIMEOUT;
                    currentIndex++;
                }
                if (START_TEMPERATURE_ERROR) {
                    allowedErrorOptions[currentIndex] = ERROR_OPTION_TEMPERATURE;
                    currentIndex++;
                }
                if (START_DEADLOCK) {
                    allowedErrorOptions[currentIndex] = ERROR_OPTION_DEADLOCK;
                    currentIndex++;
                }

                srand(time(NULL));
                selectedError = allowedErrorOptions[random() % numErrorOptions];
            }
        }

        if (!SIMULATE_ALL_ERROR &&
            (selectedError == ERROR_OPTION_TIMEOUT || selectedError == ERROR_OPTION_TEMPERATURE ||
             selectedError == ERROR_OPTION_DEADLOCK)) {

        }

        printf(PREFIX_CONTROLLER MAGENTA_COLOR"is currently simulating whether errors exist."
               RESET_COLOR"\n");


        switch (selectedError) {

#if START_TIMEOUT_ERROR
            case ERROR_OPTION_TIMEOUT:

                createTimeoutError(controllerPID);

                break;
#endif
#if START_TEMPERATURE_ERROR
            case ERROR_OPTION_TEMPERATURE:

                createTemperatureError(controllerPID);

                break;
#endif
#if START_DEADLOCK
                case ERROR_OPTION_DEADLOCK:

                    createDeadlock();

                    break;
#endif


        }
        sleep(2);


    }
}

void createTimeoutError(pid_t controllerPID) {

    time_t startTime = time(NULL);
    printf(PREFIX_CONTROLLER"check if there any Timeout in the loop\n");
    errorDetected.errorDetected = false;
    while ((time(NULL) - startTime) < LOOP_DURATION) {

        int randomDelay = rand() % delay;
        sleep(randomDelay);
        if ((time(NULL) - startTime) >= LOOP_DURATION) {
            errorDetected.errorDetected = true;
            printf(PREFIX_CONTROLLER RED_COLOR"Timeout detected in the loop! Taking appropriate actions..."RESET_COLOR"\n");
            Error error = {true, TIMEOUT_ERROR};
            sendWatchdogMessage(error, controllerPID);
        }
        sleep(1);

    }
    if (!errorDetected.errorDetected) {
        printf(PREFIX_CONTROLLER"No timeout detected\n");
        startTime = 0;
    }
    sleep(2);

}

void createTemperatureError(pid_t controllerPID) {
    errorDetected.errorDetected = false;
    srand(time(NULL));
    int temperature = rand() % 21 + TEMPERATURE;
    printf(PREFIX_CONTROLLER GREEN_COLOR"Current temperature: %d°C\n"RESET_COLOR, temperature);
    sleep(1);

    if (temperature >= OverheatingDetected) {

        printf(PREFIX_CONTROLLER RED_COLOR"Overheating detected,Taking appropriate actions..."RESET_COLOR"\n");
        Error error = {true, OVERHEATING_ERROR};
        sendWatchdogMessage(error, controllerPID);
    } else {

        printf(PREFIX_CONTROLLER"No overheating detected. Everything is normal.\n");
    }
    sleep(2);
}

void createDeadlock() {

    printf(RED_COLOR" Deadlock.\n"RESET_COLOR);
    pid_t pid = fork();
    printf( DARK_GREEN_COLOR  "the third Pid is active with PID: %d\n" RESET_COLOR, pid);
    if (pid == -1) {
        perror("Fork failed");
        exit(1);
    } else if (pid == 0) {
        // Kindprozess
        process2();
    } else {
        // Elternprozess
        process1();
    }

}
void process1() {

    while (1) {

        lock_semaphore(sem_id, 0);
        printf("Process 1 locked the semaphore.\n");
        sleep(3);
        unlock_semaphore(sem_id, 0);
    }
}

void process2() {

    while (1) {

        lock_semaphore(sem_id, 0);
        printf("Process 2 locked the semaphore.\n");
        sleep(2);
    }
}
void sendWatchdogMessage(Error error, pid_t controllerPID __attribute__((unused))) {
    sleep(MIN_TIME_THRESHOLD);
    printf(PREFIX_CONTROLLER"The message has been sent to the watchdog: %s \n", toString(error.errorCode));
    if (ENABLE_PRINT_SYMBOL) { printSymbol(LENGTH_SYMBOL_SIZE); }
    message.messageType = 1;
    message.error = error;
    message.controllerPID = controllerPID;
    // Nachricht an den Controller senden
    send(client_socket, &message, sizeof(Message), 0);
    recv(client_socket, &message, sizeof(Message), 0);

    while (true) {
        if (message.error.errorCode == 0) {
            break;
        }
    }
}

void printErrorChoices() {

    printf(RED_COLOR "Which error do you want to simulate?\n" RESET_COLOR);


#if START_TIMEOUT_ERROR

    printf(ERRORS_COLOR"%d. Timeout error\n"RESET_COLOR, ERROR_OPTION_TIMEOUT);

#endif
#if START_TEMPERATURE_ERROR

    printf(ERRORS_COLOR"%d. Temperature error\n"RESET_COLOR, ERROR_OPTION_TEMPERATURE);

#endif
#if START_DEADLOCK

    printf(ERRORS_COLOR"%d. Deadlock\n"RESET_COLOR, ERROR_OPTION_DEADLOCK);

#endif

    printf(RED_COLOR"Your selection: "RESET_COLOR);

}