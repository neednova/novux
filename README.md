# novux
`novux` lets you to write Redux code simpler & faster by using an opinionated reducer generator.

1. less boilerplate: instead of having to write and maintain dozens of actions creators, simply change state using two actions, `update` or `reset`.
2. less maintenance: reduce the number of tests you have to write to only focus on business logic — all reducer action creator tests are handled by `novux`
3. code faster: easily declare and describe state changes to make coding & collaboration easier, even as state changes become more complex

## Installation

```bash
npm install novux
npm run build
npm run test
```

## Get started
### Create your reducers
```js
import createReducer from 'novux';

const initialStates = {
  user: {
    name: 'Michael',
    company: 'Nova Credit'
  },
};

const userReducer = createReducer('user', initialStates.user);
```

### Dispatch actions
`novux` lets you run Redux by handling only two actions: `update` and `reset`.

`update` is used to update the state of a single reducer given an object.
`reset` is used to reset the reducer to its initial state or reset specific keys to their initial values.

Both actions have the following signature:
`actionName(reducerName, tag, options)`

- actionName: how is the state being changed?
- reducerName: which reducer is being affected?
- tag: why is this change relevant?
- options: what values are affected?

Example:
```js
import { update, reset } from 'novux';

dispatch(update('user', 'Change username', {
	username: 'Stash',
}));

dispatch(reset('user', 'Reset the initial state', {
	reset: [],
}));

dispatch(reset('user', 'Reset specific keys', {
	reset: ['username'],
}));

// dispatch is provided by redux: http://redux.js.org/docs/api/Store.html#dispatchaction
```

### Use dot notation paths
When reseting state, you can also pass in paths in dot notation
```js
dispatch(reset('user', 'Reset paths', {
	reset: ['address.street'],
}));

// if a path is defined in the initial state, it will be reset to its initial value
// if a path is undefined in the initial state, `novux` will seek the longest sub path defined in the initial state and reset
```

### Why a tag
Using the `tag` string instead of an action name to define a state change lets you describe state changes programatically.

The tag is included in the updated state under the key `_lastAction`, allowing you to keep track of what action last affected a specific reducer in your dev tools.

```js
const consent = true;
const { username } = getState().user;
dispatch(update('user', `${username} ${consent ? 'grants' : 'revokes'} consent`, {
	consent,
}));
```

### Connecting the dots
`novux` can help you declare increasingly complicated sets of state updates in simple and consistent ways.

```js
const toggleConsent = consent => (dispatch, getState) => {
	const { username } = getState().user;
	dispatch(update('user', `${username} ${consent ? 'grants' : 'revokes'} consent`, {
		consent,
	}));

	if (!consent) {
		dispatch(update('app', `Show error & disable button`, {
			error: {
				msg: 'You need to grant consent to proceed',
				type: 'flash',
			},
			button: { able: false }
		}));
	}
};
// this example makes use of redux-thunk to easily access dispatch and state
```
