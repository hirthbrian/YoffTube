import {
  SEARCH_VIDEOS,
  SEARCH_VIDEOS_SUCCESS,
} from './types';

const API_URL = 'https://us-central1-yofftube.cloudfunctions.net';

export const searchVideos = (query, pageToken = null) => dispatch => {
  dispatch({ type: SEARCH_VIDEOS })

  fetch(`${API_URL}/search?query=${query}`)
    .then(response => response.json())
    .then(data => {
      dispatch({ type: SEARCH_VIDEOS_SUCCESS, payload: data });
    })
}