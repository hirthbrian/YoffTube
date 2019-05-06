import {
  SHOW_DOWNLOAD_SELECTOR,
  HIDE_DOWNLOAD_SELECTOR,
} from './types';

export const showDownloadSelector = (options) => dispatch => {
  dispatch({ type: SHOW_DOWNLOAD_SELECTOR, payload: options })
}

export const hideDownloadSelector = () => dispatch => {
  dispatch({ type: HIDE_DOWNLOAD_SELECTOR })
}
