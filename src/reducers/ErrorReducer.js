import {
  GET_HOMEPAGE_VIDEOS_FAIL,
  SEARCH_VIDEOS_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  type: '',
  message: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_HOMEPAGE_VIDEOS_FAIL:
      return {
        ...state,
        type: 'error',
        message: action.payload,
      };
    case SEARCH_VIDEOS_FAIL:
      return {
        ...state,
        type: 'error',
        message: action.payload,
      };
    default:
      return state;
  }
};