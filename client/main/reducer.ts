import { combineReducers } from 'redux';

import search from '../search';
import data from '../data';

const rootReducer = combineReducers({
  search,
  data
});

export default rootReducer;
