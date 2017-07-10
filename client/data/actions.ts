import axios from 'axios';
import { map } from 'lodash';
import * as action from './constants/ActionTypes';
import { resSend, reqRecieved } from '../ui/actions';
import config from './constants/config';

const options = {
  headers: { 'Content-Type': 'application/json' },
  timeout: config.TIMEOUT
};

interface IDataObj {
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
        // Нормализовать данные. Массив из ID и объекты с ключами ID
        let keys = map(response.data, 'id');
        let values = {};
        map(response.data, (obj: IDataObj) => {
          Object.defineProperty(values, obj.id, {value: obj, enumerable: true});
        });
        //--------------
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

const editData = (data) => ({
  type: action.EDIT_DATA,
  payload: data
})

export {
    fetchData, editData
};
