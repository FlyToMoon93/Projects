#pragma once

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <stdbool.h>
#include <sys/msg.h>
#include <time.h>
#include "../utilities/colors.h"
#include "datatypes.h"
#include "../headers/semaphore.h"


void controllerProcess(int messageQueueID, pid_t controllerPID);

void createTimeoutError(int messageQueueID, pid_t controllerPID);

void createTemperatureError(int messageQueueID, pid_t controllerPID);

void createDeadlock();

void sendWatchdogMessage(int messageQueueID, Error error, pid_t controllerPID);

void WatchdogTrigger(int messageQueueID, pid_t controllerPID);

void printErrorChoices();


