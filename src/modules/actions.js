import axios from 'axios';
import {
	FETCH_REPOS_SUCCESS,
	FETCH_REPOS_FAILURE,
	FETCH_REPOS_REQUEST,
	UPDATE_API_TOKEN
} from './constants';

export function fetchReposRequest() {
	return {
		type: FETCH_REPOS_REQUEST
	};
}

export function fetchReposSuccess(data) {
	return {
		type: FETCH_REPOS_SUCCESS,
		data
	};
}

export function fetchReposFailure() {
	return {
		type: FETCH_REPOS_FAILURE
	};
}

export function updateAPIToken(token) {
	return {
		type: UPDATE_API_TOKEN,
		token
	}
}

export function fetchRepos() {
	return async (dispatch, getState) => {
		const {token} = getState();

		dispatch(fetchReposRequest());

		const url = 'https://api.github.com/user/repos';

		try {
			const data = await axios({
				method: 'get',
				url,
				auth: {
					token
				}
			});

			dispatch(fetchReposSuccess(data));
		} catch (error) {
			dispatch(fetchReposFailure());
		}
	}
}