import { combineReducers } from 'redux';
import VideoReducer from './VideoReducer';
import ErrorReducer from './ErrorReducer';
import SettingsReducer from './SettingsReducer';

export default combineReducers({
  videos: VideoReducer,
  errorHandler: ErrorReducer,
  settings: SettingsReducer,
});