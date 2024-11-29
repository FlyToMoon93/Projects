/**
 * The module was implemented to create and resolve a deadlock scenario in the program.
 * It allows the locking and unlocking of semaphores to manage resource access among
 * different processes or threads.
 * Source:[https://openbook.rheinwerk-verlag.de/linux_unix_programmierung/Kap09-004.htm#RxxKap09004040002D71F017100]
*/
#include "../headers/semaphore.h"

key_t key;
int sem_id;

void init_semaphore(int semaphore_id, int sem_num, int val) {
    union semun {
        int val;
        struct semid_ds *buf;
        unsigned short *array;
    } argument;
    argument.val = val;

    if (semctl(semaphore_id, sem_num, SETVAL, argument) < 0) {
        perror("Error in semctl");
        exit(1);
    }


}
void create_Semaphore() {

    if ((sem_id = semget(key, 1, IPC_CREAT | 0666)) < 0) {
        perror("Error in semget");
        exit(1);
    }
    init_semaphore(sem_id, 0, 1);
}
void lock_semaphore(int semaphore_id, int sem_num) {
    struct sembuf sem_op;
    sem_op.sem_num = sem_num;
    sem_op.sem_op = -1; // Versuch, den Semaphore zu sperren
    sem_op.sem_flg = 0; // Hier sollte SEM_UNDO nicht verwendet werden

    if (semop(semaphore_id, &sem_op, 1) == -1) {
        perror("Error locking the semaphore");
        exit(1);
    }
}
void unlock_semaphore(int semaphore_id, int sem_num) {
    struct sembuf sem_op;
    sem_op.sem_num = sem_num;
    sem_op.sem_op = 1; // Freigeben des Semaphors
    sem_op.sem_flg = 0;

    if (semop(semaphore_id, &sem_op, 1) == -1) {
        perror("Error unlocking the semaphore");
        exit(1);
    }
}



