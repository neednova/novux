/* global describe, it */

import * as chai from 'chai';
import novaRedux from '../build';

const { assert } = chai;
const { update, reset, createReducer } = novaRedux;

const test = describe('Nova-Redux:', () => {
	it('should update its state', (done) => {
		const initialState = { status: { isFetching: false } };
		const api = createReducer('api', initialState);
		const action = update('api', 'test', {
			test: true,
		});
		const expected = {
			status: { isFetching: false },    // initial state
			test: true,                       // new state
			_lastAction: 'test',              // metaData returned by creators
		};
		const lastState = initialState;
		const actual = api(lastState, action);
		assert.deepEqual(actual, expected, 'the reducer updates');
		done();
	});

	it('should reset the whole state to initial state', (done) => {
		const initialState = { status: { isFetching: false } };
		const api = createReducer('api', initialState);
		const updateAction = update('api', 'test', {
			test: true,
		});
		let nextState = api(initialState, updateAction);
		const updateExpected = {
			status: { isFetching: false },
			test: true,
			_lastAction: 'test',
		};
		assert.deepEqual(nextState, updateExpected, 'the reducer updates');

		const resetAction = reset('api', 'Reset the whole state', {
			reset: [],
		});
		nextState = api(nextState, resetAction);
		assert.deepEqual(nextState, initialState, 'the reducer can reset itself to the initial state');
		done();
	});

	it('should reset given keys', (done) => {
		const initialState = { status: { isFetching: false } };
		const api = createReducer('api', initialState);
		const updateAction = update('api', 'test', {
			test: true,
		});
		const updateExpected = {
			status: { isFetching: false },
			test: true,
			_lastAction: 'test',
		};
		let nextState = api(initialState, updateAction);
		assert.deepEqual(nextState, updateExpected, 'the reducer updates');

		const resetAction = reset('api', 'resetTest', {
			reset: ['test'],
		});
		nextState = api(nextState, resetAction);
		const resetExpected = {
			status: { isFetching: false },
			_lastAction: 'resetTest',
		};
		assert.deepEqual(nextState, resetExpected, 'the reducer can reset selected keys');
		done();
	});

	it('should omit given keys that do not exist in initial state', (done) => {
		const initialState = { status: { isFetching: false } };
		const api = createReducer('api', initialState);
		const updateAction = update('api', 'test', {
			test: true,
		});
		const updateExpected = {
			status: { isFetching: false },
			test: true,
			_lastAction: 'test',
		};
		let nextState = api(initialState, updateAction);
		assert.deepEqual(nextState, updateExpected, 'the reducer updates');

		const resetAction = reset('api', 'resetTest', {
			reset: ['test'],
		});
		nextState = api(nextState, resetAction);
		const resetExpected = {
			status: { isFetching: false },
			_lastAction: 'resetTest',
		};
		assert.deepEqual(nextState, resetExpected, 'the reducer can reset selected keys');
		done();
	});

	it('should handle resetting the last key/val if given a path', (done) => {
		const initialState = { status: { isFetching: false } };
		const api = createReducer('api', initialState);
		const updateAction = update('api', 'test', {
			status: {
				isFetching: true,
			}
		});
		const updateExpected = {
			status: { isFetching: true },
			_lastAction: 'test',
		};
		let nextState = api(initialState, updateAction);
		assert.deepEqual(nextState, updateExpected, 'the reducer updates');

		const resetAction = reset('api', 'reset path', {
			reset: ['status.isFetching'],
		});
		nextState = api(nextState, resetAction);
		const resetExpected = {
			status: { isFetching: false },
			_lastAction: 'reset path',
		};
		assert.deepEqual(nextState, resetExpected, 'the reducer can handle paths');
		done();
	});

	it('should return an error if the path is undefined', (done) => {
		const initialState = { status: { isFetching: false } };
		const api = createReducer('api', initialState);
		const updateAction = update('api', 'test', {
			status: {
				isFetching: true,
			}
		});
		const updateExpected = {
			status: { isFetching: true },
			_lastAction: 'test',
		};
		let nextState = api(initialState, updateAction);
		assert.deepEqual(nextState, updateExpected, 'the reducer updates');

		const resetAction = reset('api', 'reset wrong path', {
			reset: ['wrong.path'],
		});
		const wrapper = () => {
			api(nextState, resetAction);
		}

		assert.throws(wrapper, 'Provided path does not exist');
		done();
	});
});

export default test;
