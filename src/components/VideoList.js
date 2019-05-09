import React, { Component } from 'react';
import {
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { withNavigation } from 'react-navigation';

import { connect } from 'react-redux';

import DownloadSelector from '../components/DownloadSelector';
import VideoCard from './VideoCard';
import DownloadedVideoCard from './DownloadedVideoCard';
import Colors from '../Colors';

import {
  downloadVideo,
  getDownloadUrl,
  deleteVideo,
  getChannelVideos,
} from '../actions';

class VideoList extends Component {
  onChannelPress = (id, title) => {
    const { navigation } = this.props;
    navigation.navigate('Channel', { id, title });
  }

  renderItem = ({ item }) => {
    const {
      downloaded,
      deleteVideo,
      getDownloadUrl
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
      downloaded[item.id] ?
        <DownloadedVideoCard
          uri={item.uri}
          onPressDelete={() => deleteVideo(item.id)}
          {...defaultProps}
        /> :
        <VideoCard
          progress={item.progress}
          onDownloadPress={() => getDownloadUrl(item.id)}
          {...defaultProps}
        />
    )
  };

  renderEmpty = () => {
    const { loading } = this.props;

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {loading ?
          <ActivityIndicator
            size="large"
            color={Colors.red}
          />
          :
          <Image
            source={require('../../assets/icon.png')}
            style={{
              width: 64,
              height: 64,
              opacity: 0.5
            }}
          />
        }
      </View>
    )
  }

  render() {
    const {
      header,
      videos,
      onRefresh,
      onEndReached,
    } = this.props;

    return (
      <View
        style={{
          flex: 1
        }}
      >
        <DownloadSelector />
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
          }}
          data={videos}
          renderItem={this.renderItem}
          ListEmptyComponent={this.renderEmpty}
          ListHeaderComponent={header}
          onRefresh={onRefresh}
          refreshing={false}
          // onEndReached={onEndReached}
          keyExtractor={video => video.id}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ download }) => ({
  downloaded: download.items,
});

export default connect(mapStateToProps, {
  downloadVideo,
  getDownloadUrl,
  deleteVideo,
  getChannelVideos
})(withNavigation(VideoList))