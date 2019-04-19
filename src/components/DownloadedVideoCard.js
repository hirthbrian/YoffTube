import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
  View,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import {
  Video,
  ScreenOrientation,
} from 'expo';

import Colors from '../Colors';
import VideoFooter from './VideoFooter';

class DownloadedVideoCard extends Component {
  onFullscreenUpdate = (fullscreenUpdate) => {
    switch (fullscreenUpdate) {
      case Video.FULLSCREEN_UPDATE_PLAYER_DID_PRESENT:
        ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL_BUT_UPSIDE_DOWN);
        break;
      case Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS:
        ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
        break;
    }
  }

  renderThumbnail = () => {
    const {
      uri,
      thumbnail,
    } = this.props;
    const { width } = Dimensions.get('window');

    return (
      <View
        style={{
          width: width,
          height: (width * 180) / 320,
          backgroundColor: Colors.grey,
        }}
      >
        <Video
          onFullscreenUpdate={this.onFullscreenUpdate}
          useNativeControls
          source={{ uri: uri }}
          resizeMode={'contain'}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        />
      </View>
    );
  }

  render() {
    const {
      date,
      title,
      views,
      channelTitle,
    } = this.props;

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        {this.renderThumbnail()}
        <VideoFooter
          date={date}
          title={title}
          views={views}
          channelTitle={channelTitle}
          onChannelPress={() => { }}
        />
      </View>
    );
  }
}

DownloadedVideoCard.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default DownloadedVideoCard