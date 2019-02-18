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
  GET_CHANNEL_VIDEOS,
  GET_CHANNEL_VIDEOS_SUCCESS,
  GET_CHANNEL_VIDEOS_FAIL,
  DOWNLOAD_VIDEO,
  DOWNLOAD_VIDEO_SUCCESS,
  DOWNLOAD_VIDEO_FAIL,
  DOWNLOAD_PROGRESS,
  DELETE_VIDEO,
  DELETE_VIDEO_SUCCESS,
  DELETE_VIDEO_FAIL,
} from './types';

const API_KEY = 'AIzaSyA8oHYJ-Cn_OLX82_F3zk9T4x2u2Lq7Twc';
const API_URL = 'https://www.googleapis.com/youtube/v3/';
const DL_URL = 'https://us-central1-yofftube.cloudfunctions.net/getYouTubeUrl?url=';

export const getOfflineVideos = () => {
  return dispatch => {
    dispatch({ type: GET_OFFLINE_VIDEOS })
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        const videosInfo = stores.map(result => {
          return JSON.parse(result[1]);
        });
        dispatch({ type: GET_OFFLINE_VIDEOS_SUCCESS, payload: videosInfo })
      });
    });
  }
}

export const searchVideos = (query, pageToken = null) => {
  return dispatch => {
    dispatch({ type: SEARCH_VIDEOS })
    const encodedURI = encodeURIComponent(query);
    const pageIndex =  pageToken ? '&pageToken=' + pageToken : '';
    console.log(`${API_URL}search?part=snippet&q=${encodedURI}&type=video&maxResults=5&key=${API_KEY}${pageIndex}`)
    fetch(`${API_URL}search?part=snippet&q=${encodedURI}&type=video&maxResults=5&key=${API_KEY}${pageIndex}` )
      .then((response) => response.json())
      .then(data => {
        if (data.error) {
          dispatch({ type: SEARCH_VIDEOS_FAIL, payload: data.error.message });
          return
        }

        const videoIds = data.items
          .filter(item => item.snippet.liveBroadcastContent === 'none')
          .map(item => item.id.videoId)

        fetch(`${API_URL}videos?part=snippet,statistics,contentDetails&id=${videoIds.join(',')}&key=${API_KEY}`)
          .then((response) => response.json())
          .then(data => {
            const videosInfo = data.items
              .map(item => {
                return {
                  id: item.id,
                  title: item.snippet.title,
                  duration: item.contentDetails.duration,
                  views: item.statistics.viewCount,
                  thumbnail: item.snippet.thumbnails.high.url,
                  date: item.snippet.publishedAt,
                  channelId: item.snippet.channelId,
                  channelTitle: item.snippet.channelTitle,
                }
              })
            dispatch({ type: SEARCH_VIDEOS_SUCCESS, payload: videosInfo });
          })
          .catch(error => {
            console.log(error);
            dispatch({ type: SEARCH_VIDEOS_FAIL })
          })


      })
      .catch(error => {
        console.log(error);
        dispatch({ type: SEARCH_VIDEOS_FAIL })
      })
  }
}

export const deleteVideo = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: DELETE_VIDEO });
    let videoInfo = getState().videos.videos.filter(video => video.id === id)[0];
    FileSystem.deleteAsync(videoInfo.uri)
      .then(() => {
        AsyncStorage.removeItem(`@YoffTube:${id}`)
          .then(() => {
            dispatch({ type: DELETE_VIDEO_SUCCESS, payload: { id } });
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

export const downloadVideo = (id) => {
  return (dispatch, getState) => {
    let videoInfo = getState().videos.videos.filter(video => video.id === id)[0];
    let progressIteration = 5;
    dispatch({ type: DOWNLOAD_VIDEO, payload: { id } });
    fetch(DL_URL + id)
      .then((response) => response.json())
      .then((responseJson) => {
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
            delete videoInfo.progress
            AsyncStorage.setItem(`@YoffTube:${id}`, JSON.stringify({ ...videoInfo, uri: data.uri }))
              .then(() => {
                dispatch({ type: DOWNLOAD_VIDEO_SUCCESS, payload: { id, uri: data.uri } });
              })
          })
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: DOWNLOAD_VIDEO_FAIL });
      });
  }
}