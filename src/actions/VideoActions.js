import {
  AsyncStorage,
  Alert,
} from 'react-native';
import {
  FileSystem,
} from 'expo';

import {
  getSearchUrl,
  getVideosUrl,
  getChannelUrl,
  mapVideoFromApi,
} from '../utils';

import {
  GET_OFFLINE_VIDEOS,
  GET_OFFLINE_VIDEOS_SUCCESS,
  GET_OFFLINE_VIDEOS_FAIL,
  SEARCH_VIDEOS,
  SEARCH_VIDEOS_SUCCESS,
  SEARCH_VIDEOS_FAIL,
  GET_CHANNEL_VIDEOS,
  GET_CHANNEL_VIDEOS_SUCCESS,
  GET_CHANNEL_VIDEOS_FAIL,
  DOWNLOAD_VIDEO,
  DOWNLOAD_VIDEO_SUCCESS,
  DOWNLOAD_VIDEO_FAIL,
  SET_DOWNLOAD_PROGRESS,
  DELETE_VIDEO,
  DELETE_VIDEO_SUCCESS,
  DELETE_VIDEO_FAIL,
  DOWNLOAD_QUALITY,
  DOWNLOAD_QUALITY_SUCCESS,
  DOWNLOAD_QUALITY_FAIL,
  TEST_TEST,
} from './types';

import {
  showQualitySelector
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
      console.log('getOfflineVideos error:', error)
    }
  }
}

export const searchVideos = (query, pageToken = null) => dispatch => {
  // return dispatch => {
  dispatch({ type: SEARCH_VIDEOS })

  fetch(`${API_URL}/search?query=${query}`)
    .then(response => response.json())
    .then(data => {
      dispatch({ type: SEARCH_VIDEOS_SUCCESS, payload: data });
    })

  // fetch(getSearchUrl(query))
  //   .then((response) => response.json())
  //   .then(data => {
  //     if (data.error) {
  //       return dispatch({ type: SEARCH_VIDEOS_FAIL, payload: data.error.message });
  //     }

  //     const videoIds = data.items.map(item => item.id.videoId)

  //     fetch(getVideosUrl(videoIds))
  //       .then((response) => response.json())
  //       .then(data => {
  //         let videosInfo = {};
  //         data.items
  //           .map(item => {
  //             videosInfo[item.id] = mapVideoFromApi(item)
  //           })
  //         dispatch({ type: SEARCH_VIDEOS_SUCCESS, payload: videosInfo });
  //       })
  //       .catch(error => {
  //         console.log(error);
  //         dispatch({ type: SEARCH_VIDEOS_FAIL })
  //       })


  //   })
  //   .catch(error => {
  //     console.log(error);
  //     dispatch({ type: SEARCH_VIDEOS_FAIL })
  //   })
  // }
}

export const deleteVideo = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: DELETE_VIDEO });
    const videoInfo = getState().videos.downloaded[id];
    FileSystem.deleteAsync(videoInfo.uri)
      .then(() => {
        AsyncStorage.removeItem(`@YoffTube:${id}`)
          .then(() => {
            dispatch({ type: DELETE_VIDEO_SUCCESS });
            dispatch(getOfflineVideos())
          })
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: DELETE_VIDEO_FAIL });
      })
  }
}

export const getChannelVideos = (id) => {
  return (dispatch) => {
    dispatch({ type: GET_CHANNEL_VIDEOS });
    fetch(`${API_URL}search?part=snippet&channelId=${id}&order=date&type=video&key=${API_KEY}`)
      .then((response) => response.json())
      .then(data => {
        if (data.error) {
          dispatch({ type: GET_CHANNEL_VIDEOS_FAIL, payload: data.error.message });
          return
        }
        const videosInfo = data.items.map(item => {
          return {
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
            date: item.snippet.publishedAt
          }
        })
        dispatch({ type: GET_CHANNEL_VIDEOS_SUCCESS, payload: videosInfo });
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: GET_CHANNEL_VIDEOS_FAIL, payload: error });
      })
  }
}

export const selectDownloadQuality = (id) => {
  return (dispatch) => {
    dispatch({ type: DOWNLOAD_QUALITY, payload: { id } });
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
        dispatch(showQualitySelector(choice))
        dispatch({ type: DOWNLOAD_QUALITY_SUCCESS, payload: { id } });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: DOWNLOAD_QUALITY_FAIL, payload: { id } });
      });
  }
}

export const downloadVideo = (url, id) => (dispatch, getState) => {
  let videoInfo = getState().videos.videos[id];
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
          dispatch({ type: DOWNLOAD_VIDEO_SUCCESS, payload: { id, uri: data.uri } });
        })
    })
}

export const searchChannel = (query) => dispatch => {
  fetch(getChannelUrl(query))
    .then((response) => response.json())
    .then((responseJson) => {
      const channels = responseJson.items.map(item => {
        console.log('item', item)
        return {
          id: item.id.channelId,
          name: item.snippet.title,
          thumbnail: item.snippet.thumbnails.default.url
        }
      })

      console.log('channels', channels)
      dispatch({ type: TEST_TEST, payload: channels });

    })
    .catch((error) => {
      console.log(error);
    });
}