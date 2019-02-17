import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
} from 'react-native';
import Colors from './Colors';

import VideoItem from './VideoItem';

class VideoList extends Component {
  onChannelPress = (channelId, channelTitle) => {
    const { navigation } = this.props;
    navigation.navigate('Channel', { channelId, channelTitle });
  }

  renderItem = ({ item }) => (
    <VideoItem
      id={item.id}
      title={item.title}
      thumbnail={item.thumbnail}
      uri={item.uri}
      date={item.date}
      duration={item.duration}
      views={item.views}
      type={item.type}
      progress={item.progress}
      channelTitle={item.channelTitle}
      onChannelPress={() => this.onChannelPress(item.channelId, item.channelTitle)}
      // progress={item.progress}
    />
  );

  renderSeparator = () => (
    <View
      style={{
        height: 15,
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
        source={require('../assets/icon.png')}
        style={{
          width: 64,
          height: 64,
          opacity: 0.5
        }}
      />
      <Text
        style={{
          fontFamily: 'quicksand'
        }}
      >
        No videos found :(
      </Text>
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
        contentContainerStyle={{
          flexGrow: 1,
        }}
        data={videos}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderSeparator}
        ListEmptyComponent={this.renderEmpty}
        ListHeaderComponent={header}
        onRefresh={onRefresh}
        refreshing={false}
        keyExtractor={video => { return video.id }}
      />
    );
  }
}

export default VideoList