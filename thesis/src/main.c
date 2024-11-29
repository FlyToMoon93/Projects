#include "../headers/controller.h"
#include "../headers/watchdog.h"
#include "../headers/config.h"

int main() {

    int messageQueueID;
    pid_t controllerPID;
    pid_t watchdogPID;
    showConfigFile();
    // Generate a unique key for the message queue
    if ((key = ftok(PATHNAME, '1')) < 0) {
        perror("Error generating the key");
        exit(1);
    }
    // Create a semaphore
    create_Semaphore();
    // Create a message queue
    messageQueueID = msgget(key, IPC_CREAT | 0666);
    if (messageQueueID == -1) {
        perror("Error creating the message queue");
        exit(1);
    }
    // Start the controller process
    while ((controllerPID = fork()) < 0) {
        fprintf(stderr, "Error creating the Controller process. Retry...\n");
        sleep(1);
    }
    if (controllerPID == 0) {
        // controller-process
        controllerProcess(messageQueueID, getpid());
        exit(0);
    }
    // Start the watchdog process
    watchdogPID = getpid();
    watchdogProcess(messageQueueID, watchdogPID, controllerPID);
    // Remove the message queue
    msgctl(messageQueueID, IPC_RMID, NULL);
    // remove the Semaphore
    if (semctl(sem_id, 0, IPC_RMID) == -1) {
        perror("Error deleting the semaphore");
        return 1;
    }
    return 0;
}
