import {createStore, combineReducers, applyMiddleware, Store} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';

import * as reducers from './reducers';

const composeEnhancers = composeWithDevTools({
  trace: true,
  serialize: true
});
const store: Store = createStore(
  combineReducers(reducers),
  composeEnhancers(applyMiddleware(thunk, createLogger))
);

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
export default store;
