/* global describe, it */

import * as chai from 'chai';
import novaRedux from '../build';

const { assert } = chai;
const { update, reset, createReducer } = novaRedux;

const test = describe('novux:', () => {
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

	describe('update', () => {
		it('updates specific keys with the provided values', (done) => {
			const expected = {
				status: { isFetching: false },    // initial state
				test: true,                       // new state
				_lastAction: 'test',              // log
			};
			assert.deepEqual(nextState, expected, 'the reducer can update its state');
			done();
		});
	})

	describe('reset', () => {
		it('resets the whole state to its initial state', (done) => {
			const resetAction = reset('api', 'Reset the whole state', {
				reset: [],
			});
			const state = api(nextState, resetAction);
			assert.deepEqual(state, initialState, 'the state is replaced with the initial state');
			done();
		});

		it('resets specific keys to their initial values if they are defined in the initial state', (done) => {
			const updateAction = update('api', 'Change isFetching to true', {
				status: { isFetching: true },
			});
			const changeState = api(nextState, updateAction);
			assert.isTrue(changeState.status.isFetching, 'the reducer updates');

			const resetAction = reset('api', 'reset isFetching', {
				reset: ['status'],
			});
			const expected = {
				status: { isFetching: false },
				test: true,
				_lastAction: 'reset isFetching',
			};
			const state = api(changeState, resetAction);
			assert.deepEqual(state, expected, 'if a key is defined in state and initialState, it is reset to its initial value');
			done();
		});

		it('removes keys that are undefined in the initial state', (done) => {
			const resetAction = reset('api', 'resetTest', {
				reset: ['test'],
			});
			const expected = {
				status: { isFetching: false },
				_lastAction: 'resetTest',
			};
			const state = api(nextState, resetAction);
			assert.deepEqual(state, expected, 'if a key is defined in state but undefined in the initial state, it\'s removed');
			done();
		});

		it('resets the end-most key if given a path that is defined in the initial state', (done) => {
			const updateAction = update('api', 'Change isFetching to true', {
				status: { isFetching: true },
			});
			const changeState = api(nextState, updateAction);
			assert.isTrue(changeState.status.isFetching, 'the reducer updates');

			const resetAction = reset('api', 'reset valid path', {
				reset: ['status.isFetching'],
			});
			const expected = {
				status: { isFetching: false },
				test: true,
				_lastAction: 'reset valid path',
			};
			const state = api(changeState, resetAction);
			assert.deepEqual(state, expected, 'if a path is defined in the initial state, it is reset to its initial value');
			done();
		});

		it('handles paths that are undefined in the initial state by reseting the longest valid subpath', (done) => {
			assert.isFalse(nextState.status.isFetching);
			const updateAction = update('api', 'Create long path', {
				status: { isFetching: { for: { a: { long: { path: true }}}}},
			});
			const changeState = api(nextState, updateAction);
			assert.isTrue(changeState.status.isFetching.for.a.long.path);

			const resetAction = reset('api', 'reset invalid path', {
				reset: ['status.isFetching.this.is.a.short'],
			});
			const expected = {
				status: { isFetching: false },
				test: true,
				_lastAction: 'reset invalid path',
			};
			const state = api(changeState, resetAction);
			assert.deepEqual(state, expected, 'the longest valid subPath is reset');
			done();
		});

		it('handles paths that are entirely undefined in the initial state', (done) => {
			assert.isFalse(nextState.status.isFetching);
			const updateAction = update('api', 'Create long path', {
				status: { isFetching: { for: { a: { long: { path: true }}}}},
			});
			const changeState = api(nextState, updateAction);
			assert.isTrue(changeState.status.isFetching.for.a.long.path);

			const resetAction = reset('api', 'reset invalid path', {
				reset: ['this.is.an.invalid.path'],
			});
			const expected = {
				status: { isFetching: { for: { a: { long: { path: true }}}}},
				test: true,
				_lastAction: 'reset invalid path',
			}
			const state = api(changeState, resetAction);
			assert.deepEqual(state, expected, 'the long valid subPath is reset');
			done();
		});

		it('if a path is undefined in both the state and the initial state, but a subpath is defined in the initial state, initial values are reset', (done) => {
			const initialState = { status: { isFetching: false } };
			api = createReducer('api', initialState);
			const action = update('api', 'branch off', {
				status: { another: { path: true} },
			});
			nextState = api(initialState, action);

			const action2 = reset('api', 'reset', {
				reset: ['status.isFetching'],
			});
			nextState = api(nextState, action2);
			const expected = {
				status: {
					another: { path: true },
					isFetching: false
				},
				_lastAction: 'reset',
			};
			assert.deepEqual(nextState, expected);
			done();
		});
	})
});

export default test;
