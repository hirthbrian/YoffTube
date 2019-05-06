import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
  View,
  Image,
  Dimensions,
} from 'react-native';

import DownloadButton from './DownloadButton';
import Duration from './Duration';
import Colors from '../Colors';
import VideoFooter from './VideoFooter';

class VideoCard extends Component {
  renderThumbnail = () => {
    const {
      thumbnail,
      duration,
      progress,
      onDownloadPress
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
        <Image
          source={{ uri: thumbnail }}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        />
        <DownloadButton
          progress={progress}
          onPress={onDownloadPress}
        />
        <Duration
          duration={duration}
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
      onChannelPress,
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
          onChannelPress={onChannelPress}
        />
      </View>
    );
  }
}

VideoCard.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default VideoCard