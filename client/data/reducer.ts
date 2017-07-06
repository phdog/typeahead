//import { Search } from './model';
import {
  PUSH_DATA
} from './constants/ActionTypes';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case PUSH_DATA:
      return [ ...action.payload, ...state ];
  }
  return state;
}
