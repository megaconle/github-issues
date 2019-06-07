import axios from 'axios';
import {
    FETCH_REPOS_SUCCESS,
    FETCH_REPOS_FAILURE,
    FETCH_REPOS_REQUEST,
    UPDATE_API_TOKEN,
    FETCH_ISSUES_SUCCESS,
    FETCH_ISSUES_FAILURE,
    FETCH_ISSUES_REQUEST,
    UPDATE_SELECTED_REPO,
    UPDATE_SORT_ORDER
} from './constants';
import {
    getSelectedRepoById
} from './selectors';

// State updating actions
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

export function fetchIssuesSuccess({issues, selectedRepoId, sort}) {
    return {
        type: FETCH_ISSUES_SUCCESS,
        issues,
        selectedRepoId,
        sort
    }
}

export function fetchIssuesFailure() {
    return {
        type: FETCH_ISSUES_FAILURE
    }
}

export function updateSortOrder({selectedRepoId, sortString}) {
    return {
        type: UPDATE_SORT_ORDER,
        selectedRepoId,
        sort: sortString
    }
}


// API calls

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

export function fetchIssues(sortString = 'created,desc') {
    return async (dispatch, getState) => {
        const {
            apiToken: {
                token
            },
            repos: {
                selectedRepoId
            }
        } = getState();

        dispatch(fetchIssuesRequest());

        const selectedRepo = getSelectedRepoById(getState(), selectedRepoId);

        if (!selectedRepo) {
            // handle if we get here somehow - float to user as API error
            // log failure to find root cause
            dispatch(fetchIssuesFailure())
        }

        const [sort, direction] = sortString.split(',');

        try {
            const response = await axios({
                method: 'get',
                url: `https://api.github.com/repos/${selectedRepo.owner.login}/${selectedRepo.name}/issues`,
                headers: {
                    'Authorization': `token ${token}`
                },
                params: {
                    sort,
                    direction
                }
            });

            dispatch(fetchIssuesSuccess({issues: response.data, selectedRepoId, sort: sortString}));
        } catch (error) {
            dispatch(fetchIssuesFailure());
        }        
    }
}

export function selectRepository(repoId) {
    return async (dispatch, getState) => {
        dispatch(updateSelectedRepository(repoId));

        const {
            repos: {
                selectedRepoId
            },
            issues: {
                data
            }
        } = getState();

        // if we already have fetched issues for this repo, don't fetch again
        if (!(data[selectedRepoId] && data[selectedRepoId].isDataLoaded)) {
            dispatch(fetchIssues());
        }
    }
}

export function sortIssues({sortString}) {
    return async (dispatch, getState) => {
        const {
            repos: {
                selectedRepoId
            }
        } = getState();

        dispatch(updateSortOrder({selectedRepoId, sortString}));

        const {issues} = getState();

        dispatch(fetchIssues(issues.data[selectedRepoId].sort));
    }
}
