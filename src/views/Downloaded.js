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
      items,
      getOfflineVideos
    } = this.props;

    return (
      <VideoList
        navigation={this.props.navigation}
        videos={Object.values(items)}
        onRefresh={getOfflineVideos}
      />
    );
  }
}

const mapStateToProps = ({ download }) => ({
  items: download.items
});

export default connect(mapStateToProps, { getOfflineVideos })(Downloaded)