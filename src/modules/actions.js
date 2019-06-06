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

export function updateAPIToken(apiToken) {
    return {
        type: UPDATE_API_TOKEN,
        apiToken
    }
}

export function fetchRepos() {
    return async (dispatch, getState) => {
        const {apiToken: {token}} = getState();

        dispatch(fetchReposRequest());

        try {
            const response = await axios({
                method: 'get',
                url: 'https://api.github.com/user/repos',
                headers: {
                    'Authorization': `token ${token}`
                }
            });

            dispatch(fetchReposSuccess(response.data));
        } catch (error) {
            dispatch(fetchReposFailure());
        }
    }
}