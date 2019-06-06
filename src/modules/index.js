import {
	FETCH_REPOS_SUCCESS,
	FETCH_REPOS_FAILURE,
	FETCH_REPOS_REQUEST,
	UPDATE_API_TOKEN
} from './constants';

const defaultState = {
	isLoading: false,
	isError: false,
	token: '',
	repos: []
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case FETCH_REPOS_REQUEST:
			return willFetchRepos(state);
		case FETCH_REPOS_SUCCESS:
			return didFetchRepos(state, action);
		case FETCH_REPOS_FAILURE:
			return errorFetchingRepos(state);
		case UPDATE_API_TOKEN:
			return {
				...state,
				token: action.token
			}
		default:
			return state;
	}
}

function willFetchRepos(state) {
	return {
		...state,
		isLoading: true
	}
}

function didFetchRepos(state, action) {
	return {
		...state,
		isLoading: false,
		isError: false,
		repos: action.data
	}
}

function errorFetchingRepos(state) {
	return {
		...state,
		isError: true,
		isLoading: false
	}
}