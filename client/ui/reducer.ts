import { UI } from './model';
import {
  REQ_SEND,
  RES_RECIEVED} from './constants/ActionTypes';

const INITIAL_STATE = { loading: false }

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
      case REQ_SEND:
        return { ...state, loading: true }
      case RES_RECIEVED:
        return { ...state, loading: false }
    }
  return state;
}
