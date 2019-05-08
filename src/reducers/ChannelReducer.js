import {
  CLEAR_CHANNEL,
  GET_CHANNEL,
  GET_CHANNEL_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  items: {},
  pageToken: '',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLEAR_CHANNEL:
      return INITIAL_STATE;
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
    default:
      return state;
  }
};