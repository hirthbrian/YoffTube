import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
  View,
  Text,
  Animated,
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
  constructor(props) {
    super(props);

    this.progressValue = new Animated.Value(0);
    this.rotateAnim = this.progressValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['90deg', '0deg']
    });
  }

  renderDownload = () => (
    <TouchableWithoutFeedback
      onPress={this.props.onPress}
    >
      <Image
        source={require('../../assets/play.png')}
        style={{
          transform: [{ rotate: '90deg' }],
          tintColor: Colors.white,
          width: 35,
          height: 35,
        }}
      />
    </TouchableWithoutFeedback>
  )

  renderProgress = () => {
    const { progress } = this.props;

    if (progress !== -1) {
      this.progressValue.setValue(progress)
    }

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Circle
          size={60}
          strokeCap='round'
          indeterminate={progress === -1}
          progress={progress}
          borderWidth={0}
          color={Colors.white}
        />
        <Animated.Image
          source={require('../../assets/play.png')}
          style={{
            position: 'absolute',
            tintColor: Colors.white,
            transform: [{ rotate: this.rotateAnim }],
            width: 35,
            height: 35,
          }}
        />
      </View>
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