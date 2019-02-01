import {
  GET_OFFLINE_VIDEOS,
  GET_OFFLINE_VIDEOS_SUCCESS,
  GET_OFFLINE_VIDEOS_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
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
        offlineVideos: action.payload,
      };
    case GET_OFFLINE_VIDEOS_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};