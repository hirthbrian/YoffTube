import React, { Component } from 'react';
import {
  View,
  Image,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';

import VideoItem from './VideoItem';

import {
  getOfflineVideos
} from './actions';
import Colors from './Colors';

class Downloaded extends Component {
  componentWillMount() {
    const { getOfflineVideos } = this.props;
    getOfflineVideos();
  }

  renderItem = ({ item }) => (
    <VideoItem
      id={item.id}
    />
  );

  renderSeparator = () => (
    <View
      style={{
        height: 1,
        backgroundColor: Colors.lightBlue
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
        source={require('../assets/computer.png')}
        style={{
          width: 150,
          height: 150,
        }}
      />
    </View>
  )

  render() {
    const { videos, getOfflineVideos } = this.props;

    return (
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
        }}
        data={Object.values(videos)}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderSeparator}
        ListEmptyComponent={this.renderEmpty}
        keyExtractor={video => { return video.id }}
        onRefresh={getOfflineVideos}
        refreshing={false}
      />
    );
  }
}

const mapStateToProps = ({ videos }) => ({
  videos: videos.offlineVideos
});

export default connect(mapStateToProps, { getOfflineVideos })(Downloaded)