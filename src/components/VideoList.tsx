import React from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

import DownloadSelector from '../components/DownloadSelector';
import VideoCard from './VideoCard';
import Colors from '../Colors';

function VideoList({ videos }) {
  const onChannelPress = (id, title) => {
    const navigation = useNavigation();
    navigation.navigate('Channel', { id, title });
  };

  const renderItem = ({ item }) => {
    return (
      <VideoCard
        progress={item.progress}
        title={item.title}
        thumbnail={item.thumbnail}
        date={item.date}
        duration={item.duration}
        views={item.views}
        channelTitle={item.channelTitle}
        onChannelPress={() => onChannelPress(item.channelId, item.channelTitle)}
      />
    );
  };

  return (
    <View>
      <DownloadSelector />
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(video) => video.id}
      />
    </View>
  );
}


export default VideoList;
