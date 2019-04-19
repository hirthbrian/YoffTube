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
                flex: 1,
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
                {`${approx(views)} views - ${moment(date).from(moment())}`}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

VideoFooter.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  channelTitle: PropTypes.string.isRequired,
  views: PropTypes.string.isRequired,
};

export default VideoFooter