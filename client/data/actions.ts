import axios from 'axios';
import { map } from 'lodash';
import { browserHistory } from 'react-router';
import * as action from './constants/ActionTypes';
import { reqSend, resRecieved } from '../ui/actions';
import { pickSearch, flushSearch } from '../search/actions';
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
    dispatch(reqSend());
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
        dispatch(resRecieved());
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

// Обновить данные на сервере
const putData = (id: string) => {
  return (dispatch) => {
    const storeOnSave = store.getState();
    const data = storeOnSave.data.values[id];
    const request = axios.put(`${config.URL}dessert/${id}`, data, options);
    dispatch(reqSend());
    request.then(response => {
      try {
        console.log(response.data)
      } catch (e) {
        throw e
      } finally {
        dispatch(resRecieved());
      }
    }).catch(e => {
      console.log(e)
    })
  }
}

const deleteData = (id: string) => {
  return (dispatch) => {
    const request = axios.delete(`${config.URL}dessert/${id}`, options)
    dispatch(reqSend());
    request.then(response => {
      try {
        dispatch(flushSearch())
        browserHistory.push('/');
        const storeOnChange = store.getState();
        console.log('before', storeOnChange)
        //delete storeOnChange.data.values[id];
        let index = storeOnChange.data.keys.indexOf(id);
        console.log(index)
        storeOnChange.data.keys.splice(index, 1)
        console.log('after', storeOnChange)
        //dispatch(pushData(storeOnChange));
      } catch (e) {
        throw e
      } finally {
        dispatch(resRecieved());
      }
    }).catch(e => {
      console.log(e.message)
    })
  }
}

export {
    fetchData, editData, putData, deleteData
};
