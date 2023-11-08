#include "../headers/datatypes.h"
#include "../utilities/colors.h"
#include "../headers/config.h"

char *toString(ErrorCode errorCode) {
    switch (errorCode) {
        case TIMEOUT_ERROR:
            return "Error Timeout";
        case OVERHEATING_ERROR:
            return "Error Overheating";
        case UNKNOWN_ERROR:
            return "Error Unknown";
        case ERROR_NO_ERROR:
            return "Problem Solved";
        case TRIGGERING:
            return "Watchdog must be triggered";
        case TRIGGERED :
            return "Watchdog is triggered";
    }

    return "";
}

void printSymbol(int contextSymbol) {
    if (contextSymbol <= 0) {
        printf("\n");
        return;
    }
    char symbol[contextSymbol + 1];

    for (int i = 0; i < contextSymbol; ++i) {
        symbol[i] = CONTEXT_SYMBOL;
    }
    symbol[contextSymbol] = '\0';

    printf(COLOR_SYMBOL"%s\n"RESET_COLOR, symbol);
}

void showConfigFile() {

    int openConfigFile = 0;

    if (SHOW_CONFIG_FILE) {
        char response;
        printf(RED_COLOR"Would you like to open and edit the config.h file? (y/n): "RESET_COLOR);

        do {
            scanf(" %c", &response);

            if (response == 'y' || response == 'Y') {
                openConfigFile = 1;
                break;
            } else if (response == 'n' || response == 'N') {
                while (getchar() != '\n'); // Clear the input buffer
                break;
            } else {
                printf("Invalid input. Please enter 'y' or 'n': ");
                while (getchar() != '\n'); // Clear the input buffer
            }
        } while (true);
    }

    if (openConfigFile) {
        char command[100];
        snprintf(command, sizeof(command), "vim %s", CONFIG_FILE_PATH);
        system(command);
        system("clear");
        exit(0);
    }
}
