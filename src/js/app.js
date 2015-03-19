/*jshint: true*/
/*node: true*/

var events = require('./events'),
    board = require('./board'),
    boardElement = document.querySelector('.bs-main-board'),
    socket = io();

socket.on('ready', function(data) {
    console.log(data);
    boardElement.innerHTML = '';
    boardElement.appendChild(board.renderBoard(data.map));
});
