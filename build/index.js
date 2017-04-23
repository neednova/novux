'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resetOrOmit = _utils2.default.resetOrOmit;


var UPDATE = 'UPDATE';
var RESET = 'RESET';

var update = function update(reducer, tag, state) {
	return {
		type: UPDATE,
		reducer: reducer,
		tag: tag,
		state: state
	};
};

var reset = function reset(reducer, tag, state) {
	return {
		type: RESET,
		reducer: reducer,
		tag: tag,
		state: state
	};
};

var createReducer = function createReducer(name, initialState) {
	return function () {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
		var action = arguments[1];

		if (typeof name !== 'string') {
			return new Error('Expected reducer name to be a string');
		}
		if ((typeof initialState === 'undefined' ? 'undefined' : _typeof(initialState)) !== 'object') {
			return new Error('Expected initialState to be an object');
		}
		if ((typeof state === 'undefined' ? 'undefined' : _typeof(state)) !== 'object') {
			return new Error('Expected state to be an object');
		}
		if ((typeof action === 'undefined' ? 'undefined' : _typeof(action)) !== 'object') {
			return new Error('Expected action to be an object');
		}
		if (action.type === RESET && !action.reset.state.isArray()) {
			return new Error('expected reset options to be an array');
		}

		switch (action.type) {
			case UPDATE:
				if (action.reducer === name) {
					var nextState = action.state;
					return _extends({}, state, nextState, {
						_lastAction: action.tag
					});
				}
				return state;

			case RESET:
				if (action.reducer === name) {
					var _nextState = action.reset.state;
					if (_nextState.length === 0) {
						return initialState;
					}
					var resetState = resetOrOmit(initialState, state, _nextState);
					return _extends({}, resetState, {
						_lastAction: action.tag
					});
				}
				return state;

			default:
				return state;
		}
	};
};

var novaRedux = {
	createReducer: createReducer,
	update: update,
	reset: reset
};

exports.default = novaRedux;