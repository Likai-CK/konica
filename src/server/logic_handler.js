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
exports.test = function() {
    console.log(counter);
};

// newgame will reset all game logic to default state.
exports.newgame = function() {
    click_number = 0;
    id = 1;
    return true;
};

//Takes a JSON array containing "x":INTEGER and "y":INTEGER
exports.nodeclick = function(point) {
    id += 1;
    // first click
    if(click_number == 1){
        points_clicked.push([point["x"],point["y"]]);
        click_number += 1; // add a click.
    }
    //second click
    else if(click_number == 2){
        points_clicked.push([point["x"],point["y"]]);
        click_number = 1; // reset the click to 1 for the next one.
        if(valid_line()){
            lines.push([points_clicked[0],points_clicked[1]]); // add a new line to the list of lines.
            points_clicked = []; //empty the points_clicked buffer
            return true;
        } else 
            points_clicked = []; //empty the points_clicked buffer
            return false;
    }
    return false; // catchall
};

// Will check current game state information to confirm if the current points_clicked buffer creates a valid line.
// Will cross-check the line created by points_clicked with lines already in existence.
function valid_line(){
    return true; // add logic later
};