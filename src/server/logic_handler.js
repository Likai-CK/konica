/*
Christopher Kelly
Konica Minolta Technical Assessment 
January 2020

Logic Handler Module
This module contains all functions necessary to maintain the game state.



*/

var click_number = 0; // none clicked, first click, or second click?


exports.test = function() {
    console.log(counter);
};

// newgame will reset all game logic to default state.
exports.newgame = function() {
    click_number = 0;
    return true;
};