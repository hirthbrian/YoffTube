import {
  GET_CHANNEL,
  GET_CHANNEL_FAIL,
  GET_CHANNEL_SUCCESS,
} from './types';

const API_KEY = 'AIzaSyA8oHYJ-Cn_OLX82_F3zk9T4x2u2Lq7Twc';
const API_URL = 'https://www.googleapis.com/youtube/v3/';

export const getChannelVideos = (channelId = 'UCrTNhL_yO3tPTdQ5XgmmWjA') => dispatch => {
  dispatch({ type: GET_CHANNEL })

  const url = `${API_URL}channels?part=snippet&id=${channelId}&maxResults=5&key=${API_KEY}`

  console.log('url', url)
  // fetch(url)
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log('data', data)
  //     // dispatch({ type: SEARCH_VIDEOS_SUCCESS, payload: data });
  //   })
}