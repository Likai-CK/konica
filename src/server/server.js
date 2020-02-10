/*
Christopher Kelly
Konica Minolta Technical Assessment 
January 2020

Server Module
This will implement the game server using the following modules:
- Message Handler (Handles Requests, Sends Responses)
- Logic Handler (Maintains game state)
- Output Handler (Handles changes in game and connection state, appends log content to HTML page)
- Server [this file] (Opens socket to listen on and communicate through, uses message, logic, and output handlers to function)

Separating the functionality into these components allows for some modularity and easier-to-read code.

*/

var port = 8081;
