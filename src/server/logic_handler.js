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
var active_player = 1; // is player 1 or 2 currently playing?

exports.test = function() {
    console.log(counter);
};

// newgame will reset all game logic to default state.
exports.newgame = function() {
    click_number = 1;
    id = 1;
    lines = [];
    active_player = 1;
    points_clicked = [];
    gameover = false;
    return true;
};

//Takes a JSON array containing a point as [x,y]
//Updates game state with current click information, returns validity of click and what happened as a STRING.
exports.nodeclick = function(point) {
    console.log("CLICK!");
    console.log(point);
    console.log(points_clicked);
    id += 1;
    // first click
    if(click_number == 1){
        points_clicked.push(point); // add the clicked node to the buffer.
        click_number += 1; // add a click.
        if(valid_start_node()){
            return "VALID_START_NODE";
        } else {
            points_clicked = []
            return "INVALID_START_NODE";
        }
    }
    //second click
    else if(click_number == 2){
        points_clicked.push(point);
        click_number = 1; // reset the click to 1 for the next one.
        if(valid_end_node()){
            lines.unshift([points_clicked[0],points_clicked[1]]); // add a new line to the list of lines at index 0, consisting of the two points we just collected.
            points_clicked = []; //empty the points_clicked buffer
            swap_players(); // this will swap the active player.
            return "VALID_END_NODE";
        } else 
            points_clicked = []; //empty the points_clicked buffer
            return "INVALID_END_NODE";
    }
    points_clicked = [];
    return "ERROR"; // catchall
};

// returns the current id of the game.
exports.getid = function() {
    return id;
}

// returns the current player number.
exports.getplayer = function() {
    return active_player;
}

// returns the last line created in [[x,y],[x,y]] format.
exports.getlastline = function() {
    return lines[0];
}
function valid_start_node(){
    return true; // add logic later
}
function valid_end_node(){
    return true; // add logic later
};

// this will change the player from one to the next.
function swap_players(){
    if(active_player == 1)
        active_player = 2;
    else if(active_player == 2)
        active_player = 1;
}