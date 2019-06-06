import { combineReducers } from 'redux';
import repos from './repos';
import apiToken from './apiToken';

export default combineReducers({
    repos,
    apiToken
});