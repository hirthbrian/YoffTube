import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import * as Font from 'expo-font';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './src/reducers';

import RootStack from './src/Rooter';
import ErrorHandler from './src/components/ErrorHandler';

// eslint-disable-next-line no-undef
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk)));

const quicksand = require('./assets/fonts/Quicksand-Regular.ttf');
const quicksandBold = require('./assets/fonts/Quicksand-Bold.ttf');

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      quicksand,
      'quicksand-bold': quicksandBold,
    }).then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) return null;

  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <RootStack />
      <ErrorHandler />
    </Provider>
  );
};

export default App;
