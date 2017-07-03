import { createAction } from 'redux-actions';
import * as action from './constants/ActionTypes';

const flushSearch = createAction<void>(
    action.FLUSH_SEARCH,
    () => { }
);

export {
    flushSearch
};