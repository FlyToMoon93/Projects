#ifndef CONFIG_H
#define CONFIG_H
/** Please ensure to provide the correct file path where the folder is saved on your computer.
 * This is necessary to generate a unique key for the message queue.
 * To find the correct file path, please open a terminal in the folder where you saved the code
 * and enter this command: 'pwd' in the terminal.
*/
#define PATHNAME "/home/watchdog/watchdog"
/**
 * Please provide the correct path for the config.h file if you wish to enable "SHOW_CONFIG_FILE" option.
  */
#define CONFIG_FILE_PATH "/home/watchdog/watchdog/monitoring/headers/config.h"
/**
 * open and edit the config.h file?
 */
#define SHOW_CONFIG_FILE true
/**
 * Define a specific time window for the watchdog to bring the controller
 * to a safe state in case the watchdog does not receive any response from the controller.
*/
#define MIN_TIME_THRESHOLD 2   /** Minimum time threshold in seconds*/
#define MAX_TIME_THRESHOLD 20  /** Maximum time threshold in seconds*/
#define PERIOD 100             /** Watchdog period in milliseconds */
#define TRIGGERING_WATCHDOG 3000    /** triggern watchdog period in Millisecond */
/**
 * // Startup options for errors //
 * To simulate errors one by one, ensure that the option 'SIMULATE_ALL_ERROR' is set to 'false.'
 * This will allow you to individually test each error scenario.
 * To simulate a specific error multiple times,
 * set the desired error to 'true' and 'SIMULATE_ALL_ERROR' to 'true'
 * while leaving the other errors to 'false.
*/
#define START_TIMEOUT_ERROR  true
#define START_TEMPERATURE_ERROR false
#define START_DEADLOCK   false
#define SIMULATE_ALL_ERROR true
/**
 * Prefix
 * */
#define PREFIX_CONTROLLER "Controller: "
#define PREFIX_WATCHDOG   "  Watchdog: "
/**
 * loop duration for timeout
*/
#define LOOP_DURATION 1
/**
 * Set a delay for TimeoutFunction to simulate  a timeout in the function.
 * If you do not want a timeout error to be triggered, please set the delay to 1.
*/
#define DELAY 1
/**
 * Generate a random Temperature between 80 and 100
 * rand() % 21+ TEMPERATURE;
*/
#define TEMPERATURE  80
/**
 * Overheating detected when the temperature is equal to or greater than 90.
*/
#define OVERHEATING_DETECTED  83
/**
 * ENABLE_PRINT_SYMBOL: Toggle to enable or disable printing symbol sequences in output.
 * LENGTH_SYMBOL_SIZE: Specifies the length between 0-100 of the symbol sequence to be displayed.
 * CONTEXT_SYMBOL: Defines the character used for creating the symbol sequence.
 * COLOR, ERRORS_COLOR, Available colors : RED_COLOR,GREEN_COLOR, YELLOW_COLOR, BLUE_COLOR, DARK_GREEN_COLOR,CYAN_COLOR,MAGENTA_COLOR
*/
#define ENABLE_PRINT_SYMBOL true
#define LENGTH_SYMBOL_SIZE  100
#define CONTEXT_SYMBOL   '*'
#define COLOR_SYMBOL MAGENTA_COLOR
#define ERRORS_COLOR CYAN_COLOR
/**
 * error selection options for input
*/
#define ERROR_OPTION_TIMEOUT 1
#define ERROR_OPTION_TEMPERATURE 2
#define ERROR_OPTION_DEADLOCK 3

#endif
