#pragma once

#include <sys/msg.h>
#include <stdio.h>
#include <string.h>
#include <stdbool.h>
#include <unistd.h>
#include <sys/wait.h>
#include <errno.h>
#include <sys/time.h>

#include "datatypes.h"
#include "../utilities/colors.h"
#include "../headers/controller.h"


void watchdogProcess(int messageQueueID, pid_t watchdogPID, pid_t controllerPID);

void fixError(int messageQueueID, Error error, pid_t controllerPID);

unsigned long long getCurrentTimeInMilliseconds();

// Watchdog Error handling strategies
void handleWatchdogTimeoutStrategy(int messageQueueID, pid_t controllerPID);

void handleWatchdogTemperatureStrategy(int messageQueueID, pid_t controllerPID);

void activateCoolingSystem(int messageQueueID, pid_t controllerPID);

void restoreSafeState(int messageQueueID, pid_t controllerPID);
