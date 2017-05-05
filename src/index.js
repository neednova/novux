import utils from './utils';
const { resetState } = utils;

const UPDATE = 'UPDATE';
const RESET = 'RESET';

/**
* update
* @param	{String}	reducer	the name of the reducer to update
* @param	{String}	tag	a short description of the update
* @param	{Ojbect}	state the keys to update
* @return {Object} 	an action creator object
*/
export const update = (reducer, tag, state) => ({
	type: UPDATE,
	reducer,
	tag,
	state,
});

/**
* reset
* @param	{String}	reducer	the name of the reducer to reset
* @param	{String}	tag	a short description of the reset
* @param	{Ojbect}	state the keys to reset
* @return {Object} 	an action creator object
*/
export const reset = (reducer, tag, state) => ({
	type: RESET,
	reducer,
	tag,
	state,
});

/**
* createReducer
* @param	{String}	name	the reducer's name
* @param	{Object}	initialState	the reducer's initial state
* @return {Function} a createReducer function which handles update & reset actions
*/
export const createReducer = (name, initialState) => (state = initialState, action) => {
	if (typeof name !== 'string') {
		return new Error('Expected reducer name to be a string');
	}
	if (typeof initialState !== 'object') {
		return new Error('Expected initialState to be an object');
	}
	if (typeof state !== 'object') {
		return new Error('Expected state to be an object');
	}
	if (typeof action !== 'object') {
		return new Error('Expected action to be an object');
	}
	if (action.type === RESET && !Array.isArray(action.state.reset)) {
		return new Error('expected reset options to be an array');
	}

	switch (action.type) {
	case UPDATE:
		if (action.reducer === name) {
			const nextState = action.state;
			return {
				...state,
				...nextState,
				_lastAction: action.tag,
			};
		}
		return state;

	case RESET:
		if (action.reducer === name) {
			const nextState = action.state.reset;
			if (nextState.length === 0) { return initialState; }
			const resettedState = resetState(initialState, state, nextState);
			return {
				...resettedState,
				_lastAction: action.tag,
			};
		}
		return state;

	default:
		return state;
	}
};

const novaRedux = {
	createReducer,
	update,
	reset,
}

export default novaRedux;
