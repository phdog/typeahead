import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import ReduxThunk from 'redux-thunk';
import { stateTransformer } from 'redux-seamless-immutable';
import { createLogger } from 'redux-logger';

import App from './components/App';
import rootReducer from './reducers';

const loggerMiddleware = createLogger({
  stateTransformer,
  collapsed: (getState, action, logEntry) => !logEntry.error
});


export const store: Store<any> = compose(applyMiddleware(ReduxThunk, loggerMiddleware))(createStore)(rootReducer);

const history = syncHistoryWithStore(browserHistory, store)

import routes from './routes';
const myRoutes = routes();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} key={Math.random()}>
      {myRoutes}
    </Router>
  </Provider>,
  document.getElementById('app')
);
