/*
Christopher Kelly
Konica Minolta Technical Assessment 
January 2020

Logic Handler Module
This module contains all functions necessary to maintain the game state.



*/

var click_number = 1; // first click, or second click?
var id = 1; // We start the game off at 1. The client should always be sending a message with an ID above this. If not, resend missed messages.
var lines = []; // Array containing all lines drawn already (two points).
var points_clicked = []; // This will be a buffer to store the first point clicked, as [x,y].
var gameover = false; // is the game over yet?

exports.test = function() {
    console.log(counter);
};

// newgame will reset all game logic to default state.
exports.newgame = function() {
    click_number = 1;
    id = 1;
    lines = [];
    points_clicked = [];
    gameover = false;
    return true;
};

//Takes a JSON array containing "x":INTEGER and "y":INTEGER
//Updates game state with current click information, returns validity of click.
exports.nodeclick = function(point) {
    id += 1;
    // first click
    if(click_number == 1){
        click_number += 1; // add a click.
        if(valid_start_node()){
            points_clicked.push([point["x"],point["y"]]); // add the clicked node to the buffer.
            return "VALID_START_NODE";
        } else {
            return "INVALID_START_NODE";
        }
    }
    //second click
    else if(click_number == 2){
        click_number = 1; // reset the click to 1 for the next one.
        if(valid_end_node()){
            points_clicked.push([point["x"],point["y"]]);
            lines.push([points_clicked[0],points_clicked[1]]); // add a new line to the list of lines.
            points_clicked = []; //empty the points_clicked buffer
            return "VALID_END_NODE";
        } else 
            points_clicked = []; //empty the points_clicked buffer
            return "INVALID_END_NODE";
    }
    return "ERROR"; // catchall
};

function valid_start_node(){
    return true; // add logic later
}
function valid_end_node(){
    return true; // add logic later
};