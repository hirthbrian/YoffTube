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
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { connect } from 'react-redux';

import DownloadButton from './DownloadButton';
import Colors from './Colors';

momentDurationFormatSetup(moment);

class VideoItem extends Component {
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

  renderFooter = () => {
    const {
      date,
      title,
      channelTitle,
      onChannelPress
    } = this.props;

    return (
      <View
        style={{
          flex: 1,
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}
      >
        <Text
          style={{
            flex: 1,
            fontSize: 16,
          }}
          numberOfLines={2}
        >
          {title}
        </Text>
        <View
          style={{
            paddingTop: 10,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}
          >
            {channelTitle &&
              <Text
                onPress={onChannelPress}
              >
                <Text
                  style={{
                    textDecorationLine: 'underline',
                  }}
                >
                  {channelTitle}
                </Text>
                {' - '}
              </Text>
            }
            <Text
              style={{
                fontSize: 12,
              }}
            >
              {moment(date).from(moment())}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  renderThumbnail = () => {
    const {
      id,
      uri,
      thumbnail,
      duration,
    } = this.props;
    const { width } = Dimensions.get('window');

    if (uri) {
      return (
        <Video
          onFullscreenUpdate={this.onFullscreenUpdate}
          useNativeControls
          source={{ uri: uri }}
          resizeMode={'contain'}
          style={{
            width: width,
            height: ((width * 180) / 320),
            backgroundColor: Colors.grey
          }}
        />
      );
    }

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
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            borderRadius: 20,
            backgroundColor: Colors.transparentBlack,
            padding: 10,
          }}
        >
          <DownloadButton
            videoId={id}
            isDownloaded={!!uri}
          // downloadProgress={progress}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            left: 10,
            borderRadius: 4,
            backgroundColor: Colors.transparentBlack,
          }}
        >
          <Text
            style={{
              paddingHorizontal: 5,
              paddingVertical: 2,
              color: Colors.white,
            }}
          >
            {moment.duration(duration).format('h:mm:ss')}
          </Text>
        </View>
      </View>
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
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default connect()(VideoItem)