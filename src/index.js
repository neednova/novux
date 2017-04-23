import omit from 'lodash.omit';

const UPDATE = 'UPDATE';
const RESET = 'RESET';

const update = (reducer, tag, state) => ({
	type: UPDATE,
	reducer,
	tag,
	state,
});

const reset = (reducer, tag, state) => ({
	type: RESET,
	reducer,
	tag,
	state,
});

const createReducer = (name, initialState) => (state = initialState, action) => {
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

	switch (action.type) {
	case UPDATE:
		if (action.reducer === name) {
			const newState = action.state;
			return {
				...state,
				...newState,
				_lastAction: action.tag,
			};
		}
		return state;

	case RESET:
		if (action.reducer === name) {
			const newState = action.reset.state;
			if (newState.length === 0) {
				return initialState;
			}
			const resetState = omit(state, newState);
			return {
				...resetState,
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
