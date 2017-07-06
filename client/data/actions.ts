import axios from 'axios';
import * as action from './constants/ActionTypes';
import { store } from '../main';

const URL = 'http://localhost:3001/dessert';

const fetchData = () => {
  return () => {
    const request = axios.get(URL);
    request.then((data) => {
      store.dispatch(pushData(data.data));
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
