import React from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';

import {
  clearVideos,
  searchVideos
} from '../actions';
import Colors from '../Colors';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    }
  }

  onChangeText = text => this.setState({ text });

  clearText = () => {
    const { clearVideos } = this.props;

    clearVideos();
    this.setState({ text: '' })
  }

  onEndEditing = () => {
    const { text } = this.state;
    const { searchVideos } = this.props;
    if (text.length > 0) {
      searchVideos(text);
    }
  }

  render() {
    const { text } = this.state;
    return (
      <View
        style={{
          justifyContent: 'flex-end',
          paddingVertical: 10,
          paddingHorizontal: 10,
          backgroundColor: Colors.red,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 10,
            backgroundColor: Colors.white,
            borderRadius: 6,
          }}
        >
          <Image
            source={require('../../assets/glass.png')}
            style={{
              width: 20,
              height: 20,
              tintColor: Colors.red,
            }}
          />
          <TextInput
            value={text}
            selectionColor={Colors.red}
            placeholder={'Search for videos...'}
            onChangeText={this.onChangeText}
            onEndEditing={this.onEndEditing}
            style={{
              flex: 1,
              paddingLeft: 10,
              fontSize: 16,
            }}
          />
          {text.length > 0 &&
            < TouchableWithoutFeedback
              onPress={this.clearText}
            >
              <Image
                source={require('../../assets/cross.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: Colors.red,
                }}
              />
            </TouchableWithoutFeedback>
          }
        </View>
      </View >
    );
  }
}

export default connect(null, {
  searchVideos,
  clearVideos
})(SearchBar)