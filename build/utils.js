'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _dotty = require('dotty');

var _dotty2 = _interopRequireDefault(_dotty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* resetOrOmit
* initialState: object with the reducer's initial state
* state: object with the reducer's initial state
* keys: array of strings representing keys or paths to keys to reset
* returns an object with the completely or partially resetted state
*/
var resetOrOmit = function resetOrOmit(initialState, state, keys) {
	var resetState = state;

	keys.forEach(function (key) {
		if (typeof key !== 'string') {
			return new Error('Expected reset key option to be a string');
		}

		var hasInitialState = _dotty2.default.exists(initialState, key);

		if (hasInitialState) {
			_dotty2.default.put(resetState, key, initialState[key]);
		} else {
			_dotty2.default.remove(resetState, key);
		}
	});

	return resetState;
};

var utils = {
	resetOrOmit: resetOrOmit
};

exports.default = utils;