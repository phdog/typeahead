import axios from 'axios';
import * as action from './constants/ActionTypes';
import { resSend, reqRecieved } from '../ui/actions';
import { store } from '../main';

const URL = 'http://localhost:3001/';

const fetchData = () => {
  return () => {
    const request = axios.get(`${URL}dessert`);
    store.dispatch(resSend());
    request.then((data) => {
      store.dispatch(reqRecieved());
      store.dispatch(pushData(data.data));
    }).catch(e => {
      console.log(e)
    })
  }
}

const pushData = (data) => ({
  type: action.PUSH_DATA,
  payload: data
})

export {
    fetchData
};
