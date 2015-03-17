/* jshint node: true */
/* globals document*/

var tag = require('tag');

module.exports.renderBoard = function renderBoard(width, height) {

    var table = tag.table(),
        tr, td;

    for (var i=0; i < height; i++) {

        tr = tag.tr();
        for (var j=0; j < width; j++) {
            td = tag.td({id: 'cell_' + i + '_' + j});
            tr.appendChild(td);
        }

        table.appendChild(tr);

    }

    return table;
};
