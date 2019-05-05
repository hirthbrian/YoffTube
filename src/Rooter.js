import React from 'react';
import {
  Image,
  Alert,
  AsyncStorage,
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

const clearAllVideo = () => {
  Alert.alert(
    'Clear everything',
    'Are you sure you want to remove all videos?',
    [
      { text: 'Cancel', onPress: () => { }, style: 'cancel' },
      {
        text: 'OK', onPress: () => {
          AsyncStorage.clear()
        }
      },
    ],
  );
}

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
      headerLeftContainerStyle: {
        paddingLeft: 10,
      },
      headerRightContainerStyle: {
        paddingRight: 10,
      },
      headerLeft: (
        <TouchableWithoutFeedback
          onPress={navigation.getParam('headerLeftPress')}
        >
          <Image
            source={require('../assets/user.png')}
            style={{
              width: 30,
              height: 30,
              tintColor: '#FFFFFF',
            }}
          />
        </TouchableWithoutFeedback>
      ),
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
    navigationOptions: () => ({
      title: 'Downloaded',
      headerTintColor: Colors.white,
      headerStyle: {
        backgroundColor: Colors.red
      },
      headerTitleStyle: {
        fontFamily: 'quicksand-bold'
      },
      headerRightContainerStyle: {
        paddingRight: 10,
      },
      headerRight: (
        <TouchableWithoutFeedback
          onPress={clearAllVideo}
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
      title: navigation.getParam('channelTitle'),
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