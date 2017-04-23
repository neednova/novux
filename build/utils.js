'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
// https://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key
var resolve = function resolve(path, obj) {
	return path.split('.').reduce(function (prev, curr) {
		return prev ? prev[curr] : undefined;
	}, obj || self);
};

var resetOrOmit = function resetOrOmit(initialState, state, keys) {
	var resetState = state;

	keys.forEach(function (key) {
		if (typeof key !== 'string') {
			return new Error('Expected reset key option to be a string');
		}

		if (!key.includes('.')) {
			// key is name, not a dot notation path
			// reset this key to its initial state or omit it
			if (initialState.hasOwnProperty(key)) {
				resetState[key] = initialState[key];
			} else {
				delete resetState[key];
			}
		} else {
			// key is a path in dot notation
			// reset this key to its initial state or return an error
			var value = resolve(key, initialState);
			if (value) {
				_.set(resetState, key, value);
			} else {
				return new Error('Provided path does not exist');
			}
		}
	});

	return resetState;
};

var utils = {
	resetOrOmit: resetOrOmit
};

exports.default = utils;