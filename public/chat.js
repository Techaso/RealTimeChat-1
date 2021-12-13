var socket = io.connect("http://localhost:4000"); // use http, not https. Otherwise websocket won't get connectioned and socket.id won't be shown

var msg = document.getElementById("message");
var sendbutton = document.getElementById("send");
var username = document.getElementById("username");
var output = document.getElementById("output");

// setting what to do when send button is clicked
sendbutton.addEventListener('click', () => {
    // create and publish an event 'sendingMessage' with whatever is given as second argument in the .emit() function
    // Here we're using an object instead of a function as second argument
    socket.emit("sendingMessage", {
        msg: msg.value,
        username: username.value
    });
});

// Display broadcast message
socket.on('broadcastMessage', (data) => {
    // do this every time we get 'broadcastMessage'
    output.innerHTML += "<p><strong>" + data.username + ": </strong>" + data.msg + "</p>";
});