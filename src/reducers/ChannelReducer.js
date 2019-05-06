import {
  GET_CHANNEL_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  items: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CHANNEL_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
};