import React, { useEffect } from 'react';
import {
  View,
} from 'react-native';

import VideoList from '../../components/VideoList';
import SearchBar from '../../components/SearchBar';

function Home({
  query,
  videos,
  loading,
  pageToken,
  searchVideos,
  getOfflineVideos,
}) {
  useEffect(() => {
    getOfflineVideos();
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <SearchBar />
      <VideoList
        videos={Object.values(videos)}
      />
    </View>
  );
}

export default Home;
