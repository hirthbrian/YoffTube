import React, { Component } from 'react';

import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'remote-redux-devtools';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import reducers from './src/reducers'

import RootStack from './src/Rooter';

const store = createStore(reducers, {}, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(ReduxThunk)));

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}

