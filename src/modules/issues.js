import {
    FETCH_ISSUES_SUCCESS,
    FETCH_ISSUES_FAILURE,
    FETCH_ISSUES_REQUEST
} from './constants';

const defaultState = {
    isLoading: false,
    isError: false,
    data: {}
};

export default function issues(state = defaultState, action) {
    switch (action.type) {
        case FETCH_ISSUES_REQUEST:
            return willFetchIssues(state);
        case FETCH_ISSUES_SUCCESS:
            return didFetchIssues(state, action);
        case FETCH_ISSUES_FAILURE:
            return errorFetchingIssues(state);
        default:
            return state;
    }
}

function willFetchIssues(state) {
    return {
        ...state,
        isLoading: true
    }
}

function didFetchIssues(state, {issues, selectedRepoId}) {
    console.log(issues)
    const ret = {
        ...state,
        isLoading: false,
        isError: false,
        data: {
            ...state.data,
            [selectedRepoId]: {
                issues,
                isDataLoaded: true,
                sortBy: 'created',
                sortDirection: 'desc'
            }
        }
    }
    console.log(ret);
    return ret;
}

function errorFetchingIssues(state) {
    return {
        ...state,
        isError: true,
        isLoading: false
    }
}
