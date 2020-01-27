/*
Christopher Kelly
Konica Minolta Technical Assessment
January 2020

Purpose:
This script will handle all client-server interactions for the game.
The Client does not handle any game logic, but will be responsible 
for keeping track of the current game state from the server.

Method:
We will use JSON as the messaging format for interacting with the server.
Points will be defined as an x,y integer pair.
Lines will be defined by start and end points. 
- We will need to devise a way to send points as an object for this purpose, such as an array containing two arrays.
- Example: [[x1,y1],[x2,y2]] to represent a line connecting points (x1,y1) and (x2,y2).
The Client will handle displaying lines appropriately, connecting all points inbetween, and
adding a numbered label after each segment according to server output.
The Client will send an initialization packet to the Server to begin a game.
The Client will send information to the server with each turn, and receive game state information in return.
The Client will listen for changes in game state (such as inactivity) and receive data without having to make a move.
*/
 
'use strict';

window.addEventListener("load", start_client); // By waiting for the document to fully load, we can reference all elements without them being null.
document.getElementById("app-container").addEventListener("click", handle_click); // This will intercept all clicks within the app container.
var event_to_report = false; 
// This will initialize everything we want done AFTER the page first loads.
function start_client(){
var message_output = document.getElementById("app").getElementsByClassName("message")[0]; // This will be a text field to output to underneath our game.
var header_output = document.getElementById("app").getElementsByClassName("header")[0];

console.log(message_output);
console.log(header_output);

message_output.textContent = "ASKSDBFHJ";
header_output.textContent = "Technical Assessment";
console.log("HI");
app.ports.request.subscribe((message) => {
    message = JSON.parse(message); // we will receive a JSON object and will parse it.
    response = handle_response(message); // response will be a JSON object complying with the specification.

    // Parse the message to determine a response, then respond:
    app.ports.response.send(JSON.stringify(response));
    message_output = message; // keep the text field updated with response information.
    });

} // end of start_client

// This will collect the exact object being clicked on in the app, and let us process it.
// https://stackoverflow.com/questions/33846813/typescript-how-to-check-tagname-in-eventtarget
// There is NO type safety in this version, but it is shorter and OK for this assignment.
function handle_click(e){ 
 console.log(e.target); 
 if (e.target["tagName"] === ('circle')){
     console.log("CIRCLE");
 } else {
     console.log("not a circle");
 }

}

// Takes in parsed JSON object, returns a new JSON object to send back to the server.
function handle_response(message){

}