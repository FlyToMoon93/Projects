#include "../headers/controller.h"
#include "../headers/config.h"

int main() {

    pid_t controllerPID;
    struct sockaddr_in server_address;

    // Create the client socket
    client_socket = socket(AF_INET, SOCK_STREAM, 0);
    if (client_socket == -1) {
        perror("Error creating the client socket");
        exit(1);
    }

    // Set the SO_REUSEADDR option
    int reuse = 1;
    if (setsockopt(client_socket, SOL_SOCKET, SO_REUSEADDR, &reuse, sizeof(reuse)) == -1) {
        perror("Error setting the SO_REUSEADDR option");
        exit(1);
    }

    server_address.sin_family = AF_INET;
    server_address.sin_port = htons(SERVER_PORT);
    server_address.sin_addr.s_addr = inet_addr(SERVER_IP);

    // Connect to the server
    if (connect(client_socket, (struct sockaddr *) &server_address, sizeof(server_address)) == -1) {
        perror("Error connecting to the server");
        exit(1);
    }

    // Start the controller process
    while ((controllerPID = fork()) < 0) {
        fprintf(stderr, "Error creating the Controller process. Retry...\n");
        sleep(1);
    }

    if (controllerPID == 0) {
        exit(0);
    }

    controllerProcess(controllerPID);

    // Close the connection
    close(client_socket);

    return 0;
}
