import {
  GET_OFFLINE_VIDEOS_SUCCESS,
  SEARCH_VIDEOS_SUCCESS,
  GET_CHANNEL_VIDEOS_SUCCESS,
  DOWNLOAD_VIDEO,
  DOWNLOAD_VIDEO_SUCCESS,
  DOWNLOAD_VIDEO_FAIL,
  SET_DOWNLOAD_PROGRESS,
  DELETE_VIDEO_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  videos: [],
  downloaded: [],
  channelVideos: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_OFFLINE_VIDEOS_SUCCESS:
      return {
        ...state,
        downloaded: {
          ...action.payload
        }
      };
    case SEARCH_VIDEOS_SUCCESS:
      return {
        ...state,
        videos: {
          ...action.payload
        },
      };
    case GET_CHANNEL_VIDEOS_SUCCESS:
      return {
        ...state,
        channelVideos: action.payload
      };
    case DOWNLOAD_VIDEO:
      return {
        ...state,
        videos: {
          ...state.videos,
          [action.payload.id]: {
            ...state.videos[action.payload.id],
            progress: -1,
          }
        }
      };
    case SET_DOWNLOAD_PROGRESS:
      return {
        ...state,
        videos: {
          ...state.videos,
          [action.payload.id]: {
            ...state.videos[action.payload.id],
            progress: action.payload.progress,
          }
        },
      };
    case DOWNLOAD_VIDEO_SUCCESS:
      return {
        ...state,
        videos: {
          ...state.videos,
          [action.payload.id]: {
            ...state.videos[action.payload.id],
            uri: action.payload.uri,
            progress: null,
          }
        },
      };
    case DOWNLOAD_VIDEO_FAIL:
      return {
        ...state,
        videos: state.videos.map(video => {
          if (video.id === action.payload.id) {
            delete video.progress;
            delete video.loading;
          }
          return video
        })
      };
    case DELETE_VIDEO_SUCCESS:
      return {
        ...state,
        videos: state.videos.filter(video => video.id !== action.payload.id)
      };
    default:
      return state;
  }
};