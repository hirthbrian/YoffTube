import React from 'react';
import {
  View,
  Image,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import Colors from './Colors';

import VideoItem from './VideoItem';
import SearchBar from './SearchBar';

import {
  getHomepageVideos
} from './actions';

class Main extends React.Component {
  componentWillMount() {
    const { getHomepageVideos } = this.props;
    getHomepageVideos();
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

  renderHeader = () => (
    <SearchBar />
  );

  render() {
    const { videos } = this.props;

    return (
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
        }}
        data={Object.values(videos)}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderSeparator}
        ListEmptyComponent={this.renderEmpty}
        ListHeaderComponent={this.renderHeader}
        keyExtractor={video => { return video.id }}
      />
    );
  }
}

const mapStateToProps = ({ videos }) => ({
  videos: videos.searchedVideos
});

export default connect(mapStateToProps, { getHomepageVideos })(Main)