import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';

import VideoList from '../components/VideoList';

import {
  getOfflineVideos
} from '../actions';

class Downloaded extends Component {
  componentWillMount() {
    const {
      navigation,
      getOfflineVideos
    } = this.props;
    getOfflineVideos();

    navigation.setParams({ headerRightButton: this.clearAllVideo })
  }

  clearAllVideo = () => {
    Alert.alert(
      'Clear everything',
      'Are you sure you want to remove all videos?',
      [
        { text: 'Cancel', onPress: () => { }, style: 'cancel' },
        {
          text: 'OK', onPress: () => {
            AsyncStorage.clear()
          }
        },
      ],
    );
  }

  render() {
    const {
      items,
      getOfflineVideos
    } = this.props;

    return (
      <VideoList
        navigation={this.props.navigation}
        videos={Object.values(items)}
        onRefresh={getOfflineVideos}
      />
    );
  }
}

const mapStateToProps = ({ download }) => ({
  items: download.items
});

export default connect(mapStateToProps, { getOfflineVideos })(Downloaded)