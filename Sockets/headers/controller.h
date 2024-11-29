#pragma once

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <stdbool.h>
#include <time.h>
#include <string.h>
#include <arpa/inet.h>
#include <sys/socket.h>

#include "../utilities/colors.h"
#include "datatypes.h"
#include "../headers/semaphore.h"

int client_socket;

void controllerProcess(pid_t controllerPID);

void createTimeoutError(pid_t controllerPID);

void createTemperatureError(pid_t controllerPID);

void createDeadlock();

void sendWatchdogMessage(Error error, pid_t controllerPID);

void printErrorChoices();

void process1();

void process2();
