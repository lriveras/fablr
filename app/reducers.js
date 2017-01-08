import homeReducer from './features/home/home-reducer.js';
import appBarReducer from './features/fablr-app-bar/fablr-app-bar-reducer.js';
import postDialogReducer from './features/post-dialog/post-dialog-reducer.js';
import { combineReducers } from 'redux';

const reducers = combineReducers({appBarReducer,postDialogReducer});

export default reducers;