import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  searchVideos,
  getOfflineVideos,
} from '../../actions';

import Home from './Home';

const mapStateToProps = ({ videos }) => ({
  query: videos.query,
  videos: videos.items,
  loading: videos.loading,
  pageToken: videos.pageToken,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    getOfflineVideos,
    searchVideos,
  }, dispatch)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
