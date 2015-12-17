'use strict';

var sock = io();
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;


function drawCircle(coord,color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(coord.x,coord.y,15,0,Math.PI*2,true);
    ctx.stroke();
    ctx.fill();
    
}

function createMessage(msg) {

    var newList = document.createElement('li');
    newList.innerHTML = msg;
    var chatlist = document.getElementById('chat');
    chatlist.appendChild(newList);
}
   
function init() {    
    var form = document.getElementById('form');
    form.addEventListener('submit',function(e) {
        console.log('got event');
        var msg = document.querySelector('#input').value;
        sock.emit('chat',msg);
        console.log(msg);  
        e.preventDefault();
    });
    canvas.addEventListener('mousedown',function(e) {
        var coord = {x:e.pageX,y:e.pageY};
        sock.emit('circle',coord);
    });

    sock.on('circle',drawCircle);
    sock.on('chat', createMessage);
}



init();

