/*jshint: true*/
/*node: true*/

var events = require('./events.js');

var socket = io(),
    button = document.querySelector('#btn');

button.addEventListener('click', function(event) {
    event.preventDefault();
    console.log('Hepp!');
    socket.emit('btnClick', 'User clicked button');
    return false;
});
