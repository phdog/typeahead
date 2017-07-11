import * as SI from 'seamless-immutable';
import { Immutable } from 'seamless-immutable';
import { Data } from './model';
import {
  PUSH_DATA,
  EDIT_DATA
} from './constants/ActionTypes';

const INITIAL_STATE: Immutable<{}> = SI.from({ keys: [], values: {}});

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case PUSH_DATA:
      const { keys, values } = action.payload;
      return SI.from(INITIAL_STATE).merge({keys, values}, {deep: true})
    case EDIT_DATA:
      const { id, field, value } = action.payload;
      return SI.from(state).setIn(['values', id, field], value)
  }
  return state;
}
