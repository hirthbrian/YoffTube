import React, { Component } from 'react';
import {
  View
} from 'react-native'
import { connect } from 'react-redux';

import VideoList from '../components/VideoList';

import {
  searchVideos,
  toggleSettingsMenu,
  getOfflineVideos,
  getHomepageVideos,
} from '../actions';
import SearchBar from '../components/SearchBar';
import Settings from '../components/Settings';
import QualitySelector from '../components/QualitySelector';

class Main extends Component {
  componentWillMount() {
    const {
      navigation,
      getOfflineVideos,
      searchVideos
    } = this.props;

    navigation.setParams({
      headerLeftPress: this.onHeaderLeftPress
    });
    getOfflineVideos();
    // getHomepageVideos();
    // searchVideos('');
  }

  renderHeader = () => <SearchBar />

  onHeaderLeftPress = () => this.props.toggleSettingsMenu()

  render() {
    const {
      navigation,
      videos,
      settingsMenuVisible
    } = this.props;

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Settings
          isVisible={settingsMenuVisible}
          onPressOutside={this.onHeaderLeftPress}
        />
        <QualitySelector
        />
        {this.renderHeader()}
        <VideoList
          videos={Object.values(videos)}
          navigation={navigation}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ videos, settings }) => ({
  videos: videos.videos,
  settingsMenuVisible: settings.settingsMenuVisible,
});

export default connect(mapStateToProps, {
  toggleSettingsMenu,
  getOfflineVideos,
  getHomepageVideos,
  searchVideos
})(Main)