import {
  AsyncStorage,
  Alert,
} from 'react-native';
import {
  FileSystem,
} from 'expo';

import {
  GET_OFFLINE_VIDEOS,
  GET_OFFLINE_VIDEOS_SUCCESS,
  GET_OFFLINE_VIDEOS_FAIL,
  SEARCH_VIDEOS,
  SEARCH_VIDEOS_SUCCESS,
  SEARCH_VIDEOS_FAIL,
  DOWNLOAD_VIDEO,
  DOWNLOAD_VIDEO_SUCCESS,
  DOWNLOAD_VIDEO_FAIL,
  DOWNLOAD_PROGRESS,
  DELETE_VIDEO,
  DELETE_VIDEO_SUCCESS,
  DELETE_VIDEO_FAIL,
} from './types';

const API_KEY = 'AIzaSyAz_eGSnHruXC-zxNJYzGsxw2AtbnLMJb8';
const API_URL = 'https://www.googleapis.com/youtube/v3/search';
const DL_URL = 'https://us-central1-yofftube.cloudfunctions.net/getYouTubeUrl?url=';

export const getOfflineVideos = () => {
  return dispatch => {
    dispatch({ type: GET_OFFLINE_VIDEOS })
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        let videosInfo = {};
        stores.map(result => {
          const videoInfo = JSON.parse(result[1]);
          videosInfo[videoInfo.id] = videoInfo;
        });
        dispatch({ type: GET_OFFLINE_VIDEOS_SUCCESS, payload: videosInfo })
      });
    });
  }
}

export const searchVideos = (query) => {
  return dispatch => {
    dispatch({ type: SEARCH_VIDEOS })
    const encodedURI = encodeURIComponent(query);
    fetch(`${API_URL}?part=snippet&q=${encodedURI}&type=video&key=${API_KEY}`)
      .then((response) => response.json())
      .then(data => {
        let videosInfo = {};
        data.items.map(item => {
          videosInfo[item.id.videoId] = {
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
            date: item.snippet.publishedAt
          }
        })
        dispatch({ type: SEARCH_VIDEOS_SUCCESS, payload: videosInfo });
      })
      .catch(e => {
        console.log(e);
        dispatch({ type: SEARCH_VIDEOS_FAIL })
      })
  }
}

export const deleteVideo = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: DELETE_VIDEO });
    let videoInfo = getState().videos.offlineVideos[id];
    FileSystem.deleteAsync(videoInfo.uri)
      .then(() => {
        AsyncStorage.removeItem(`@YoffTube:${id}`)
          .then(() => {
            dispatch({ type: DELETE_VIDEO_SUCCESS, payload: { id } });
          })
      })
      .catch(e => {
        console.log(e)
        dispatch({ type: DELETE_VIDEO_FAIL });
      })
  }
}

export const getHomepageVideos = () => {
  return (dispatch, getState) => {
    // dispatch({ type: DELETE_VIDEO });
    fetch(`${API_URL}?part=snippet&home=true&key=${API_KEY}`)
      .then((response) => response.json())
      .then(data => {
        let videosInfo = {};
        data.items.map(item => {
          videosInfo[item.id.videoId] = {
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
            date: item.snippet.publishedAt
          }
        })
        dispatch({ type: SEARCH_VIDEOS_SUCCESS, payload: videosInfo });
      })
  }
}

export const downloadVideo = (id) => {
  return (dispatch, getState) => {
    let videoInfo = getState().videos.searchedVideos[id];
    let progressIteration = 5;
    dispatch({ type: DOWNLOAD_VIDEO });
    fetch(DL_URL + id)
      .then((response) => response.json())
      .then((responseJson) => {
        // const videoArray = responseJson.filter(item => item['type'].split(';')[0] === 'video/mp4');

        // if (videoArray[0]) {
          const videoUrl = responseJson.url;
          const downloadResumable = FileSystem.createDownloadResumable(
            videoUrl,
            FileSystem.documentDirectory + `${id}.mp4`,
            {},
            ({ totalBytesWritten, totalBytesExpectedToWrite }) => {
              const progress = totalBytesWritten / totalBytesExpectedToWrite;
              if (parseInt(progress * 100) === progressIteration) {
                progressIteration += 5;
                dispatch({ type: DOWNLOAD_PROGRESS, payload: { id, progress } });
              }
            }
          );

          downloadResumable.downloadAsync()
            .then((data) => {
              AsyncStorage.setItem(`@YoffTube:${id}`, JSON.stringify({...videoInfo, uri: data.uri}))
                .then(() => {
                  dispatch({ type: DOWNLOAD_VIDEO_SUCCESS, payload: {id, uri: data.uri} });
                })
            })
        // }
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: DOWNLOAD_VIDEO_FAIL });
        Alert.alert(
          'Error',
          'The video you are trying to download is not available',
        )
      });
  }
}