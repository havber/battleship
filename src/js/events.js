/*jshint: true*/
/*node: true*/

var socket = io();

socket.on('clicked', function(data) {
    alert('another user clicked a button');
});
