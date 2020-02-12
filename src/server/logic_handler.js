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
    //console.log("CLICK!");
    //console.log(point);
    //console.log(points_clicked);
    //console.log(lines);
    //console.log(start_node);
    id += 1;
    // first click
    if(click_number == 1){
        
        
        if(valid_start_node(point)){
            click_number += 1; // add a click.
            if(lines.length == 0){ // If this is the first node to be chosen
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
    //console.log(point);
    //console.log(start_node);
    //console.log(pointsEqual(point, start_node));
    if(out_of_bounds(point)){ // If it's out of bounds, it's invalid.
        return false;
    }
    if(lines.length == 0){ // If there are no lines yet, this is the first node. Return true.
        return true;
    } else if (pointsEqual(lines[0][1],point)){ // If the end of the last line is clicked
        return true;
    } else if (pointsEqual(point, start_node)){ // If the start node is clicked
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
    } else if(point == points_clicked[0]){ // cannot select the same node as the first.
        return false;    
    }else if(check_all_intersects(points_clicked[0], point)){ // If theres an intersect somewhere....
        console.log("LINE INTERSECTS!")
        return false; // line intersects.
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

// Check if two arrays (points) are equal. Fixes an issue with ==.
function pointsEqual(point1, point2){
    if(point1[0] != point2[0])
        return false;
    if(point1[1] != point2[1])
        return false;
    return true;
}

//https://www.tutorialspoint.com/Check-if-two-line-segments-intersect
// https://stackoverflow.com/questions/3838329/how-can-i-check-if-two-segments-intersect
// https://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function
// returns true iff the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
// Check the direction these three points rotate
function intersects(x1, y1, x2, y2, x3, y3, x4, y4) {
    var a_dx = x2 - x1;
    var a_dy = y2 - y1;
    var b_dx = x4 - x3;
    var b_dy = y4 - y3;
    var s = (-a_dy * (x1 - x3) + a_dx * (y1 - y3)) / (-b_dx * a_dy + a_dx * b_dy);
    var t = (+b_dx * (y1 - y3) - b_dy * (x1 - x3)) / (-b_dx * a_dy + a_dx * b_dy);
    return (s >= 0 && s <= 1 && t >= 0 && t <= 1);
}
  // This will peruse through all of the lines already made in the game (in lines array)
  // and see if the new line being suggested intersects with any of them.
  // Returns false if no intersections.
  function check_all_intersects(point1,point2){
      if(lines.length == 0){ // if there's no lines, there's no intersections. 
          return false;
      } else if(points_clicked.length < 0){
          return false; // 
      }
      console.log("INTERSECT TEST");
      console.log(point1[0]);
      console.log(point1[1]);
      console.log(point2[0]);
      console.log(point2[1]);
      console.log(lines[0][0][0]);
      console.log(lines[0][0][1]);
      console.log(lines[0][1][0]);
      console.log(lines[0][1][1]);
      
        // check all lines for intersect.
        //console.log(lines[i]);
        for(i = 0; i < lines.length; i++){
            if(intersects(point1[0],point1[1], point2[0], point2[1], lines[i][0][0], lines[i][0][1], lines[i][1][0], lines[i][1][1])){
                return true;
            } else {
                return false;
            }
        }

  }