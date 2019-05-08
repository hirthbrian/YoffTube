import React, { Component } from 'react';
import {
  View,
} from 'react-native'
import { connect } from 'react-redux';

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
      query,
      videos,
      loading,
      pageToken,
      searchVideos,
    } = this.props;

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <SearchBar />
        <VideoList
          videos={Object.values(videos)}
          loading={loading}
          onEndReached={() => searchVideos(query, pageToken)}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ videos }) => ({
  query: videos.query,
  videos: videos.items,
  loading: videos.loading,
  pageToken: videos.pageToken
});

export default connect(mapStateToProps, {
  getOfflineVideos,
  searchVideos
})(Main)