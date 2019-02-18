import React, { Component } from 'react';
import {
  View
} from 'react-native'
import { connect } from 'react-redux';

import VideoList from './VideoList';

import {
  searchVideos,
  getOfflineVideos,
  getHomepageVideos,
} from './actions';
import SearchBar from './SearchBar';

class Main extends Component {
  componentWillMount() {
    const { getOfflineVideos, searchVideos } = this.props;
    getOfflineVideos();
    // getHomepageVideos();
    // searchVideos('');
  }

  renderHeader = () => <SearchBar />

  render() {
    const { navigation, videos } = this.props;

    return (
      <VideoList
        videos={videos}
        navigation={navigation}
        header={this.renderHeader}
      />
    );
  }
}

const mapStateToProps = ({ videos }) => ({
  videos: videos.videos,
});

export default connect(mapStateToProps, { getOfflineVideos, getHomepageVideos, searchVideos })(Main)