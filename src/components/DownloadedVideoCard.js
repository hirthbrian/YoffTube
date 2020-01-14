import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
  View,
  Image,
  Alert,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Video,
  ScreenOrientation,
} from 'expo';

import Colors from '../Colors';
import VideoInfo from './VideoInfo';
import Duration from './Duration';

class DownloadedVideoCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startPlaying: false,
    }
  }

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

  onPress = () => this.setState({ startPlaying: true })

  onDeletePress = () => {
    const { onPressDelete } = this.props;
    Alert.alert(
      'Remove',
      'Are you sure you want to remove this video?',
      [
        { text: 'Cancel', onPress: () => { }, style: 'cancel' },
        { text: 'OK', onPress: onPressDelete },
      ],
    );
  }

  renderPlayThumbnail = () => {
    const {
      duration,
      thumbnail,
    } = this.props;

    return (
      <TouchableWithoutFeedback
        onPress={this.onPress}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
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
              width: 60,
              height: 60,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: Colors.transparentBlack,
            }}
          >
            <Image
              source={require('../../assets/play.png')}
              style={{
                width: 35,
                height: 35,
                tintColor: Colors.white,
              }}
            />
          </View>
          <Duration
            duration={duration}
          />
          <TouchableWithoutFeedback
            onPress={this.onDeletePress}
          >
            <View
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                width: 30,
                height: 30,
                borderRadius: 4,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: Colors.transparentBlack,
              }}
            >
              <Image
                source={require('../../assets/garbage.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: Colors.white,
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderThumbnail = () => {
    const {
      uri,
    } = this.props;
    const { startPlaying } = this.state
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
          shouldPlay={startPlaying}
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
        {startPlaying || this.renderPlayThumbnail()}
      </View>
    );
  }

  render() {
    const {
      date,
      title,
      views,
      onChannelPress,
      channelTitle,
    } = this.props;

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        {this.renderThumbnail()}
        <VideoInfo
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

DownloadedVideoCard.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default DownloadedVideoCard