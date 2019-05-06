import React, { Component } from 'react';
import { connect } from 'react-redux';

import VideoList from '../components/VideoList';

import {
  getChannelVideos
} from '../actions';

class Channel extends Component {
  componentWillMount() {
    const {
      navigation,
      getChannelVideos
    } = this.props;

    const channelId = navigation.getParam('id');

    getChannelVideos(channelId)
  }
  render() {
    const {
      items,
    } = this.props;

    return (
      <VideoList
        videos={Object.values(items)}
      />
    );
  }
}

const mapStateToProps = ({ channel }) => ({
  items: channel.items
});

export default connect(mapStateToProps, {
  getChannelVideos
})(Channel)