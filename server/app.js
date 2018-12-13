const express = require('express');
const app = express();
const ss = require('socket.io-stream');

var cameras = {};
var clients = {};

var server = app.listen(3000, '0.0.0.0',() => {
    console.log("listening port 3000..");
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
    socket.on('type', (data) => {
        console.log(`${data.type} ${socket.id} connected`)
        if(data.type === "Camera"){
            cameras[socket.id] = socket;
        }
        else if(data.type === "Client"){
            clients[socket.id] = socket;
        }
    })

    socket.on('disconnect', () => {
        if(socket.id in cameras){
            delete cameras[socket.id];
            console.log(`Camera ${socket.id} deleted!`);
        }
        else if(socket.id in clients){
            delete clients[socket.id];
            console.log(`Client ${socket.id} deleted!`);
        }
    })

    socket.on('motion', () => {
        // console.log("Motion detected");
        for(var client in clients){
            io.to(client).emit('motion')
            // console.log(`emitted to ${client}`)
        }
    })

    socket.on('un-motion', () => {
        // console.log("Motion undetected!");
        for(var client in clients){
            io.to(client).emit('un-motion')
        }
    })

    socket.on('box', data => {
        for(var client in clients){
            io.to(client).emit('box', data);
        }
    })

    socket.on('image', capture => {
        for(var client in clients){
            io.to(client).emit('image', capture);
        }
    })
})
