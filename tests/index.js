/* global describe, it */

import * as chai from 'chai';
import novaRedux from '../build';

const { assert } = chai;
const { update, reset, createReducer } = novaRedux;

const test = describe('Nova-Redux:', () => {
	const initialState = { status: { isFetching: false } };
	let nextState;
	let api;
	beforeEach(() => {
		api = createReducer('api', initialState);
		const action = update('api', 'test', {
			test: true,
		});
		nextState = api(initialState, action);
	})

	it('can update its state', (done) => {
		const expected = {
			status: { isFetching: false },    // initial state
			test: true,                       // new state
			_lastAction: 'test',              // log
		};
		assert.deepEqual(nextState, expected, 'the reducer can update its state');
		done();
	});

	it('can reset the whole state to initial state', (done) => {
		const resetAction = reset('api', 'Reset the whole state', {
			reset: [],
		});
		const state = api(nextState, resetAction);
		assert.deepEqual(state, initialState, 'the reducer can reset itself to the initial state');
		done();
	});

	it('can reset specific keys', (done) => {
		const resetAction = reset('api', 'resetTest', {
			reset: ['test'],
		});
		const expected = {
			status: { isFetching: false },
			_lastAction: 'resetTest',
		};
		const state = api(nextState, resetAction);
		assert.deepEqual(state, expected, 'the reducer can reset specific keys');
		done();
	});

	it('on reset, it will remove specific keys from the state if they do not exist in the initial state', (done) => {
		const resetAction = reset('api', 'resetTest', {
			reset: ['test'],
		});
		const expected = {
			status: { isFetching: false },
			_lastAction: 'resetTest',
		};
		const state = api(nextState, resetAction);
		assert.deepEqual(state, expected, 'the reducer can reset selected keys');
		done();
	});

	it('should handle resetting the last key/val if given a path', (done) => {
		const resetAction = reset('api', 'reset path', {
			reset: ['status.isFetching'],
		});
		const expected = {
			status: { isFetching: false },
			_lastAction: 'reset path',
		};
		const state = api(nextState, resetAction);
		assert.deepEqual(state, expected, 'the reducer can handle paths');
		done();
	});

	it('should return an error if the path is undefined', (done) => {
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
