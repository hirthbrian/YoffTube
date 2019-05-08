import {
  AsyncStorage,
} from 'react-native';
import {
  FileSystem,
} from 'expo';

import {
  GET_OFFLINE_VIDEOS,
  GET_OFFLINE_VIDEOS_SUCCESS,
  DOWNLOAD_VIDEO,
  DOWNLOAD_VIDEO_SUCCESS,
  SET_DOWNLOAD_PROGRESS,
  DELETE_VIDEO,
  DELETE_VIDEO_SUCCESS,
  DELETE_VIDEO_FAIL,
  GET_DOWNLOAD_URL,
  GET_DOWNLOAD_URL_SUCCESS,
  GET_DOWNLOAD_URL_FAIL,
  GET_OFFLINE_VIDEOS_FAIL,
} from './types';

import {
  showDownloadSelector
} from './SettingsActions'

const API_URL = 'https://us-central1-yofftube.cloudfunctions.net';

export const getOfflineVideos = () => {
  return dispatch => {
    dispatch({ type: GET_OFFLINE_VIDEOS })
    try {
      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
          let offlineVideos = {};
          stores.map(item => {
            const offlineVideo = JSON.parse(item[1]);
            offlineVideos[offlineVideo.id] = offlineVideo;
          });
          dispatch({ type: GET_OFFLINE_VIDEOS_SUCCESS, payload: offlineVideos })
        });
      });
    } catch (error) {
      dispatch({ type: GET_OFFLINE_VIDEOS_FAIL })
    }
  }
}

export const deleteVideo = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: DELETE_VIDEO });
    const videoInfo = getState().download.items[id];
    FileSystem.deleteAsync(videoInfo.uri)
      .then(() => {
        AsyncStorage.removeItem(`@YoffTube:${id}`)
          .then(() => {
            dispatch({ type: DELETE_VIDEO_SUCCESS });
            dispatch(getOfflineVideos())
          })
      })
      .catch(error => {
        dispatch({ type: DELETE_VIDEO_FAIL });
      })
  }
}

export const getDownloadUrl = (id) => {
  return (dispatch) => {
    dispatch({ type: GET_DOWNLOAD_URL, payload: { id } });
    fetch(`${API_URL}/getDownloadUrls?url=${id}`)
      .then((response) => response.json())
      .then((responseJson) => {

        const choice = responseJson.map(item => {
          return {
            id,
            url: item.url,
            title: `${item.resolution} (${item.size})`,
          }
        })
        dispatch(showDownloadSelector(choice))
        dispatch({ type: GET_DOWNLOAD_URL_SUCCESS, payload: { id } });
      })
      .catch((error) => {
        dispatch({ type: GET_DOWNLOAD_URL_FAIL, payload: { id } });
      });
  }
}

export const downloadVideo = (url, id) => (dispatch, getState) => {
  let videoInfo = getState().videos.items[id];
  let progressIteration = 1;
  dispatch({ type: DOWNLOAD_VIDEO, payload: { id } });

  const downloadResumable = FileSystem.createDownloadResumable(
    url,
    FileSystem.documentDirectory + `${id}.mp4`,
    {},
    ({ totalBytesWritten, totalBytesExpectedToWrite }) => {
      const progress = totalBytesWritten / totalBytesExpectedToWrite;
      if (parseInt(progress * 100) === progressIteration) {
        progressIteration += 1;
        dispatch({ type: SET_DOWNLOAD_PROGRESS, payload: { id, progress } });
      }
    }
  );

  downloadResumable.downloadAsync()
    .then((data) => {
      delete videoInfo.progress
      AsyncStorage.setItem(`@YoffTube:${id}`, JSON.stringify({ ...videoInfo, uri: data.uri }))
        .then(() => {
          dispatch({ type: DOWNLOAD_VIDEO_SUCCESS, payload: { ...videoInfo, uri: data.uri } });
        })
    })
}
