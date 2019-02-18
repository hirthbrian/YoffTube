import React, { Component } from 'react';
import { connect } from 'react-redux';

import VideoList from './VideoList';

import {
  getOfflineVideos
} from './actions';

class Downloaded extends Component {
  render() {
    const {
      videos,
      getOfflineVideos
    } = this.props;

    return (
      <VideoList
        videos={videos}
        onRefresh={getOfflineVideos}
      />
    );
  }
}

const mapStateToProps = ({ videos }) => ({
  videos: videos.downloaded
});

export default connect(mapStateToProps, { getOfflineVideos })(Downloaded)