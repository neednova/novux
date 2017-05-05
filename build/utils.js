'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _dotty = require('dotty');

var _dotty2 = _interopRequireDefault(_dotty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* resetState
* @param	{Object}	initialState object with the reducer's initial state
* @param	{Object} 	state object with the reducer's initial state
* @param	{Array} 	keys array of strings representing keys or paths to keys to reset
* @return {Object} 	an object with the completely or partially resetted state
*/
var resetState = function resetState(initialState, state, nextState) {
	var returnedState = Object.assign({}, state);

	nextState.forEach(function (key) {
		if (typeof key !== 'string') {
			return new Error('Expected reset key option to be a string');
		}

		if (key.includes('.')) {
			var paths = key.split('.');
			var subPaths = key.split('.');
			paths.some(function (path) {
				var subPath = subPaths.join('.');
				var exists = _dotty2.default.exists(initialState, subPath);
				if (exists) {
					var value = _dotty2.default.get(initialState, subPath);
					_dotty2.default.put(returnedState, subPath, value);
					return true;
				}
				subPaths.pop();
				return false;
			});
		} else {
			var hasInitialState = initialState.hasOwnProperty(key);
			hasInitialState ? returnedState[key] = initialState[key] : delete returnedState[key];
		}
	});

	return returnedState;
};

var utils = {
	resetState: resetState
};

exports.default = utils;