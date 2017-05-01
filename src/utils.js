import dotty from 'dotty';

/*
* resetOrOmit
* initialState: object with the reducer's initial state
* state: object with the reducer's initial state
* keys: array of strings representing keys or paths to keys to reset
* returns an object with the completely or partially resetted state
*/
const resetOrOmit = (initialState, state, keys) => {
	const resetState = state;

	keys.forEach((key) => {
		if (typeof key !== 'string') {
			return new Error('Expected reset key option to be a string')
		}

		const hasInitialState = dotty.exists(initialState, key);

		if (hasInitialState) {
			dotty.put(resetState, key, initialState[key]);
		} else {
			dotty.remove(resetState, key)
		}
	});

	return resetState;
};

const utils = {
	resetOrOmit,
}

export default utils;
