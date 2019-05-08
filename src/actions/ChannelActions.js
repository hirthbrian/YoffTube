import {
  GET_CHANNEL,
  GET_CHANNEL_FAIL,
  GET_CHANNEL_SUCCESS,
  CLEAR_CHANNEL,
} from './types';

const API_URL = 'https://us-central1-yofftube.cloudfunctions.net';

export const clearChannel = () => dispatch => {
  dispatch({ type: CLEAR_CHANNEL })
}

export const getChannelVideos = (channelId, pageToken = null) => dispatch => {
  dispatch({ type: GET_CHANNEL })

  const tokenUrl = pageToken ? `&pageToken=${pageToken}` : ``

  fetch(`${API_URL}/channel?channelId=${channelId}` + tokenUrl)
    .then(response => response.json())
    .then(data => {
      dispatch({ type: GET_CHANNEL_SUCCESS, payload: data });
    })
}