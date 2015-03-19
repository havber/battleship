var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    player = require('../bin/player'),
    players = [];

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {

    if (players.length < 2) {
        var new_player = new player.Player('pl_'+socket.id, socket.id);
        socket.bs_index = players.length;

        if(players.length > 0) {
            players[0].opponent_id = new_player.id;
            new_player.opponent_id = players[0].id;
        }

        players.push(new_player);
        console.log(players);

        socket.emit('ready', new_player);
    }

    socket.on('disconnect', function() {
        players.splice(this.bs_index, 1);
        console.dir(players);
    });

    socket.on('bomb dropped', function(data) {
        console.log('Bomb dropped on ' + data);
    });

});

http.listen(8000, function() {
    console.log('listening on *:8000');
});
