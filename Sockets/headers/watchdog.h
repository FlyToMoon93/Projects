#pragma once

#include <stdio.h>
#include <string.h>
#include <stdbool.h>
#include <unistd.h>
#include <sys/wait.h>
#include <errno.h>
#include <time.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <fcntl.h>
#include "datatypes.h"
#include "../utilities/colors.h"
#include "../headers/semaphore.h"

int server_socket, client_socket;


void watchdogProcess(pid_t watchdogPID);

void fixError(Error error, pid_t controllerPID);

// Watchdog Error handling strategies
void handleWatchdogTimeoutStrategy(pid_t controllerPID);

void handleWatchdogTemperatureStrategy(pid_t controllerPID);

void activateCoolingSystem(pid_t controllerPID);

void restoreSafeState(pid_t controllerPID);

