import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  AsyncStorage,
} from 'react-native';

import { connect } from 'react-redux';

import VideoItem from './VideoItem';

import {
  getOfflineVideos
} from './actions';

class Downloaded extends Component {
  componentWillMount() {
    const { getOfflineVideos } = this.props;
    getOfflineVideos();
  }

  renderItem = ({ item }) => (
    <VideoItem
      id={item.id}
      title={item.title}
      thumbnail={item.thumbnail}
    />
  );

  renderSeparator = () => (
    <View
      style={{
        height: 15,
      }}
    />
  )

  render() {
    const { videos } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <FlatList
          data={videos}
          // numColumns={2}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={video => { return video.id }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
});

const mapStateToProps = ({ videos }) => ({
  videos: videos.offlineVideos
});

export default connect(mapStateToProps, { getOfflineVideos })(Downloaded)