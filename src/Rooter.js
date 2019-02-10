import React from 'react';
import { Image } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';

import Colors from './Colors';
import Main from './Main';
import Downloaded from './Downloaded';

const renderTabBarIcon = (tintColor, navigation) => {
  const { routeName } = navigation.state;
  let imageSource;

  switch (routeName) {
    case 'Home':
      imageSource = require('../assets/home.png');
      break;
    case 'Downloaded':
      imageSource = require('../assets/downloaded.png');
      break
  }

  return (
    <Image
      source={imageSource}
      style={{
        width: 25,
        height: 25,
        tintColor: tintColor
      }}
    />
  );
}

const bottomTabNavigator = createBottomTabNavigator({
  Home: {
    screen: Main,
  },
  // Search: {
  //   screen: Downloaded,
  //   navigationOptions: {
  //     tabBarIcon: tabBarSearchIcon
  //   }
  // },
  Downloaded: {
    screen: Downloaded,
  },
}, {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => renderTabBarIcon(tintColor, navigation)
    }),
    tabBarOptions: {
      activeTintColor: Colors.blue,
      // tabStyle: {
      //   backgroundColor: Colors.blue
      // }
    },
    lazy: false,
  }
)

const RootStack = createStackNavigator({
  Main: {
    screen: bottomTabNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'YoffTube',
      headerTintColor: Colors.white,
      headerStyle: {
        backgroundColor: Colors.blue
      },
    }),
  }
})

export default createAppContainer(RootStack);