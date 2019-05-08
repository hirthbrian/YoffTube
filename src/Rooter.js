import React from 'react';
import {
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

import Colors from './Colors';
import Main from './views/Main';
import Downloaded from './views/Downloaded';
import Channel from './views/Channel';

const RootStack = createStackNavigator({
  Main: {
    screen: Main,
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