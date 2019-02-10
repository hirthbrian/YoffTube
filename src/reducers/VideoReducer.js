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
} from '../actions/types';

const INITIAL_STATE = {
  searchedVideos: [],
  offlineVideos: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_OFFLINE_VIDEOS:
      return {
        ...state,
      };
    case GET_OFFLINE_VIDEOS_SUCCESS:
      return {
        ...state,
        offlineVideos: {
          ...state.offlineVideos,
          ...action.payload
        }
      };
    case GET_OFFLINE_VIDEOS_FAIL:
      return {
        ...state,
      };
    case SEARCH_VIDEOS:
      return {
        ...state,
      };
    case SEARCH_VIDEOS_SUCCESS:
      return {
        ...state,
        searchedVideos: action.payload,
      };
    case SEARCH_VIDEOS_FAIL:
      return {
        ...state,
      };
    case DOWNLOAD_PROGRESS:
      return {
        ...state,
        searchedVideos: {
          ...state.searchedVideos,
          [action.payload.id]: {
            ...state.searchedVideos[action.payload.id],
            progress: action.payload.progress
          }
        }
      };
    case DOWNLOAD_VIDEO:
      return {
        ...state,
      };
    case DOWNLOAD_VIDEO_SUCCESS:
      return {
        ...state,
        searchedVideos: {
          ...state.searchedVideos,
          [action.payload.id]: {
            ...state.searchedVideos[action.payload.id],
            uri: action.payload.uri,
            progress: null
          }
        },
        offlineVideos: {
          ...state.offlineVideos,
          [action.payload.id]: {
            ...state.searchedVideos[action.payload.id],
            progress: null,
            uri: action.payload.uri,
          }
        },
      };
    case DELETE_VIDEO:
      return {
        ...state,
      };
    case DELETE_VIDEO_SUCCESS:
      const videos = state.offlineVideos;
      delete videos[action.payload.id];
      return {
        ...state,
        offlineVideos: videos,
      };
    case DELETE_VIDEO_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};