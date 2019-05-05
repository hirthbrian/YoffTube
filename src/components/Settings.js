import React, { Component } from 'react';
import PropTypes from "prop-types";
import {
  View,
  Text,
  FlatList,
  Image,
  Switch,
  TextInput,
  TouchableHighlight
} from 'react-native';

import { Constants } from 'expo';

import { connect } from 'react-redux';

import Modal from "react-native-modal";
import Colors from '../Colors';

import {
  setWifiSetting,
  setQualitySetting,
  searchChannel,
} from '../actions';
import SearchBar from './SearchBar';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
    }
  }

  renderItem = ({ item }) => {
    return (
      <TouchableHighlight
        onPress={() => { }}
      >
        <View
          style={{
            flex: 1,
            // height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 10,
            paddingHorizontal: 15,
            backgroundColor: Colors.white,
          }}
        >
          <Image
            source={{ uri: item.thumbnail }}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
            }}
          />
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              fontSize: 16,
              paddingLeft: 15,
            }}
          >
            {item.name}
          </Text>
          {/* <Switch
          value={item.value}
          onValueChange={item.action}
        /> */}
        </View>
      </TouchableHighlight>
    );
  }

  renderFooter = () => {
    return (
      <TouchableHighlight
        onPress={() => console.log('Show About Page')}
      >
        <View
          style={{
            flex: 1,
            paddingVertical: 10,
            paddingHorizontal: 15,
            justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: Colors.white,
            borderTopWidth: 1,
            borderTopColor: Colors.grey
          }}
        >
          <Text>
            About
          </Text>
          <Text>
            {Constants.manifest.version}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: Colors.grey
        }}
      />
    );
  }

  render() {
    const {
      isVisible,
      onPressOutside,
      setWifiSetting,
      isInHighQuality,
      setQualitySetting,
      isWifiOnly,
    } = this.props;

    const items = [
      {
        title: 'Wifi Only',
        value: isWifiOnly,
        action: () => setWifiSetting(!isWifiOnly)
      },
      {
        title: 'Download in HD',
        value: isInHighQuality,
        action: () => setQualitySetting(!isInHighQuality)
      },
    ]

    return (
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        isVisible={isVisible}
        onBackdropPress={onPressOutside}
      >
        <View>
          <View
            style={{
              padding: 10,
              backgroundColor: Colors.red,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            <View
              style={{
                borderRadius: 6,
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: Colors.white,
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
                autoFocus
                value={this.state.searchText}
                autoCorrect={false}
                selectionColor={Colors.red}
                placeholder={'Search for your channel'}
                onChangeText={text => this.setState({ searchText: text })}
                onEndEditing={() => this.props.searchChannel(this.state.searchText)}
                style={{
                  flex: 1,
                  paddingLeft: 10,
                  fontSize: 16,
                }}
              />
            </View>
          </View>
          <FlatList
            style={{
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              backgroundColor: Colors.white,
            }}
            // bounces={false}
            data={this.props.channels}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
            // ListFooterComponent={this.renderFooter}
            keyExtractor={item => { return item.id }}
          />
        </View>
      </Modal>
    );
  }
}

Settings.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ settings, videos }) => ({
  channels: videos.channels,
  isInHighQuality: settings.isInHighQuality,
  isWifiOnly: settings.isWifiOnly,
});

export default connect(mapStateToProps, {
  searchChannel,
  setWifiSetting,
  setQualitySetting,
})(Settings)