import React, { Component } from 'react';
import {
  View,
  Image,
  FlatList,
} from 'react-native';

import { connect } from 'react-redux';

import VideoCard from './VideoCard';
import DownloadedVideoCard from './DownloadedVideoCard';
import Colors from '../Colors';

import {
  downloadVideo
} from '../actions';

class VideoList extends Component {
  onChannelPress = (channelId, channelTitle) => {
    const { navigation } = this.props;
    navigation.navigate('Channel', { channelId, channelTitle });
  }

  renderItem = ({ item }) => {
    const {
      downloadVideo
    } = this.props;

    const defaultProps = {
      title: item.title,
      thumbnail: item.thumbnail,
      date: item.date,
      duration: item.duration,
      views: item.views,
      channelTitle: item.channelTitle,
      onChannelPress: () => this.onChannelPress(item.channelId, item.channelTitle)
    }

    return (
      item.uri ?
        <DownloadedVideoCard
          uri={item.uri}
          {...defaultProps}
        /> :
        <VideoCard
          progress={item.progress}
          onDownloadPress={() => downloadVideo(item.id)}
          {...defaultProps}
        />
    )
  };

  renderSeparator = () => (
    <View
      style={{
        height: 5,
        backgroundColor: Colors.grey
      }}
    />
  )

  renderEmpty = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        source={require('../../assets/icon.png')}
        style={{
          width: 64,
          height: 64,
          opacity: 0.5
        }}
      />
    </View>
  )

  render() {
    const {
      header,
      videos,
      onRefresh
    } = this.props;

    return (
      <FlatList
        style={{
          // backgroundColor: Colors.grey,
        }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        data={videos}
        renderItem={this.renderItem}
        // ItemSeparatorComponent={this.renderSeparator}
        ListEmptyComponent={this.renderEmpty}
        ListHeaderComponent={header}
        onRefresh={onRefresh}
        refreshing={false}
        keyExtractor={video => { return video.id }}
      />
    );
  }
}

export default connect(null, { downloadVideo })(VideoList)