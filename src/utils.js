import set from 'lodash.set';

// https://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key
const resolve = (path, obj) => {
    return path.split('.').reduce((prev, curr) => {
        return prev ? prev[curr] : undefined
    }, obj || self)
}

const resetOrOmit = (initialState, state, keys) => {
	const resetState = state;

	keys.forEach((key) => {
		if (typeof key !== 'string') {
			return new Error('Expected reset key option to be a string')
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
			const value = resolve(key, initialState);
			if (typeof value !== 'undefined') {
				set(resetState, key, value);
			} else {
				throw new Error('Provided path does not exist');
			}
		}
	});

	return resetState;
};

const utils = {
	resetOrOmit,
}

export default utils;
