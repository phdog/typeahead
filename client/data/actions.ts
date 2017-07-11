import axios from 'axios';
import { map } from 'lodash';
import * as action from './constants/ActionTypes';
import { resSend, reqRecieved } from '../ui/actions';
import { pickSearch } from '../search/actions';
import config from './constants/config';
import { store } from '../main';

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
        // Задвинуть данные в Стор
        dispatch(pushData({keys, values}));
        // актуализировать состояние по пути
        const storeOnLoad = store.getState();
        const [,idPath] = storeOnLoad.routing.locationBeforeTransitions.pathname.split('/')
        if (idPath) {
          store.dispatch(pickSearch(idPath))
        }
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
