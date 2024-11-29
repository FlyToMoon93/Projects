#pragma once

#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>

typedef enum {
    ERROR_NO_ERROR = 0,
    TIMEOUT_ERROR = 1,
    OVERHEATING_ERROR = 2,
    UNKNOWN_ERROR = 4,
    TRIGGERING = 5,
    TRIGGERED = 6
} ErrorCode;

typedef struct {
    bool errorDetected;
    ErrorCode errorCode;
} Error;

typedef struct {
    long messageType;
    Error error;
} Message;

char *toString(ErrorCode errorCode);

void printSymbol(int contextSymbol);

void showConfigFile();