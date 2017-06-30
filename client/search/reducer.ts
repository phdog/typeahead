import { Search } from './model';
import {
  START_SEARCH,
  TRIGGER_SEARCH,
  PICK_SEARCH,
  FLUSH_SEARCH,
  SEARCH_UP,
  SEARCH_DOWN
} from './constants/ActionTypes';

const INITIAL_STATE: Search = <Search>{
  mode: false,
  text: '',
  item: 0,
  value: ''
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case START_SEARCH:
      return { ...state, mode: true };
    case TRIGGER_SEARCH:
      return { ...state, text: action.payload, mode: true };
    case PICK_SEARCH:
      return { ...state, value: action.payload };
    case FLUSH_SEARCH:
      return { ...state, text: '', item: 0, mode: false };
    case SEARCH_UP:
      return { ...state, item: state.item + 1, mode: true };
    case SEARCH_DOWN:
      return { ...state, item: state.item - 1 };
  }
  return state;
}
