import { createStore, applyMiddleware, compose } from 'redux'

import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'

import rootReducer from './root-reducer'

const initialState = {}

const middleware = [thunk]

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const enhancer = composeEnhancers(applyMiddleware(...middleware))
export const store = createStore(rootReducer, initialState, enhancer)
export const persistor = persistStore(store)
