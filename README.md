# nova-redux

`nova-redux` allows you to considerably reduce Redux boilerplate using a opinionated reducer generator and set of actions.

## Why `nova-redux`?
We wrote `nova-redux` to solve several problems we faced while writing and maintaining our redux apps:

1. too much boilerplate: we found ourselves writing dozens/hundreds of lines of action-creator and reducer code
2. high maintenance cost: writing a comprehensive test suite for our project increased
3. unclear state definition: easy to lose track

`nova-redux` has also helped us reduce the learning curve required by new developers joining the project.

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

`nova-redux` works by using only two actions: update and reset.

`update` is used to update the state of a single reducer given an object.
`reset` is used to reset the reducer to its initial state or remove specific keys.

Both actions have the following signature:
`actionName(reducerName, tag, options)`

This signature allows you define state updates in a declarative way:
- actionName: how is the state being changed?
- reducer: which reducer ('who') is being affect?
- tag: why this change?
- options: what values are affected?

This approach has allowed us to better organize our code and make it easier to follow the next time around.

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
