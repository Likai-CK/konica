/*
Christopher Kelly
Konica Minolta Technical Assessment 
January 2020

Message Handler Module
This module contains all functions necessary to handle and communicate with the client.
All communications consist of JSON strings using the same container format.
For more specific detail, see Technical Assessment Documentation.
*/

// Take the message from the server, figure out what it is, and act accordingly. Return a response as STRING.
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
    logic_module.newgame(); // get all logic reset.
    // cookie cutter response for the client to start.
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
    var response_payload = {};
    var point = [json["body"]["x"],json["body"]["y"]]; // This will create an array containing the point in the message as [x,y], for the logic handler.
    var current_player = logic_module.getplayer(); // This will get the current player number, so we can output it accordingly.
    node_click = logic_module.nodeclick(point); // this will return whether it is valid, and what kind of click it was as a STRING.
    console.log(node_click);
    if(node_click == "VALID_START_NODE"){
        response_payload["id"] = logic_module.getid();
        response_payload["msg"] = node_click;
        response_payload["body"] = {
            "newLine": null,
            "heading": "Player " + current_player,
            "message": "Select a second node!"
        }
    }
    return JSON.stringify(response_payload); 
}
function errorhandle(json, logic_module){
    var response = "";
    return response;
}

