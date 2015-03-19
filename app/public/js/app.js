(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* jshint node: true, strict: true */
/* global window: true */

"use strict";


var is      = require('is'),
    utils   = require('./utils.js'),

    whiteListAttributes = [
        'accept', 'accept-charset', 'accesskey', 'action', 'align', 'alt', 'async',
        'autocomplete', 'autofocus', 'autoplay', 'autosave', 'bgcolor', 'border',
        'buffered', 'challenge', 'charset', 'checked', 'cite', 'code', 'codebase', 
        'color', 'cols', 'colspan', 'content', 'contenteditable', 'contextmenu', 
        'controls', 'coords', 'datetime', 'default', 'defer', 'dir', 'dirname', 
        'disabled', 'download', 'draggable', 'dropzone', 'enctype', 'for', 'form', 
        'formaction', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 
        'http-equiv', 'icon', 'id', 'ismap', 'itemprop', 'keytype', 'kind', 'label', 
        'lang', 'language', 'list', 'loop', 'low', 'manifest', 'max', 'maxlength', 
        'media', 'method', 'min', 'multiple', 'name', 'novalidate', 'open', 'optimum', 
        'pattern', 'ping', 'placeholder', 'poster', 'preload', 'pubdate', 'radiogroup', 
        'readonly', 'rel', 'required', 'reversed', 'rows', 'rowspan', 'sandbox', 
        'spellcheck', 'scope', 'scoped', 'seamless', 'selected', 'shape', 'size', 
        'sizes', 'span', 'src', 'srcdoc', 'srclang', 'start', 'step', 'summary', 
        'tabindex', 'target', 'title', 'type', 'usemap', 'value', 'width', 'wrap'
];



module.exports = function(tag, doc){

    return function build(){

        doc = utils.getDocument(doc);

        var args    = Array.prototype.slice.call(arguments),
            element = doc.createElement(tag);

        if (!args[0]) {
            return element;
        }

        args.forEach(function(arg){

            if (is.obj(arg) && !utils.isHTMLElement(arg)) {

                Object.keys(arg).forEach(function(attribute){
                    if (attribute === 'class' || attribute === 'cl' || attribute === 'cls') {
                        element.setAttribute('class', arg[attribute]);

                    } else if (attribute === 'innerHTML' || attribute === 'ih') {
                        element.innerHTML = arg[attribute];

                    } else if (attribute === 'style') {
                        element.setAttribute('style', utils.buildKeyValueString(arg, attribute));

                    } else if (attribute === 'data') {
                        utils.setDataAttribute(element, arg, attribute);

                    } else if (whiteListAttributes.indexOf(attribute) !== -1) {
                        element.setAttribute(attribute, arg[attribute]);

                    }
                });

            }

            // If the argument is a string, it should be appended as text node
            else if(is.str(arg)){
                element.appendChild(doc.createTextNode(arg));
            }

            // Else if the argument is not an object we assume it is htmlElement
            else if(arg && utils.isHTMLElement(arg)){
                element.appendChild(arg);
            }

        });

        return element;

    };

};

},{"./utils.js":4,"is":5}],2:[function(require,module,exports){
/* jshint node: true, strict: true */

"use strict";

var Tag = require('./tag.js');
module.exports = new Tag();

},{"./tag.js":3}],3:[function(require,module,exports){
/* jshint node: true, strict: true */

"use strict";

var Builder         = require('./builder.js'),

    whiteListTags   = [
    'a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio',
    'b', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button',
    'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'command',
    'datalist', 'dd', 'del', 'details', 'dfn', 'div', 'dl', 'dt', 'em',
    'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'frame',
    'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header',
    'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd',
    'keygen', 'label', 'legend', 'li', 'link', 'map', 'mark', 'meta',
    'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option',
    'output', 'p', 'param', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby',
    'samp', 'script', 'section', 'select', 'small', 'source', 'span',
    'split', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody',
    'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr',
    'track', 'tt', 'ul', 'var', 'video', 'wbr'
];



module.exports = function(doc){
    whiteListTags.forEach(function(element){
        this[element] = new Builder(element, doc);
    }.bind(this));
};

},{"./builder.js":1}],4:[function(require,module,exports){
/* jshint node: true, strict: true */
/* global window: true */

/** @module utils */

"use strict";



/**
  * Parse camelCaseString into spinal-case-string
  * @param {String} value Camel case String
  * @returns {String} 
  */

module.exports.camelCaseToSpinalCase = function(value) {
    return value.match(/[A-Z]?[a-z]+/g).join('-').toLowerCase();
};



/** 
  * Check if a value is a HTMLElement 
  * @param {*} value Any type of value
  * @returns {Boolean}
  */

module.exports.isHTMLElement = function(value) {
    return value.nodeType === 1;
};



/**
  * Build a key:value; string out of the key / values
  * in a Object.
  * @param {Object} obj Object holding key / value pairs
  * @param {String} key Which key in the Object to pick 
  * key / value pairs from
  * @returns {String} 
  */

module.exports.buildKeyValueString = function(obj, key){
    return Object.keys(obj[key]).map(function(value){
        return this.camelCaseToSpinalCase(value) + ':' + obj[key][value];
    }.bind(this)).join(';');
};



/**
  * Build data-* attributes out of the key / values
  * in a Object.
  * @param {HTMLElement} element Element to apply the data-* 
  * attributes to
  * @param {Object} obj Object holding key / value pairs
  * @param {String} key Which key in the Object to pick 
  * key / value pairs from
  * @returns {HTMLElement} 
  */

module.exports.setDataAttribute = function(element, obj, key){
    Object.keys(obj[key]).forEach(function(value){
        element.setAttribute('data-' + this.camelCaseToSpinalCase(value), obj[key][value]);
    }.bind(this));

    return element;
};



/**
  * Provide a HTML document based on which environment
  * one operate in. This function is mainly used to wrangle
  * that one want to run the js code in different
  * environments and not all provide a HTML document.
  *
  * This function will first look for "window.document".
  * If pressent, it will be returned as the HTML document.
  * If "window.document" is not pressent, it will check
  * if a HTML document was provided (ex by JSDom) as a 
  * method attribute. If provided it will be returned.
  * If no HTML document was provided, it will look for 
  * a "document" variable on the node.js specific
  * "GLOBAL" object.
  *
  * @param {HTMLDocument} doc A HTML Document
  * @returns {HTMLDocument}
  */

module.exports.getDocument = function(doc) {
    
    // In browser
    if(typeof window !== 'undefined') {
        return window.document;
    }

    // Document is manually provided
    if(doc) {
        return doc;
    }

    // In node.js
    if (GLOBAL) {
        return GLOBAL.document;
    }

    // No clue where we are
    return null;
};

},{}],5:[function(require,module,exports){
/* jshint node: true, strict: true */

/** @module is */

"use strict";



/** 
  * Check if a value is an Array 
  * @param {*} value Any type of value
  * @returns {Boolean}
  */

module.exports.arr = function(value) {
    return value instanceof Array;
};



/** 
  * Check if a value is an Object 
  * @param {*} value Any type of value
  * @returns {Boolean}
  */

module.exports.obj = function(value) {
    return value instanceof Object;
};



/** 
  * Check if a value is a Function 
  * @param {*} value Any type of value
  * @returns {Boolean}
  */

module.exports.fn = function(value) {
    return typeof value === 'function';
};



/** 
  * Check if a value is a String 
  * @param {*} value Any type of value
  * @returns {Boolean}
  */

module.exports.str = function(value) {
    return typeof value === 'string';
};



/** 
  * Check if a value is a Number 
  * @param {*} value Any type of value
  * @returns {Boolean}
  */

module.exports.num = function(value) {
    return typeof value === 'number';
};



/** 
  * Check if a value is a Date 
  * @param {*} value Any type of value
  * @returns {Boolean}
  */

module.exports.date = function(value) {
    return Object.prototype.toString.call(value) === '[object Date]';
};



/** 
  * Check if a value is a parsable JSON 
  * @param {*} value Any type of value
  * @returns {Boolean}
  */

module.exports.json = function(value) {
    try {
        JSON.parse(value);
    } catch (e) {
        return false;
    }
    return true;
};



/** 
  * Check if a value is an Object, Array or String empty
  * @param {*} value Any type of value
  * @returns {Boolean}
  */

module.exports.empty = function(obj) {
    if (obj === null) {
        return true;
    }
    if (this.arr(obj) || this.str(obj)) {
        return obj.length === 0;
    }
    if (this.obj(obj)) {
        return Object.keys(obj).length === 0;
    }
    return true;
};



/** 
  * Check if a value is undefined
  * @param {*} value Any type of value
  * @returns {Boolean}
  */

module.exports.undef = function(variable) {
    return variable === void(0);
};

},{}],6:[function(require,module,exports){
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

},{"./board":7,"./events":8}],7:[function(require,module,exports){
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

},{"tag":2}],8:[function(require,module,exports){
/*jshint: true*/
/*node: true*/

var socket = io();

socket.on('clicked', function(data) {
    alert('another user clicked a button');
});

},{}]},{},[6]);
