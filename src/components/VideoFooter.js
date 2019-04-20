import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
  View,
  Text,
} from 'react-native';
import moment from 'moment';

import Colors from '../Colors';

const approx = require('approximate-number');

class VideoFooter extends Component {
  render() {
    const {
      date,
      title,
      views,
      channelTitle,
      onChannelPress
    } = this.props;

    return (
      <View
        style={{
          flex: 1,
          // backgroundColor: Colors.white,
        }}
      >
        <View
          style={{
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
          <Text
            style={{
              flex: 1,
              fontSize: 12,
              paddingTop: 10,
              alignItems: 'flex-end',
            }}
          >
            <Text
              onPress={onChannelPress}
              style={{
                fontSize: 14,
                textDecorationLine: 'underline',
              }}
            >
              {channelTitle}
            </Text>
            {` • ${approx(views)} views • ${moment(date).from(moment())}`}
          </Text>
        </View>
      </View>
    );
  }
}

VideoFooter.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  channelTitle: PropTypes.string.isRequired,
  onChannelPress: PropTypes.func.isRequired,
  views: PropTypes.string.isRequired,
};

export default VideoFooter