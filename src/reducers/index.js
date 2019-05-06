import { combineReducers } from 'redux';
import VideoReducer from './VideoReducer';
import ChannelReducer from './ChannelReducer';
import DownloadReducer from './DownloadReducer';
import ErrorReducer from './ErrorReducer';
import SettingsReducer from './SettingsReducer';

export default combineReducers({
  videos: VideoReducer,
  channel: ChannelReducer,
  download: DownloadReducer,
  errorHandler: ErrorReducer,
  settings: SettingsReducer,
});