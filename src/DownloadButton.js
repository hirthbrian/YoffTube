import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { Circle } from 'react-native-progress';

import Colors from './Colors';

import {
  downloadVideo,
  deleteVideo,
} from './actions';

class DownloadButton extends Component {
  onPress = () => {
    const { videoId, isDownloaded, downloadVideo, deleteVideo } = this.props;
    if (isDownloaded) {
      deleteVideo(videoId)
    } else {
      downloadVideo(videoId);
    }
  }

  render() {
    const { downloadProgress, isDownloaded } = this.props;

    return (
      <View>
        {downloadProgress ?
          <Circle
            size={25}
            borderWidth={0}
            strokeCap={'round'}
            color={Colors.red}
            unfilledColor={Colors.grey}
            progress={downloadProgress}
          />
          :
          <TouchableWithoutFeedback
            onPress={this.onPress}
          >
            <Image
              source={isDownloaded ? require('../assets/garbage.png') : require('../assets/download.png')}
              style={{
                tintColor: Colors.white,
                width: 20,
                height: 20,
              }}
            />
          </TouchableWithoutFeedback>
        }
      </View>
    );
  }
}

DownloadButton.propTypes = {
  videoId: PropTypes.string.isRequired,
  isDownloaded: PropTypes.bool.isRequired,
  downloadProgress: PropTypes.number,
};

export default connect(null, { downloadVideo, deleteVideo })(DownloadButton)