import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { Circle } from 'react-native-progress';

import Colors from '../Colors';

import {
  downloadVideo,
} from '../actions';

class DownloadButton extends Component {
  renderDownload = () => (
    <TouchableWithoutFeedback
      onPress={this.props.onPress}
    >
      <Image
        source={require('../../assets/download.png')}
        style={{
          tintColor: Colors.white,
          width: 30,
          height: 30,
        }}
      />
    </TouchableWithoutFeedback>
  )

  renderProgress = () => {
    const { progress } = this.props;

    return (
      <Circle
        size={60}
        thickness={6}
        indeterminate={progress === -1}
        progress={progress}
        borderWidth={0}
        color={Colors.white}
      />
    )
  }

  render() {
    const {
      progress,
    } = this.props;

    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
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
          {progress ? this.renderProgress() : this.renderDownload()}
        </View>
      </View>
    );
  }
}

DownloadButton.propTypes = {
  progress: PropTypes.number,
};

export default connect(null, { downloadVideo })(DownloadButton)