#pragma once

#include <sys/sem.h>
#include <sys/types.h>
#include <stdlib.h>
#include <stdio.h>
#include <stdbool.h>

extern  key_t key;
extern  int sem_id;


void lock_semaphore(int sem_id, int sem_num);

void unlock_semaphore(int sem_id, int sem_num);

void create_Semaphore();

void init_semaphore(int sem_id, int sem_num, int val);
