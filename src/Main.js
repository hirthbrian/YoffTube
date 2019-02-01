import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  StatusBar,
  FlatList,
  AsyncStorage,
} from 'react-native';

import { search } from './Api';
import VideoItem from './VideoItem';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      text: '',
    };
  }

  renderItem = ({ item }) => (
    <VideoItem
      id={item.id.videoId}
      title={item.snippet.title}
      thumbnail={item.snippet.thumbnails.high.url}
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
        height: 15,
      }}
    >
      <Text>
        Please start with a search
      </Text>
    </View>
  )

  onChangeText = (text) => {
    this.setState({ text: text })
  }

  onEndEditing = () => {
    const { text } = this.state;

    search(text).then(data => {
      console.log(data)
      const videos = Object.values(data.items);
      this.setState({
        videos: videos
      });
    })
  }

  render() {
    const { videos } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 15,
            height: 75,
            backgroundColor: '#551A8B',
            justifyContent: 'flex-end'
          }}
        >
          <TextInput
            color={'#FFFFFF'}
            selectionColor={'#FFFFFF'}
            placeholder={'Search...'}
            onChangeText={this.onChangeText}
            onEndEditing={this.onEndEditing}
            placeholderTextColor={'#CAA3EE'}
            style={{
              fontSize: 24,
            }}
          />
        </View>
        <FlatList
          data={videos}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={video => { return video.id.videoId }}
          ListEmptyComponent={this.renderEmpty}
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
