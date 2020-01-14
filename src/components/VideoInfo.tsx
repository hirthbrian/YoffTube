import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';

import Colors from '../Colors';

const approx = require('approximate-number');

function VideoInfo({
  date,
  title,
  views,
  channelTitle,
  onChannelPress
}) {
  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: Colors.white,
      }}
    >
      <View
        style={{
          paddingTop: 10,
          paddingHorizontal: 15,
          paddingBottom: 20,
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
            flex: 1,
            paddingTop: 10,
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}
        >
          <Text
            onPress={onChannelPress}
            style={{
              textDecorationLine: 'underline',
            }}
          >
            {channelTitle}
          </Text>
          <Text
            style={{
              fontSize: 12,
            }}
          >
            {` • ${approx(views)} views • ${moment(date).from(moment())}`}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default VideoInfo;
