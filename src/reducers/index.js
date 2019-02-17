import { combineReducers } from 'redux';
import VideoReducer from './VideoReducer';
import ErrorReducer from './ErrorReducer';

export default combineReducers({
  videos: VideoReducer,
  errorHandler: ErrorReducer,
});