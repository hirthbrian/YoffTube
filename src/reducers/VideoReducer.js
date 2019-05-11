import {
  CLEAR_VIDEOS,
  SEARCH_VIDEOS,
  SEARCH_VIDEOS_SUCCESS,
  DOWNLOAD_VIDEO,
  DOWNLOAD_VIDEO_SUCCESS,
  DOWNLOAD_VIDEO_FAIL,
  SET_DOWNLOAD_PROGRESS,
  GET_DOWNLOAD_URL,
  GET_DOWNLOAD_URL_SUCCESS,
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
      return INITIAL_STATE;
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
      if (!state.items[action.payload.id]) return state
      state.items[action.payload.id].progress = action.payload.progress
      return {
        ...state,
        items: { ...state.items }
      };
    case DOWNLOAD_VIDEO:
      if (!state.items[action.payload.id]) return state
      state.items[action.payload.id].progress = -1
      return {
        ...state,
        items: { ...state.items }
      };
    case DOWNLOAD_VIDEO_SUCCESS:
      if (!state.items[action.payload.id]) return state
      state.items[action.payload.id].uri = action.payload.uri
      state.items[action.payload.id].progress = null
      return {
        ...state,
        items: { ...state.items }
      };
    case DOWNLOAD_VIDEO_FAIL:
      if (!state.items[action.payload.id]) return state
      state.items[action.payload.id].progress = null
      return {
        ...state,
        items: { ...state.items }
      };
    case GET_DOWNLOAD_URL:
      if (!state.items[action.payload.id]) return state
      state.items[action.payload.id].progress = -1
      return {
        ...state,
        items: { ...state.items }
      };
    case GET_DOWNLOAD_URL_SUCCESS:
      if (!state.items[action.payload.id]) return state
      state.items[action.payload.id].progress = null
      return {
        ...state,
        items: { ...state.items }
      };
    default:
      return state;
  }
};