import {
  SET_WIFI_SETTING,
  SET_QUALITY_SETTING,
  TOGGLE_SETTINGS_MENU,
  SHOW_QUALITY_SELECTOR,
  HIDE_QUALITY_SELECTOR
} from './types';

export const showQualitySelector = (options) => dispatch => {
  dispatch({ type: SHOW_QUALITY_SELECTOR, payload: options })
}

export const hideQualitySelector = () => dispatch => {
  dispatch({ type: HIDE_QUALITY_SELECTOR })
}

export const toggleSettingsMenu = () => {
  return dispatch => {
    dispatch({ type: TOGGLE_SETTINGS_MENU })
  }
}

export const setQualitySetting = isInHighQuality => {
  return dispatch => {
    dispatch({ type: SET_QUALITY_SETTING, payload: isInHighQuality })
  }
}

export const setWifiSetting = isWifiOnly => {
  return dispatch => {
    dispatch({ type: SET_WIFI_SETTING, payload: isWifiOnly })
  }
}