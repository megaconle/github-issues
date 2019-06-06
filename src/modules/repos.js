import {
    FETCH_REPOS_SUCCESS,
    FETCH_REPOS_FAILURE,
    FETCH_REPOS_REQUEST
} from './constants';

const defaultState = {
    isLoading: false,
    isError: false,
    isDataLoaded: false,
    data: []
};

export default function repos(state = defaultState, action) {
    switch (action.type) {
        case FETCH_REPOS_REQUEST:
            return willFetchRepos(state);
        case FETCH_REPOS_SUCCESS:
            return didFetchRepos(state, action);
        case FETCH_REPOS_FAILURE:
            return errorFetchingRepos(state);
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

function didFetchRepos(state, {data}) {
    return {
        ...state,
        isLoading: false,
        isError: false,
        isDataLoaded: true,
        data
    }
}

function errorFetchingRepos(state) {
    return {
        ...state,
        isError: true,
        isLoading: false
    }
}
