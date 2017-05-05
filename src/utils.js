import dotty from 'dotty';

/**
* resetState
* @param	{Object}	initialState object with the reducer's initial state
* @param	{Object} 	state object with the reducer's initial state
* @param	{Array} 	keys array of strings representing keys or paths to keys to reset
* @return {Object} 	an object with the completely or partially resetted state
*/
const resetState = (initialState, state, nextState) => {
	const returnedState = Object.assign({}, state);

	nextState.forEach((key) => {
		if (typeof key !== 'string') {
			return new Error('Expected reset key option to be a string')
		}

		if (key.includes('.')) {
			const paths = key.split('.');
			const subPaths = key.split('.');
			paths.some((path) => {
				const subPath = subPaths.join('.');
				const exists = dotty.exists(initialState, subPath);
				if (exists) {
					const value = dotty.get(initialState, subPath)
					dotty.put(returnedState, subPath, value);
					return true;
				}
				subPaths.pop();
				return false;
			});
		} else {
			const hasInitialState = initialState.hasOwnProperty(key);
			hasInitialState ? (returnedState[key] = initialState[key]) : delete returnedState[key];
		}
	});

	return returnedState;
};

const utils = {
	resetState,
}

export default utils;
