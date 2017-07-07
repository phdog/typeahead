import axios from 'axios';
import * as action from './constants/ActionTypes';
import { resSend, reqRecieved } from '../ui/actions';
import config from './constants/config';

const options = {
  headers: { 'Content-Type': 'application/json' },
  timeout: config.TIMEOUT
};

const fetchData = () => {
  return (dispatch) => {
    const request = axios.get(`${config.URL}dessert`, options);
    dispatch(resSend());
    request.then((response) => {
      try {
        dispatch(pushData(response.data));
      } catch (e) {
        throw e
      } finally {
        dispatch(reqRecieved());
      }
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
