import { createStore, combineReducers, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import * as reducers from './reducers';

const composeEnhancers = composeWithDevTools({
    trace: true,
    serialize: true
});

const middlewares = [thunk, createLogger];

export const store = (iniStore = {}): Store =>
    createStore(
        combineReducers(reducers as any),
        iniStore,
        composeEnhancers(applyMiddleware(...middlewares))
    );

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;