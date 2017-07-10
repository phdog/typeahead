import * as action from './constants/ActionTypes';

const resSend = () => ({ type: action.REQ_SEND });
const reqRecieved = () => ({ type: action.RES_RECIEVED });

const triggerEdit = (field) => ({
  type: action.TRIGGER_EDIT,
  payload: field
})

export {
  resSend,
  reqRecieved,
  triggerEdit
}
