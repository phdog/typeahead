import { UI } from './model';
import {
  REQ_SEND,
  RES_RECIEVED,
  TRIGGER_EDIT,
  FLUSH_EDIT
} from './constants/ActionTypes';


const INITIAL_STATE = { loading: false, field: '' }

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
      case REQ_SEND:
        return { ...state, loading: true }
      case RES_RECIEVED:
        return { ...state, loading: false }
      case TRIGGER_EDIT:
        return { ...state, field: action.payload }
    }
  return state;
}
