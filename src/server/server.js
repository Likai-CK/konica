/*
Christopher Kelly
Konica Minolta Technical Assessment 
January 2020

Server Module
This will implement the game server using the following modules:
- Message Handler (Handles Requests, Sends Responses)
- Logic Handler (Maintains game state)
- Server [this file] (Opens socket to listen on and communicate through, uses message, logic, and output handlers to function)

Separating the functionality into these components allows for some modularity and easier-to-read code.

*/

// Every Server starts with opening a port. The client is setup to connect to Port 8081 over WebSocket
// https://javascript.info/websocket
// https://www.tutorialspoint.com/websockets/websockets_send_receive_messages.htm
// https://www.npmjs.com/package/express-ws
// https://expressjs.com/en/guide/using-middleware.html
// https://hype.codes/how-include-js-file-another-js-file

var port = 8081;
var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
const message_handler = require('./message_handler.js'); // load the message handler module
const logic_handler = require('./logic_handler.js'); // load the logic handler module

app.use(function (req, res, next) {
    console.log('middleware');
    req.testing = 'testing';
    return next();
  });
   
  app.get('/', function(req, res, next){
    console.log('get route', req.testing);
    res.end();
  });
   
  app.ws('/', function(ws, req) {
    ws.on('message', function(msg) { // on message receipt
      console.log(msg);
      response = message_handler.testLogic(msg, logic_handler); // send the message to the message handler, get a response.
      // The message handler is being sent the message AND a reference to the logic handler module.
      // By doing this, the message handler can interact with the logic handler module and keep track of game state.

    });
    console.log('socket', req.testing);
  });
   
  app.listen(port); // open the port and listen.
