import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import App from './main/components/App';
import rootReducer from './main/reducer';

const loggerMiddleware = createLogger({
  collapsed: (getState, action, logEntry) => !logEntry.error
});

export const store: Store<any> = compose(applyMiddleware(ReduxThunk, loggerMiddleware))(createStore)(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
