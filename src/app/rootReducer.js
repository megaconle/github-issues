import { combineReducers } from 'redux';
import { repos, apiToken } from '../modules';

export default combineReducers({
    repos,
    apiToken
});