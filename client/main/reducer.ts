import { combineReducers } from 'redux';

import search from '../search';
import data from '../data';
import ui from '../ui';

const rootReducer = combineReducers({
  search,
  data,
  ui
});

export default rootReducer;
