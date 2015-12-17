'use strict';

var sock = io();


function createSystemMessage(msg) {

    var newList = document.createElement('li');
    newList.setAttribute('class','sys_msg');
    newList.innerHTML = msg;
    var chatlist = document.getElementById('chat');
    chatlist.appendChild(newList);
}

function createChatMessage(userWithMsg) {
    var newList = document.createElement('li');
    newList.setAttribute('class','client_msg');
    var chatMsgToBeShowed = userWithMsg.name + ' said: '+userWithMsg.msg;
    newList.innerHTML = chatMsgToBeShowed;
    var chatlist = document.getElementById('chat');
    chatlist.appendChild(newList);
}

function userLogin(SysMsg) {
    console.log('in userLogin');
    document.getElementById('logIn').style.display = 'none';
    document.getElementById('chatRoom').style.display = 'block';
    onlineUserUpdate(SysMsg,true);
}

function userLogout(SysMsg) {
    console.log('logout');
    console.log(SysMsg.num);
    onlineUserUpdate(SysMsg,false);
}

function onlineUserUpdate(SysMsg,joinOrNot) {
    var nameList = '';
    console.log(SysMsg);
    SysMsg.nameList.forEach(function(element) {
        nameList+=element+' ';
    });
    document.getElementById('showClientNumber').innerHTML = 'Number of Online user: '
        +SysMsg.num;
    document.getElementById('showClientName').innerHTML = 'Name list: '+ nameList;
    if(joinOrNot)
        createSystemMessage(SysMsg.name+' joins in the chatroom.');
    else
        createSystemMessage(SysMsg.name+ ' left the chatroom');
}

function userSubmitName() {
    var userInputName = document.getElementById('userInputName').value.trim();
    if(userInputName === '')
        document.getElementById('invalidUsername').innerHTML = 'plz enter valid name';
    else {
        sock.emit('login',userInputName);
    }
}

function init() {
    sock.on('chat', createChatMessage);
    sock.on('login', userLogin);
    sock.on('dupUsername', function() {
        document.getElementById('invalidUsername').innerHTML = 'the username has been used';
    });
    sock.on('disconnected',userLogout);

    var form = document.getElementById('form');
    form.addEventListener('submit',function(e) {
        var msg = document.querySelector('#input').value;
        sock.emit('chat',msg); 
        e.preventDefault();
    });   
}

init();





