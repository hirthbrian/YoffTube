import {
  GET_OFFLINE_VIDEOS_SUCCESS,
  SEARCH_VIDEOS_SUCCESS,
  GET_CHANNEL_VIDEOS_SUCCESS,
  DOWNLOAD_VIDEO,
  DOWNLOAD_VIDEO_SUCCESS,
  DOWNLOAD_VIDEO_FAIL,
  SET_DOWNLOAD_PROGRESS,
  DELETE_VIDEO_SUCCESS,
  DOWNLOAD_QUALITY,
  DOWNLOAD_QUALITY_SUCCESS,
  DOWNLOAD_QUALITY_FAIL,
  TEST_TEST
} from '../actions/types';

const INITIAL_STATE = {
  videos: [],
  pageToken: '',
  downloaded: [],
  channelVideos: [],
  channels: [],
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
        pageToken: action.payload.pageToken,
        videos: {
          ...action.payload.items,
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
        videos: {
          ...state.videos,
          [action.payload.id]: {
            ...state.videos[action.payload.id],
            progress: null,
          }
        },
      };
    case DELETE_VIDEO_SUCCESS:
      return {
        ...state,
      };
    case DOWNLOAD_QUALITY:
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
    case DOWNLOAD_QUALITY_SUCCESS:
      return {
        ...state,
        videos: {
          ...state.videos,
          [action.payload.id]: {
            ...state.videos[action.payload.id],
            progress: null,
          }
        }
      };
    case DOWNLOAD_QUALITY_FAIL:
      return {
        ...state,
        videos: {
          ...state.videos,
          [action.payload.id]: {
            ...state.videos[action.payload.id],
            progress: null,
          }
        }
      };
    case TEST_TEST:
      return {
        ...state,
        channels: action.payload
      }
    default:
      return state;
  }
};