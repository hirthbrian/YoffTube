import {
  GET_OFFLINE_VIDEOS,
  GET_OFFLINE_VIDEOS_SUCCESS,
  GET_OFFLINE_VIDEOS_FAIL,
  SEARCH_VIDEOS,
  SEARCH_VIDEOS_SUCCESS,
  SEARCH_VIDEOS_FAIL,
  GET_HOMEPAGE_VIDEOS,
  GET_HOMEPAGE_VIDEOS_SUCCESS,
  GET_HOMEPAGE_VIDEOS_FAIL,
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
} from '../actions/types';
import VideoType from '../VideoType';

const videoTemplate = {
  id: '',
  type: '',
  title: '',
  thumbnail: '',
  date: '',
  uri: '',
}

const INITIAL_STATE = {
  videos: [],
  channelVideos: [],
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
        videos: [
          ...state.videos,
          ...action.payload
        ]
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
        videos: [
          ...state.videos,
          ...action.payload
        ],
      };
    case SEARCH_VIDEOS_FAIL:
      return {
        ...state,
      };
    case GET_HOMEPAGE_VIDEOS:
      return {
        ...state,
      };
    case GET_HOMEPAGE_VIDEOS_SUCCESS:
      return {
        ...state,
        videos: [
          ...state.videos,
          ...action.payload
        ]
      };
    case GET_HOMEPAGE_VIDEOS_FAIL:
      return {
        ...state,
      };
    case GET_CHANNEL_VIDEOS:
      return {
        ...state,
      };
    case GET_CHANNEL_VIDEOS_SUCCESS:
      return {
        ...state,
        channelVideos: action.payload
      };
    case GET_CHANNEL_VIDEOS_FAIL:
      return {
        ...state,
      };
    case DOWNLOAD_PROGRESS:
      return {
        ...state,
        videos: state.videos.map(video => {
          if (video.id === action.payload.id) {
            video.progress = action.payload.progress
          }
          return video
        })
      };
    case DOWNLOAD_VIDEO:
      return {
        ...state,
      };
    case DOWNLOAD_VIDEO_SUCCESS:
      return {
        ...state,
        videos: state.videos.map(video => {
          if (video.id === action.payload.id) {
            video.uri = action.payload.uri;
            delete video.progress
          }
          return video
        })
      };
    case DELETE_VIDEO:
      return {
        ...state,
      };
    case DELETE_VIDEO_SUCCESS:
      return {
        ...state,
        videos: state.videos.filter(video => video.id !== action.payload.id)
      };
    case DELETE_VIDEO_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};