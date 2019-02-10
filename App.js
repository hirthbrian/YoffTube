import React, { Component } from 'react';
import {
  StatusBar
} from 'react-native';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import reducers from './src/reducers'

import RootStack from './src/Rooter';

const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(ReduxThunk),
);

const store = createStore(reducers, {}, enhancer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StatusBar barStyle='light-content' />
        <RootStack />
      </Provider>
    );
  }
}

