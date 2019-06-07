import {
    FETCH_ISSUES_SUCCESS,
    FETCH_ISSUES_FAILURE,
    FETCH_ISSUES_REQUEST,
    UPDATE_SORT_ORDER
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
        case UPDATE_SORT_ORDER:
            return updateSortOrder(state, action);
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

function didFetchIssues(state, {issues, selectedRepoId, sort}) {
    return {
        ...state,
        isLoading: false,
        isError: false,
        data: {
            ...state.data,
            [selectedRepoId]: {
                issues,
                isDataLoaded: true,
                sort
            }
        }
    }
}

function errorFetchingIssues(state) {
    return {
        ...state,
        isError: true,
        isLoading: false
    }
}

function updateSortOrder(state, {selectedRepoId, sort}) {
    return {
        ...state,
        data: {
            ...state.data,
            [selectedRepoId]: {
                ...state.data[selectedRepoId],
                sort
            }
        }
    }
}
