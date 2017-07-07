import * as action from './constants/ActionTypes';

const resSend = () => ({ type: action.REQ_SEND });
const reqRecieved = () => ({ type: action.RES_RECIEVED });

export {
  resSend,
  reqRecieved
}
