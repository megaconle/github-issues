import {
    UPDATE_API_TOKEN
} from './constants';

const defaultState = {
    token: ''
};

export default function apiToken(state = defaultState, action) {
    switch (action.type) {
        case UPDATE_API_TOKEN:
            return updateAPIToken(state, action);
        default:
            return state;
    }
}

function updateAPIToken(state, {apiToken}) {
    return {
        ...state,
        token: apiToken
    };
}
