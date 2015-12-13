'use strict';

let http = require('http');
let express = require('express');
let socketio = require('socket.io');

let app = express();
let server = http.createServer(app);

let io = socketio(server);

var colorLib = ['yellow','blue','pink','red','black','brown','orange'];

var circleHistory = [];

var numOfClientsConnected = 0;

io.on('connection', (sock) => {
    numOfClientsConnected++;
    console.log('one client connected,totla clients is '+numOfClientsConnected);
    circleHistory.forEach(function(his) {
        io.emit('circle',his.coord,his.color);
    });

    sock.on('chat',(msg) => {
        io.emit('chat',msg);
    });
    sock.on('circle',(coord) => {
        var colorId = Math.ceil(Math.random()*7);
        var color = colorLib[colorId];
        circleHistory.push({coord:coord,color:color});
        io.emit('circle',coord,color);
    });
});

io.on('disconnection',(sock) => {
    numOfClientsConnected--;
    console.log('one client disconnected,totla clients is '+numOfClientsConnected);

});



app.use(express.static(__dirname+'/public'));

app.get('/hello',(req,res) => {
    res.send('WOW how dare you');
});

server.listen(8080,() => {
    console.log('listen to 8080');
});