import { combineReducers } from 'redux';
import repos from './repos';
import apiToken from './apiToken';
import issues from './issues';

export default combineReducers({
    repos,
    apiToken,
    issues
});