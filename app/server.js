var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    clients = [];

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
    console.log('A new user connected');
    clients.push(socket);
    console.info('Number of clients is now ' + clients.length);

    socket.on('btnClick', function(data) {
        console.log(data);
        socket.broadcast.emit('clicked');
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
        var index = clients.indexOf(socket);
        if (index != -1) {
            clients.splice(index, 1);
            console.info('Client gone (id=' + socket.id + ').');
            console.info('Number of clients is now ',clients.length);
        }
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
