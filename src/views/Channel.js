import React, { Component } from 'react';
import { connect } from 'react-redux';

import VideoList from '../components/VideoList';

import {
  getChannelVideos
} from '../actions';

class Channel extends Component {
  componentWillMount() {
    const { getChannelVideos, navigation } = this.props;

    console.log(navigation.getParam('channelId'))
    getChannelVideos(navigation.getParam('channelId'))
  }

  render() {
    const { videos } = this.props;

    return (
      <VideoList
        videos={videos}
      />
    );
  }
}

const mapStateToProps = ({ videos }) => ({
  videos: videos.channelVideos
});

export default connect(mapStateToProps, { getChannelVideos })(Channel)