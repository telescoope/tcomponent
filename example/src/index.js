import React from 'react'

import ReactDOM from 'react-dom'

import App from './App'

import './index.css'

import { coreReducer, authReducer } from 'tcomponent'

import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'

import { persistStore, persistReducer } from 'redux-persist'

import { createStore, applyMiddleware, compose, combineReducers } from 'redux'

import storage from 'localforage'

import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

import thunk from 'redux-thunk'

import { createLogger } from 'redux-logger'

const log = createLogger({
  diff: false,
  collapsed: true
})

const persistConfig = {
  key: 'tcomponent',
  storage,
  stateReconciler: hardSet
}

const rootReducer = combineReducers({
  core: coreReducer,
  auth: authReducer
})

let middleware = [thunk]

if (process.env.REACT_APP_ENVIRONMENT !== 'production') {
  middleware = [thunk, log]
}

const enhancers = []

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
  persistedReducer,
  undefined,
  compose(applyMiddleware(...middleware), ...enhancers)
)

const persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
