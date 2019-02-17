import React, { Component } from 'react';
import {
  View
} from 'react-native'
import { connect } from 'react-redux';

import VideoList from './VideoList';
import VideoType from './VideoType';

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
    searchVideos('');
  }

  renderHeader = () => <SearchBar />

  render() {
    const { navigation, searchedVideos } = this.props;

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        {this.renderHeader()}
        <VideoList
          videos={searchedVideos}
          navigation={navigation}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ videos }) => ({
  homepageVideos: videos.videos.filter(video => video.type === VideoType.HOMEPAGE),
  searchedVideos: videos.videos.filter(video => video.type === VideoType.SEARCH)
});

export default connect(mapStateToProps, { getOfflineVideos, getHomepageVideos, searchVideos })(Main)