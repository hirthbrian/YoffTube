import React, { Component } from 'react';
import { connect } from 'react-redux';

import VideoList from '../components/VideoList';

import {
  clearChannel,
  getChannelVideos
} from '../actions';

class Channel extends Component {
  componentWillMount() {
    const {
      navigation,
      clearChannel,
      getChannelVideos
    } = this.props;

    const channelId = navigation.getParam('id');

    clearChannel();
    getChannelVideos(channelId)
  }
  render() {
    const {
      items,
      loading,
      pageToken,
      navigation,
      getChannelVideos
    } = this.props;

    const channelId = navigation.getParam('id');

    return (
      <VideoList
        videos={Object.values(items)}
        loading={loading}
        onEndReached={() => getChannelVideos(channelId, pageToken)}
      />
    );
  }
}

const mapStateToProps = ({ channel }) => ({
  items: channel.items,
  loading: channel.loading,
  pageToken: channel.pageToken
});

export default connect(mapStateToProps, {
  clearChannel,
  getChannelVideos
})(Channel)