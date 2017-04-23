/* global describe, it */

import * as chai from 'chai';
import novaRedux from './src';

const { assert } = chai;
const { update, reset, createReducer } = novaRedux;

const test = describe('Nova-Redux:', () => {
	it('should update its state', (done) => {
		const api = createReducer('api');
		const initialState = { status: { isFetching: false } };
		const action = update('api', 'test', {
			test: true,
		});
		const expected = {
			status: { isFetching: false },    // initial state
			test: true,                       // new state
			_lastAction: 'test',              // metaData returned by creators
		};
		const actual = api(initialState, action);
		assert.deepEqual(actual, expected, 'the reducer updates');
		done();
	});

	it('should reset selected keys', (done) => {
		const api = createReducer('api');
		const initialState = { status: { isFetching: false } };
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

	it('should reset the whole state to initial state', (done) => {
		const api = createReducer('api');
		const initialState = { status: { isFetching: false } };
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

		const resetAction = reset('api', 'resetEverything', {
			reset: constants.RESET_EVERYTHING,
		});
		nextState = api(nextState, resetAction);
		assert.deepEqual(nextState, initialState, 'the reducer can reset itself to the initial state');
		done();
	});
});

export default test;
