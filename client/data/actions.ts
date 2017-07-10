import axios from 'axios';
import { map, transform, assign, reduce } from 'lodash';
import * as action from './constants/ActionTypes';
import { resSend, reqRecieved } from '../ui/actions';
import config from './constants/config';

const options = {
  headers: { 'Content-Type': 'application/json' },
  timeout: config.TIMEOUT
};

interface obj {
  id: string;
  name: string;
  recipe: string;
}

const fetchData = () => {
  return (dispatch) => {
    const request = axios.get(`${config.URL}dessert`, options);
    dispatch(resSend());
    request.then((response) => {
      try {
        // Normilize data
        let keys = map(response.data, 'id');
        let values = {};
        map(response.data, (obj: obj) => {
          Object.defineProperty(values, obj.id, {value: obj, enumerable: true});
        });
        dispatch(pushData({keys, values}));
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
