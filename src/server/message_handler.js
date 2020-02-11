/*
Christopher Kelly
Konica Minolta Technical Assessment 
January 2020

Message Handler Module
This module contains all functions necessary to handle and communicate with the client.
All communications consist of JSON strings using the same container format.
For more specific detail, see Technical Assessment Documentation.

API Functions:
Incoming Messages (Request Handling):
1) INITIALIZE:
- Request is sent immediately after client loads, or when game is reset.
- This will set the game to its initial state, and respond to the client with the current game state.
2) NODE CLICKED:
- Request is sent after every node click within the client. Drawing a line requires two of these.
- After each click, the server responds whether it was a valid node to click.
- After a second successful click (which the server keeps track of), the server responds with a VALID CLICK and NEWLINE.
- A failed click will always reset the click counter to 0 (you need two valid clicks in a row to make a line).
3) ERROR:
- In current implementation, is only to indicate that the server sent an invalid message to the client.
- PubSub - no response is expected by the server.


*/

exports.handle = function(msg){
    return msg;
};
exports.testLogic = function(logic_module){
    return logic_module.test();
}