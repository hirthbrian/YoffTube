import {
  GET_OFFLINE_VIDEOS_SUCCESS,
  DOWNLOAD_VIDEO_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  items: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_OFFLINE_VIDEOS_SUCCESS:
      return {
        ...state,
        items: {
          ...action.payload
        }
      };
    case DOWNLOAD_VIDEO_SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};