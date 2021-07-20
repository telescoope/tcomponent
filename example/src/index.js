import React from 'react'

import ReactDOM from 'react-dom'

import './index.css'

import App from './App'

import { store, persistor } from './redux'

import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={'Menunggu...'} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
