import {
  CLEAR_VIDEOS,
  SEARCH_VIDEOS,
  SEARCH_VIDEOS_SUCCESS,
  DOWNLOAD_VIDEO,
  DOWNLOAD_VIDEO_SUCCESS,
  DOWNLOAD_VIDEO_FAIL,
  SET_DOWNLOAD_PROGRESS,
} from '../actions/types';

const INITIAL_STATE = {
  items: {},
  pageToken: '',
  query: '',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLEAR_VIDEOS:
      return {
        ...INITIAL_STATE,
        items: {},  
      };
    case SEARCH_VIDEOS:
      return {
        ...state,
        loading: true,
        query: action.payload
      };
    case SEARCH_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        pageToken: action.payload.nextPageToken,
        items: Object.assign(state.items, action.payload.items),
      };
    case SET_DOWNLOAD_PROGRESS:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: {
            ...state.items[action.payload.id],
            progress: action.payload.progress,
          }
        },
      };
    case DOWNLOAD_VIDEO:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: {
            ...state.items[action.payload.id],
            progress: -1,
          }
        }
      };
    case DOWNLOAD_VIDEO_SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: {
            ...state.items[action.payload.id],
            uri: action.payload.uri,
            progress: null,
          }
        },
      };
    case DOWNLOAD_VIDEO_FAIL:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: {
            ...state.items[action.payload.id],
            progress: null,
          }
        },
      };
    default:
      return state;
  }
};