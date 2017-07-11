import * as action from './constants/ActionTypes';

const searchUp = () => ({ type: action.SEARCH_UP })

const searchDown = () => ({ type: action.SEARCH_DOWN })

const stopSearch = () => ({ type: action.STOP_SEARCH })

const flushSearch = () => ({ type: action.FLUSH_SEARCH })

const startSearch = () => ({ type: action.START_SEARCH })

const triggerSearch = (text) => ({
  type: action.TRIGGER_SEARCH,
  payload: text
})

const pickSearch = (key) => ({
  type: action.PICK_SEARCH,
  payload: key
})

export {
    stopSearch,
    flushSearch,
    triggerSearch,
    startSearch,
    pickSearch,
    searchUp,
    searchDown
};
