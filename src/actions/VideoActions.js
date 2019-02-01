import { AsyncStorage } from 'react-native';
import {
  GET_OFFLINE_VIDEOS,
  GET_OFFLINE_VIDEOS_SUCCESS,
  GET_OFFLINE_VIDEOS_FAIL,
} from './types';

export const getOfflineVideos = () => {
  return dispatch => {
    dispatch({ type: GET_OFFLINE_VIDEOS })

    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        const videos = stores.map((result) => { return JSON.parse(result[1]) });
        dispatch({ type: GET_OFFLINE_VIDEOS_SUCCESS, payload: videos })
      });
    });

    // AsyncStorage.getAllKeys()
    //   .then(keys => {
    //     let storedVideos = [];
    //     keys.map(async key => {
    //       const video = await AsyncStorage.getItem(key)
    //       storedVideos.push(JSON.parse(video));
    //       console.log(JSON.parse(video))
    //       return (JSON.parse(video));
    //     })
    //   })
  }
}