/* jshint node: true */
/* globals document*/

var tag = require('tag'),
    socket = io();

module.exports.renderBoard = function renderBoard(map) {

    var table = tag.table(),
        tr, td;

    for (var row in map) {
        if (map.hasOwnProperty(row)) {
            tr = tag.tr();

            for (var i=0; i < map[row].length; i++) {
                td = tag.td({id: row + '_' + (i+1)});

                td.addEventListener('click', bombDropped);

                tr.appendChild(td);
            }

            table.appendChild(tr);
        }
    }

    return table;
};


function bombDropped(event) {
    socket.emit('bomb dropped', event.target.id);
}
