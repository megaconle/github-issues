import apiToken from '../apiToken';
import {
    UPDATE_API_TOKEN
} from '../constants';

const defaultState = {
	token: ''
}

describe('apiToken reducer', () => {
	it('returns the state on an unhandled action', () => {
		expect(apiToken(defaultState, {type: 'UNHANDLED_ACTION'})).toEqual(defaultState);
	});

	it('returns the correct state on UPDATE_API_TOKEN', () => {
		expect(apiToken(defaultState, {type: UPDATE_API_TOKEN, apiToken: 'token'})).toEqual({token: 'token'})
	});
});