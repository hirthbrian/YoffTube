import React from 'react';
import {
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Colors from './Colors';
import Home from './screens/Home';
import Downloaded from './screens/Downloaded';
import Channel from './screens/Channel';

const RootStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: 'YoffTube',
      headerTintColor: Colors.white,
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: Colors.red,
        borderBottomWidth: 0,
        elevation: 0,
      },
      headerTitleStyle: {
        fontFamily: 'quicksand-bold'
      },
      headerRightContainerStyle: {
        paddingRight: 10,
      },
      headerRight: (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Downloaded')}
        >
          <Image
            source={require('../assets/downloaded.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: '#FFFFFF',
            }}
          />
        </TouchableWithoutFeedback>
      )
    }),
  },
  Downloaded: {
    screen: Downloaded,
    navigationOptions: ({ navigation }) => ({
      title: 'Downloaded',
      headerTintColor: Colors.white,
      headerStyle: {
        backgroundColor: Colors.red
      },
      headerTitleStyle: {
        fontFamily: 'quicksand-bold'
      },
      headerBackTitle: null,
      headerRightContainerStyle: {
        paddingRight: 10,
      },
      headerRight: (
        <TouchableWithoutFeedback
          onPress={navigation.getParam('headerRightButton')}
        >
          <Image
            source={require('../assets/garbage.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: '#FFFFFF',
            }}
          />
        </TouchableWithoutFeedback>
      )
    })
  },
  Channel: {
    screen: Channel,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('title'),
      headerTintColor: Colors.white,
      headerStyle: {
        backgroundColor: Colors.red
      },
      headerTitleStyle: {
        fontFamily: 'quicksand-bold'
      },
    })
  },
})

export default createAppContainer(RootStack);