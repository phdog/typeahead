import * as action from './constants/ActionTypes';

const reqSend = () => ({ type: action.REQ_SEND });
const resRecieved = () => ({ type: action.RES_RECIEVED });
const flushEdit = () => ({ type: action.FLUSH_EDIT });

const triggerEdit = (field) => ({
  type: action.TRIGGER_EDIT,
  payload: field
})

export {
  reqSend,
  resRecieved,
  triggerEdit,
  flushEdit
}
