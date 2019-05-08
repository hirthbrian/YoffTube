import {
  CLEAR_VIDEOS,
  SEARCH_VIDEOS,
  SEARCH_VIDEOS_SUCCESS,
} from './types';

const API_URL = 'https://us-central1-yofftube.cloudfunctions.net';

export const clearVideos = () => dispatch => {
  dispatch({ type: CLEAR_VIDEOS })
}
export const searchVideos = (query, pageToken = null) => dispatch => {
  dispatch({ type: SEARCH_VIDEOS, payload: query })

  const tokenUrl = pageToken ? `&pageToken=${pageToken}` : ``

  fetch(`${API_URL}/search?query=${query}` + tokenUrl)
    .then(response => response.json())
    .then(data => {
      dispatch({ type: SEARCH_VIDEOS_SUCCESS, payload: data });
    })
}