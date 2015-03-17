/*jshint: true*/
/*node: true*/

var events = require('./events'),
    board = require('./board'),
    grid = document.querySelector('.bs-grid');

console.log(board);
var socket = io(),
    button = document.querySelector('#btn');

grid.appendChild(board.renderBoard(8,8));
