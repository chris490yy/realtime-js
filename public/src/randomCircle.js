'use strict';

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;


function onMessage(coord,color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(coord.x,coord.y,15,0,Math.PI*2,true);
	ctx.stroke();
	ctx.fill();
	
}

function init() {
	canvas.addEventListener('mousedown',function(e) {

		var coord = {x:e.pageX,y:e.pageY};
		send(coord);
		//onMessage(coord);
	});

	

	sock.on('circle',function(coord,color) {
		console.log(coord.x);
		console.log(color);
		onMessage(coord,color);
	});

}

function send(coord) {
	sock.emit('circle',coord);
}

init();