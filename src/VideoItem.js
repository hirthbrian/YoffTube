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
} from 'expo';
import moment from 'moment';
import { connect } from 'react-redux';

import DownloadButton from './DownloadButton';

class VideoItem extends Component {
  renderFooter = () => {
    const { video } = this.props;

    if (!video) return null;

    const { id, uri, title, progress, date } = video;

    return (
      <View
        style={{
          // flex: 1,
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              flex: 1,
            }}
            numberOfLines={2}
          >
            {title}
          </Text>
          <DownloadButton
            videoId={id}
            isDownloaded={!!uri}
            downloadProgress={progress}
          />
        </View>
        <Text>
          {moment(date).from(moment())}
        </Text>
      </View>
    );
  }

  renderThumbnail = () => {
    const { video } = this.props;
    const { width } = Dimensions.get('window');

    if (!video) return null;

    const { thumbnail, uri } = video;

    if (uri) {
      return (
        <Video
          useNativeControls
          source={{ uri: uri }}
          resizeMode={'contain'}
          style={{
            width: width,
            height: ((width * 180) / 320),
          }}
        />
      );
    }

    return (
      <Image
        source={{ uri: thumbnail }}
        style={{
          width: width,
          height: ((width * 180) / 320),
        }}
      />
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        {this.renderThumbnail()}
        {this.renderFooter()}
      </View>
    );
  }
}

VideoItem.propTypes = {
  id: PropTypes.string.isRequired,
};

const mapStateToProps = (state, { id }) => ({
  video: state.videos.offlineVideos[id] || state.videos.searchedVideos[id]
});

export default connect(mapStateToProps)(VideoItem)