const express = require("express");
const socket = require("socket.io");

var app = express();

// making app.listen() function a variable 'server', to use it later for bidirectional connection
var server = app.listen(4000, () => {
     console.log("Listening to port 4000");
});

app.use(express.static("public"));

// this is one directional connection. To make it bidirectional we need to upgrade this server using socket(server)
var upgradedServer = socket(server);

upgradedServer.on("connection", (socket) => {
    
    // do this when 'connection' event happens
    socket.on('sendingMessage', (data) => {
        // do this when 'sendingMessage' event happens
        upgradedServer.emit('broadcastMessage', data);
    });
   
    console.log("Websocket connected: ", socket.id); // socket.id is an unique socket id, created everytime the connection is established
});