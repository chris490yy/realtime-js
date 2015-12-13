'use strict';

let http = require('http');
let express = require('express');
let socketio = require('socket.io');

let app = express();
let server = http.createServer(app);

let io = socketio(server);

var color = ['yellow','blue','pink','red','black','brown','orange'];

io.on('connection', (sock) => {
    console.log('client connected');
    sock.on('chat',(msg) => {
        io.emit('chat',msg);
    });
    sock.on('circle',(coord) => {
        var colorId = Math.ceil(Math.random()*7);
        io.emit('circle',coord,color[colorId]);
    });
});



app.use(express.static(__dirname+'/public'));

app.get('/hello',(req,res) => {
    res.send('WOW how dare you');
});

server.listen(8080,() => {
    console.log('listen to 8080');
});