import React from 'react';
import {
  View,
  TextInput,
  Image,
} from 'react-native';
import { connect } from 'react-redux';

import {
  searchVideos
} from './actions';
import Colors from './Colors';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    }
  }

  onChangeText = text => this.setState({ text });

  onEndEditing = () => {
    const { text } = this.state;
    const { searchVideos } = this.props;
    searchVideos(text);
  }

  render() {
    const { text } = this.state;
    return (
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}
      >
        <View
          style={{
            borderRadius: 4,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 15,
            backgroundColor: Colors.blue,
          }}
        >
          <Image
            source={require('../assets/glass.png')}
            style={{
              width: 20,
              height: 20,
              tintColor: Colors.white,
              marginRight: 15,
            }}
          />
          <TextInput
            value={text}
            selectionColor={Colors.white}
            placeholder={'Search'}
            onChangeText={this.onChangeText}
            onEndEditing={this.onEndEditing}
            placeholderTextColor={Colors.lightBlue}
            style={{
              flex: 1,
              color: Colors.white,
              fontSize: 18,
            }}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ videos }) => ({
  videos: videos.videos
});

export default connect(mapStateToProps, { searchVideos })(SearchBar)