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
            color={Colors.purple}
            progress={downloadProgress}
          />
          :
          <TouchableWithoutFeedback
            onPress={this.onPress}
          >
            <Image
              source={isDownloaded ? require('../assets/garbage.png') : require('../assets/download.png')}
              style={{
                marginLeft: 15,
                width: 25,
                height: 25,
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