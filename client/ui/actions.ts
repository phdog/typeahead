import * as action from './constants/ActionTypes';

const reqSend = () => ({ type: action.REQ_SEND });
const resRecieved = () => ({ type: action.RES_RECIEVED });
const flushEdit = () => ({ type: action.FLUSH_EDIT });

const triggerEdit = (field) => ({
  type: action.TRIGGER_EDIT,
  payload: field
})

const startAdd = (id) => ({
  type: action.START_ADD,
  payload: id
})

const stopAdd = () => ({ type: action.STOP_ADD})

export {
  reqSend,
  resRecieved,
  triggerEdit,
  flushEdit,
  startAdd,
  stopAdd
}
