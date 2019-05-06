import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
  View,
  Text,
} from 'react-native';

import Colors from '../Colors';

class Duration extends Component {
  render() {
    const { duration } = this.props;

    return (
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
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
          {duration === '0' ? 'LIVE' : duration}
        </Text>
      </View>
    );
  }
}

Duration.propTypes = {
  duration: PropTypes.string.isRequired,
};

export default Duration