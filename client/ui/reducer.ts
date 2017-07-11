import { UI } from './model';
import {
  REQ_SEND,
  RES_RECIEVED,
  TRIGGER_EDIT,
  FLUSH_EDIT,
  START_ADD,
  STOP_ADD
} from './constants/ActionTypes';


const INITIAL_STATE: UI = <UI>{ loading: false, field: '', add: false }

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
      case REQ_SEND:
        return { ...state, loading: true }
      case RES_RECIEVED:
        return { ...state, loading: false }
      case TRIGGER_EDIT:
        return { ...state, field: action.payload }
      case FLUSH_EDIT:
        return { ...state, field: '' }
      case START_ADD:
        return { ...state, add: true }
      case STOP_ADD:
        return { ...state, add: false }
    }
  return state;
}
