'use strict';

let http = require('http');
let express = require('express');
let socketio = require('socket.io');

let app = express();
let server = http.createServer(app);
let io = socketio(server);

var numOfClientsConnected = 0;
var clients = [];

io.on('connection', (sock) => {
   
    sock.on('login',(user) => {
        console.log('user login');
    	if(clients.indexOf(user)>-1){
            console.log('dup');
    		io.emit('dupUsername');
        }
    	else{  
            sock.name = user;
            numOfClientsConnected++;
            console.log('one client connected,total clients is '+numOfClientsConnected);
            console.log('push'); 		
    		clients.push(user);
    		var SysMsg = {num:numOfClientsConnected,nameList:clients,name:user};
    		io.emit('login',SysMsg);
    	}       
    });

    sock.on('chat',(msg) => {
        var userWithMsg = {name:sock.name,msg:msg};
        console.log(userWithMsg);
        io.emit('chat',userWithMsg);
    });

    sock.on('disconnect',() => {
    	
        numOfClientsConnected--;
   	 	console.log('one client disconnected,total clients is '+numOfClientsConnected);
    	clients=clients.filter(function(element) {
    		return element !== sock.name;
    	});
    	console.log(numOfClientsConnected);
    	console.log(clients.length);
    	io.emit('disconnected',{num:numOfClientsConnected,nameList:clients,name:sock.name});
    	console.log('emit');
	});  
});



app.use(express.static(__dirname+'/public'));
/*


app.get('/hello',(req,res) => {
    res.send('WOW how dare you');
});
*/

server.listen(8080,() => {
    console.log('listen to 8080');
});