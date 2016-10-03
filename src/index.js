import 'normalize.css'
import 'suitcss-base/lib/base.css'
import './index.css'

import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import App from './components/app'
import getInitialState from './utils/getInitialState'
import logger from 'redux-logger'
import React from 'react'
import ReactDOM from 'react-dom'
import reducer from './state'

const store = createStore(
  reducer,
  getInitialState(),
  (process.env.NODE_ENV !== 'production' && applyMiddleware(logger())) || undefined
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
