import {
  TOGGLE_SETTINGS_MENU,
  SET_QUALITY_SETTING,
  SET_WIFI_SETTING,
  SHOW_QUALITY_SELECTOR,
  HIDE_QUALITY_SELECTOR
} from '../actions/types';

const INITIAL_STATE = {
  settingsMenuVisible: false,
  isWifiOnly: true,
  isInHighQuality: true,
  qualityOptions: [],
  isQualitySelectorVisible: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_SETTINGS_MENU:
      return {
        ...state,
        settingsMenuVisible: !state.settingsMenuVisible
      };
    case SET_QUALITY_SETTING:
      return {
        ...state,
        isInHighQuality: action.payload
      };
    case SET_WIFI_SETTING:
      return {
        ...state,
        isWifiOnly: action.payload
      };
    case SHOW_QUALITY_SELECTOR:
      return {
        ...state,
        qualityOptions: action.payload,
        isQualitySelectorVisible: true,
      };
    case HIDE_QUALITY_SELECTOR:
      return {
        ...state,
        qualityOptions: [],
        isQualitySelectorVisible: false,
      };
    default:
      return state;
  }
};