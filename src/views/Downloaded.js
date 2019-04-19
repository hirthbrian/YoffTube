import React, { Component } from 'react';
import { connect } from 'react-redux';

import VideoList from '../components/VideoList';

import {
  getOfflineVideos
} from '../actions';

class Downloaded extends Component {
  componentWillMount() {
    const { getOfflineVideos } = this.props;
    getOfflineVideos();
  }

  render() {
    const {
      videos,
      getOfflineVideos
    } = this.props;

    return (
      <VideoList
        videos={Object.values(videos)}
        onRefresh={getOfflineVideos}
      />
    );
  }
}

const mapStateToProps = ({ videos }) => ({
  videos: videos.downloaded
});

export default connect(mapStateToProps, { getOfflineVideos })(Downloaded)