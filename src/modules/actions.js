import axios from 'axios';
import {
    FETCH_REPOS_SUCCESS,
    FETCH_REPOS_FAILURE,
    FETCH_REPOS_REQUEST,
    UPDATE_API_TOKEN,
    FETCH_ISSUES_SUCCESS,
    FETCH_ISSUES_FAILURE,
    FETCH_ISSUES_REQUEST,
    UPDATE_SELECTED_REPO
} from './constants';
import {
    getSelectedRepoById
} from './selectors';

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

export function updateSelectedRepository(repoId) {
    return {
        type: UPDATE_SELECTED_REPO,
        id: repoId
    }
}

export function fetchIssuesRequest() {
    return {
        type: FETCH_ISSUES_REQUEST
    }
}

export function fetchIssuesSuccess(data) {
    return {
        type: FETCH_ISSUES_SUCCESS,
        data
    }
}

export function fetchIssuesFailure() {
    return {
        type: FETCH_ISSUES_FAILURE
    }
}

export function selectRepository(repoId) {
    return async (dispatch, getState) => {
        dispatch(updateSelectedRepository(repoId));

        const {
            apiToken: {
                token
            },
            repos: {
                selectedRepoId,
                data
            }
        } = getState();

        dispatch(fetchIssuesRequest());

        const selectedRepo = getSelectedRepoById(data, selectedRepoId);

        if (!selectedRepo) {
            // handle if we get here somehow - float to user as API error
            // log failure to find root cause
            dispatch(fetchIssuesFailure())
        }

        try {
            const response = await axios({
                method: 'get',
                url: `https://api.github.com/repos/${selectedRepo.owner.login}/${selectedRepo.name}/issues`,
                headers: {
                    'Authorization': `token ${token}`
                }
            });

            dispatch(fetchIssuesSuccess(response.data));
        } catch (error) {
            dispatch(fetchIssuesFailure());
        }        
    }
}