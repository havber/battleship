/*jshint: true*/
/*node: true*/

var map = require('./map');

module.exports.Player = function Player(nick, id) {
    this.nick = nick;
    this.id = id;
    this.map = new map.Map(5,5);
};

module.exports.getPlayerById = function(players, id) {
    for (var pl in players) {
        if (players.hasOwnProperty(pl)) {
            if (pl.id === id) {
                return pl;
            }
        }
    }

    return false;
};
