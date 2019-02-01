import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
  View,
  Image,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  AsyncStorage,
  Alert,
} from 'react-native';
import {
  FileSystem,
  Video,
} from 'expo';
import { Bar } from 'react-native-progress';

export default class VideoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: null,
      progress: 0,
    };
  }

  componentWillMount() {
    const { id } = this.props;

    AsyncStorage.getItem(`@YoffTube:${id}`)
      .then(video => {
        this.setState({ uri: JSON.parse(video).uri })
      })
      .catch(error => {
        console.log(error)
      })
  }

  onPress = () => {
    const { id, title, thumbnail } = this.props;

    console.log('https://you-link.herokuapp.com/?url=https://www.youtube.com/watch?v=' + id)
    fetch('https://you-link.herokuapp.com/?url=https://www.youtube.com/watch?v=' + id)
      .then((response) => response.json())
      .then((responseJson) => {
        const videoArray = responseJson.filter(item => item['type'].split(';')[0] === 'video/mp4');

        if (videoArray[0]) {
          const videoUrl = videoArray[0].url;
          const downloadResumable = FileSystem.createDownloadResumable(
            videoUrl,
            FileSystem.documentDirectory + `${id}.mp4`,
            {},
            ({ totalBytesWritten, totalBytesExpectedToWrite }) => {
              this.setState({ progress: totalBytesWritten / totalBytesExpectedToWrite })
            }
          );

          downloadResumable.downloadAsync().then((data) => {
            // console.log(data.uri)
            AsyncStorage.setItem(`@YoffTube:${id}`, JSON.stringify({
              id,
              title,
              thumbnail,
              uri: data.uri,
            }))
              .then(item => {
                console.log(item)
                this.setState({ uri: item.uri })
                this.forceUpdate();
              })
          })
        }
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(
          'Error',
          'The video you are trying to download is not available',
        )
      });
  }

  renderFooter = () => {
    const { title } = this.props;

    return (
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}
      >
        <Text>
          {title}
        </Text>
      </View>
    );
  }

  renderThumbnail = () => {
    const { thumbnail } = this.props;
    const { uri } = this.state;
    const { width } = Dimensions.get('window');

    return (
      <View
        style={{
          opacity: uri ? 1 : 0.5,
          width: width,
          height: ((width * 180) / 320),
        }}
      >
        {uri ?
          <Video
            useNativeControls
            source={{ uri: uri }}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
          />
          :
          <Image
            source={{ uri: thumbnail }}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
          />
        }
      </View>
    );
  }

  render() {
    const { progress, uri } = this.state;
    const { width } = Dimensions.get('window');

    return (
      <TouchableWithoutFeedback
        disabled={uri !== null}
        onPress={this.onPress}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          {this.renderThumbnail()}
          <Bar
            borderWidth={0}
            color={'#551A8B'}
            borderRadius={0}
            progress={progress}
            width={width}
          />
          {this.renderFooter()}
        </View>
      </TouchableWithoutFeedback>

    );
  }
}

VideoItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};
VideoItem.defaultProps = {
};
