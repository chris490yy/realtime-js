'use strict';

var sock = io();


function onMessage(msg) {
    var newList = document.createElement('li');
    newList.innerHTML = msg;
    var chatlist = document.getElementById('chat');
    chatlist.appendChild(newList);
}
    
function init() {    
    var form = document.getElementById('form');
    form.addEventListener('submit',function(e) {
        console.log('wow');
        var msg = document.querySelector('#input').value;
        send(msg);   
        //e.preventDefault();
  });

    sock.on('chat', function(msg) {
        onMessage(msg);
    })
}

function send(msg) {
    sock.emit('chat',msg);
}

init();

