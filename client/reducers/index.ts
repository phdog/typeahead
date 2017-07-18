//import { combineReducers } from 'redux';
import { combineReducers, routerReducer } from 'redux-seamless-immutable'

import search from './search';
import data from './data';
import ui from './ui';

const rootReducer = combineReducers({
  routing: routerReducer,
  search,
  data,
  ui
});

export default rootReducer;
