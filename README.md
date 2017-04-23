# nova-redux

`nova-redux` allows you to considerably reduce Redux boilerplate using a simple but opinionated reducer generator and set of actions.

## Why `nova-redux`?
We wrote `nova-redux` to solve several recurring problems when writing & maintaining redux apps.

1. too much boilerplate: we found ourselves writing dozens/hundreds of lines of action-creator and reducer code when the underlying logic is the same — updating or reseting a state
2. high maintenance cost: our redux test suite grew at the same rate as our redux code base, making maintenance costs high
3. poor readability: our redux code was hard to follow as while most of our ux logic was written in functions or thunk-actions, the definition of state changes were tucked inside action-creators.

## Installation

```bash
npm install nova-redux
```

## Get started
### 1. Create your reducers
```js
import createReducer from 'nova-redux';

const initialStates = {
  user: {
    name: 'Michael',
    company: 'Nova Credit'
  },
};

const userReducer = createReducer('user', initialStates.user);
```

### 2. Dispatch actions
`nova-redux` works by using only two actions: `update` and `reset`.

`update` is used to update the state of a single reducer given an object.
`reset` is used to reset the reducer to its initial state or remove specific keys.

Both actions have the following signature:
`actionName(reducerName, tag, options)`

This signature allows you define state updates in a declarative way, making the code easier to organize and follow:
- actionName: how is the state being changed?
- reducer: which reducer ('who') is being affect?
- tag: why this change?
- options: what values are affected?

For example:
```js
import { update, reset } from 'nova-redux';

// update a value
dispatch(update('user', 'Change username', {
	username: 'Stash',
}));

// to reset the initial state, use an empty array
dispatch(reset('user', 'Reset the initial state', {
	reset: [],
}));

// to reset specific keys (or remove them if they don't exist in the initial state)
// fill up the array with keys.
dispatch(reset('user', 'Reset specific keys', {
	reset: ['username'],
	// reset: ['names.firstName']  <-- or use dot notation to reset or remove nested keys
}));
```

We find that using the `tag` string as the action name instead of the type allows for more flexibility and clarity.
For example, you can use string templates to describe state updates programatically.

```js
const consent = true;
const { username } = getState().user;
dispatch(update('user', `${username} ${consent ? 'grants' : 'revokes'} consent`, {
	consent,
}));
```

### 3. Conclusion
Using the `nova-redux` pattern has allowed us to declare increasingly complicated state updates in simple ways.

```js
const toggleConsent = consent => (dispatch, getState) => {
	const { username } = getState().user;
	dispatch(update('user', `${username} ${consent ? 'grants' : 'revokes'} consent`, {
		consent,
	}));

	if (!consent) {
		dispatch(update('errors', `Show !consent error`, {
			error: 'You need to grant consent to proceed'
		}));
	}
};
// you need to add the redux-thunk middleware for this example to work
```

# TODO:

- Add test suite
- Add dot.notation in reset state
- Add eslint
- Add license
- Add babelrc
