const express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);
server.listen(3003);

io.on('connect', socket => {
    console.log('connect'); 
    socket.emit("hi", "Electron!?");
});

app.get('/', (req,res) => res.json([1,2,3]));

