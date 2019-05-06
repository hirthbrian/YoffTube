import React, { Component } from 'react';
import {
  View,
} from 'react-native'
import { connect } from 'react-redux';

import DownloadSelector from '../components/DownloadSelector';
import VideoList from '../components/VideoList';

import {
  searchVideos,
  getOfflineVideos,
} from '../actions';

import SearchBar from '../components/SearchBar';

class Main extends Component {
  componentWillMount() {
    const { getOfflineVideos } = this.props;

    getOfflineVideos();
  }

  render() {
    const {
      navigation,
      videos,
    } = this.props;

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <SearchBar />
        <DownloadSelector />
        <VideoList
          videos={Object.values(videos)}
          navigation={navigation}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ videos }) => ({
  videos: videos.items,
});

export default connect(mapStateToProps, {
  getOfflineVideos,
  searchVideos
})(Main)