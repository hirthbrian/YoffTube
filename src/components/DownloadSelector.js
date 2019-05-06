import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableHighlight,
} from 'react-native';

import { connect } from 'react-redux';

import Modal from "react-native-modal";
import Colors from '../Colors';

import {
  downloadVideo,
  showDownloadSelector,
  hideDownloadSelector,
} from '../actions';

class DownloadSelector extends Component {
  renderItem = ({ item }) => {
    const {
      downloadVideo,
      hideDownloadSelector,
    } = this.props;

    return (
      <TouchableHighlight
        onPress={() => {
          hideDownloadSelector()
          downloadVideo(item.url, item.id)
        }}
      >
        <View
          style={{
            flex: 1,
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 10,
            paddingHorizontal: 15,
            backgroundColor: Colors.white
          }}
        >
          <Text
            style={{
              flex: 1,
              fontSize: 16,
            }}
          >
            {item.title}
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
      downloadOptions,
      isDownloadSelectorVisible,
      hideDownloadSelector,
    } = this.props;

    return (
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        isVisible={isDownloadSelectorVisible}
        onBackdropPress={hideDownloadSelector}
      >
        <View>
          <FlatList
            style={{
              borderRadius: 10,
              backgroundColor: Colors.white
            }}
            bounces={false}
            data={downloadOptions}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={item => { return item.title }}
          />
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = ({ settings }) => ({
  downloadOptions: settings.downloadOptions,
  isDownloadSelectorVisible: settings.isDownloadSelectorVisible,
});

export default connect(mapStateToProps, {
  downloadVideo,
  showDownloadSelector,
  hideDownloadSelector,
})(DownloadSelector)