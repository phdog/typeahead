import * as action from './constants/ActionTypes';

const resSend = () => ({ type: action.REQ_SEND });
const reqRecieved = () => ({ type: action.RES_RECIEVED });
const flushEdit = () => ({ type: action.FLUSH_EDIT });

const triggerEdit = (field) => ({
  type: action.TRIGGER_EDIT,
  payload: field
})

export {
  resSend,
  reqRecieved,
  triggerEdit,
  flushEdit
}
