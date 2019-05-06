import {
  SHOW_DOWNLOAD_SELECTOR,
  HIDE_DOWNLOAD_SELECTOR
} from '../actions/types';

const INITIAL_STATE = {
  downloadOptions: [],
  isDownloadSelectorVisible: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_DOWNLOAD_SELECTOR:
      return {
        ...state,
        downloadOptions: action.payload,
        isDownloadSelectorVisible: true,
      };
    case HIDE_DOWNLOAD_SELECTOR:
      return {
        ...state,
        downloadOptions: [],
        isDownloadSelectorVisible: false,
      };
    default:
      return state;
  }
};