import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Font } from 'expo';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import reducers from './src/reducers'

import RootStack from './src/Rooter';
import ErrorHandler from './src/ErrorHandler';

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
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false
    }
  }

  componentWillMount() {
    Font.loadAsync({
      'quicksand': require('./assets/fonts/Quicksand-Regular.ttf'),
      'quicksand-bold': require('./assets/fonts/Quicksand-Bold.ttf'),
    }).then(() => {
      this.setState({ fontLoaded: true })
    });
  }

  render() {
    const { fontLoaded } = this.state;
    if (!fontLoaded) return null;

    return (
      <Provider store={store}>
        <StatusBar barStyle='light-content' />
        <RootStack />
        <ErrorHandler />
      </Provider>
    );
  }
}

