import {
    FETCH_ISSUES_SUCCESS,
    FETCH_ISSUES_FAILURE,
    FETCH_ISSUES_REQUEST
} from './constants';

const defaultState = {
    isLoading: false,
    isError: false,
    isDataLoaded: false,
    data: [],
    sortBy: 'created',
    sortDirection: 'desc'
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

function didFetchIssues(state, {data}) {
    console.log(data)
    return {
        ...state,
        isLoading: false,
        isError: false,
        isDataLoaded: true,
        data
    }
}

function errorFetchingIssues(state) {
    return {
        ...state,
        isError: true,
        isLoading: false
    }
}
