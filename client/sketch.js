let capture;
let socket;

function setup() {
  socket = io.connect('http://localhost:3000');
  socket.emit('type', {type: "Client"});
}

function draw() {
  socket.on('motion', () => {
    select("#status").html("On Motion");
  });
  socket.on('un-motion', () => {
    select("#status").html("No Motion");
  });
}