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
var start_node = []; // keep track of the start node so we don't do a million array slices later on to find it over and over
var first_node_chosen = false; // keep track of when the first node has been clicked
var playing_area_x = 3; // max x size allowed ( start at 0 )- anything else will be INVALID. Only possible if client is modified or weird stuff happens.
var playing_area_y = 3; // max y size allowed ( start at 0 )- anything else will be INVALID. Only possible if client is modified or weird stuff happens.

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
    console.log(lines);
    console.log(start_node);
    id += 1;
    // first click
    if(click_number == 1){
        
        
        if(valid_start_node(point)){
            click_number += 1; // add a click.
            if(!(first_node_chosen)){ // If this is the first node to be chosen
                first_node_chosen = true; // just set this flag for us.
                start_node = point; // set the start node to this node, so we aren't slicing for it later.
            }
            points_clicked.push(point); // add the clicked node to the buffer.
            return "VALID_START_NODE";
        } else {
            points_clicked = []
            return "INVALID_START_NODE";
        }
    }
    //second click
    else if(click_number == 2){
        
        
        if(valid_end_node(point)){
            click_number = 1; // reset the click to 1 for the next one.
            points_clicked.push(point);
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

// In order to be a valid start node, a point must:
// start at the first or last node [we will keep an array of all nodes directly visited]
// first line may begin anywhere WITHIN THE PLAYING AREA.
function valid_start_node(point){
    if(out_of_bounds(point)){ // If it's out of bounds, it's invalid.
        return false;
    }
    if(!first_node_chosen){ // If this is the first node, return true.
        console.log("AAAA");
        console.log(lines);
        return true;
    } else if (lines[0][1] == point){ // If the end of the last line is clicked
        return true;
    } else if (point == start_node){ // If the start node is clicked
        return true;
    }

    return false; 
}

// In order to be a valid end node, a point must:
// not intersect with any other line [we can probably look up a quick math formula for this]
// not already be visited [easy: check to see if the point is already in the list of points clicked]
// NOT be the same as the start node clicked.
// MUST BE IN PLAYING AREA.
function valid_end_node(point){
    if(out_of_bounds(point)){ // If it's out of bounds, it's invalid.
        return false;
    }
    return true; // add logic later
};

// this will change the player from one to the next.
function swap_players(){
    if(active_player == 1)
        active_player = 2;
    else if(active_player == 2)
        active_player = 1;
}

// check [x,y] point for being out of bounds
function out_of_bounds(point){
    if(point[0] < 0 || point[0] > playing_area_x){
        return true; // Out of bounds!
    } else if(point[1] < 0 || point[1] > playing_area_y){
        return true; // Out of bounds!
    } else
        return false; // Not out of bounds!
}