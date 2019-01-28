import React from 'react';
import PropTypes from "prop-types";
import {
  View,
  Image,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  AsyncStorage,
} from 'react-native';
import {
  FileSystem,
} from 'expo';
import { Bar } from 'react-native-progress';


export default class VideoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      video: null,
      progress: 0,
    };
  }

  componentWillMount() {
    const { id } = this.props;
    AsyncStorage.getItem(`@YoffTube:${id}`).then(video => { this.setState({ video }) })
  }

  onPress = () => {
    const { id } = this.props;

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
              // console.log(totalBytesWritten / totalBytesExpectedToWrite);
              this.setState({ progress: totalBytesWritten / totalBytesExpectedToWrite })
            }
          );

          downloadResumable.downloadAsync().then((data) => {
            console.log(data);
            AsyncStorage.setItem(`@YoffTube:${id}`, data.uri).then(video => { this.setState({ video }) })
          })
        }
      })
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
    const { video } = this.state;
    const { width } = Dimensions.get('window');

    console.log(video);

    return (
      <View
        style={{
          opacity: video ? 1 : 0.5,
          width: width,
          height: ((width * 180) / 320),
        }}
      >
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
      </View>
    );
  }

  render() {
    const { progress } = this.state;
    const { width } = Dimensions.get('window');

    return (
      <TouchableWithoutFeedback
        onPress={this.onPress}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          {/* <Video
            useNativeControls
            source={{ uri: video }}
            style={{
              width: width,
              height: (width * 180) / 320,
            }}
          /> */}
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
