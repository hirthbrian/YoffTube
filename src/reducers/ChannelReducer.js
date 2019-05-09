import {
  CLEAR_CHANNEL,
  GET_CHANNEL,
  GET_CHANNEL_SUCCESS,
  GET_DOWNLOAD_URL,
  GET_DOWNLOAD_URL_SUCCESS,
  DOWNLOAD_VIDEO,
  DOWNLOAD_VIDEO_SUCCESS,
  SET_DOWNLOAD_PROGRESS,
} from '../actions/types';

const INITIAL_STATE = {
  items: {},
  pageToken: '',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLEAR_CHANNEL:
      return {
        ...INITIAL_STATE,
        items: {},
      };;
    case GET_CHANNEL:
      return {
        ...state,
        loading: true,
      };
    case GET_CHANNEL_SUCCESS:
      return {
        ...state,
        loading: false,
        pageToken: action.payload.nextPageToken,
        items: Object.assign(state.items, action.payload.items),
      };
    case SET_DOWNLOAD_PROGRESS:
      state.items[action.payload.id].progress = action.payload.progress
      return {
        ...state,
        items: { ...state.items }
      };
    case DOWNLOAD_VIDEO:
      state.items[action.payload.id].progress = -1
      return {
        ...state,
        items: { ...state.items }
      };
    case DOWNLOAD_VIDEO_SUCCESS:
      state.items[action.payload.id].uri = action.payload.uri
      state.items[action.payload.id].progress = null
      return {
        ...state,
        items: { ...state.items }
      };
    case GET_DOWNLOAD_URL:
      state.items[action.payload.id].progress = -1
      return {
        ...state,
        items: { ...state.items }
      };
    case GET_DOWNLOAD_URL_SUCCESS:
      state.items[action.payload.id].progress = null
      return {
        ...state,
        items: { ...state.items }
      };
    default:
      return state;
  }
};