/*jshint: true*/
/*node: true*/

var square = require('./square'),
    letters = "ABCDEFGHIJKLMNOPQRSTUVXYZ";

module.exports.Map = function Map(height, width) {

    var map = {};

    for (var i=0; i < height; i++) {

        map[letters[i]] = new Array(width);

        for (var j=0; j < width; j++) {

            map[letters[i]][j] = new square.Square(i+1, j+1, false, false);

        }

    }

    return map;
};
