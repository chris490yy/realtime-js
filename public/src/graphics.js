'use strict';

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;

ctx.fillStyle = 'darkgoldenrod';
ctx.fillRect(0,0,w,h);

ctx.fillStyle = 'green';
//ctx.fillRect(w/2-25,h/2-25,50,50);
//------------------------------
function drawCircle(x,y,color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x,y,15,0,Math.PI*2,true);
	ctx.stroke();
	ctx.fill();
}

//drawCircle();
//-------------------------
var x = 30;
var y = 100;
var goRight = true;

function animate () {
	ctx.fillStyle = 'red';
	ctx.fillRect(0,0,w,h);
    var left = 0;
    var right = w;
    

    if(goRight){
    	drawCircle(x++,y,'blue');
    	if(x === 270)
    		goRight = false;
    }
    else{
    	drawCircle(x--,y,'yellow');
    	if(x===30)
    		goRight = true;
    }
    console.log(x);
    console.log(goRight);
	
	
	requestAnimationFrame(animate);
}

animate();

//---------------------------
ctx.beginPath();
ctx.moveTo(50,50);
ctx.lineTo(85,150);
ctx.lineTo(15,150);
ctx.closePath();
//ctx.fill();
//ctx.stroke();
