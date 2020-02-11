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

// Take the message from the server, figure out what it is, and act accordingly. Return a response.
// input is expected to be formatted as a JSON array. Might add automatic conversion later.
exports.handle = function(json, logic_module){
    var message = json["msg"];
    if(message == "INITIALIZE"){
        return startgame(json, logic_module);
    } else if(message == "NODE_CLICKED"){
        return nodeclick(json, logic_module);
    } else if(message == "ERROR"){
        return errorhandle(json, logic_module);
    }
    console.log(message);
    return false;
};
exports.testLogic = function(msg, logic_module){
    return logic_module.test();
}

// We don't really want to be calling this directly from server.js since it's internally used, so we won't export it. 
// All functions will return a JSON string for sending out to client.
// We don't care about the ID or body for starting a new game.
function startgame(json, logic_module){
    var response_payload = {};
    response_payload["id"] = 1;
    response_payload["msg"] = "INITIALIZE";
    response_payload["body"] = {
        "newLine": null,
        "heading": "Player 1",
        "message": "Awaiting Player 1's Move"
    }
    
    return JSON.stringify(response_payload);
}

function nodeclick(json, logic_module){
    return false;
}
function errorhandle(json, logic_module){
    return false;
}