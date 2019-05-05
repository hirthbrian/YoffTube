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
  showQualitySelector,
  hideQualitySelector,
} from '../actions';

class QualitySelector extends Component {
  renderItem = ({ item }) => {
    const {
      downloadVideo,
      hideQualitySelector,
    } = this.props;

    return (
      <TouchableHighlight
        onPress={() => {
          hideQualitySelector()
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
      qualityOptions,
      isQualitySelectorVisible,
      hideQualitySelector,
    } = this.props;

    console.log('qualityOptions', qualityOptions)

    return (
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        isVisible={isQualitySelectorVisible}
        onBackdropPress={hideQualitySelector}
      >
        <View>
          <FlatList
            style={{
              borderRadius: 10,
              backgroundColor: Colors.white
            }}
            bounces={false}
            data={qualityOptions}
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
  qualityOptions: settings.qualityOptions,
  isQualitySelectorVisible: settings.isQualitySelectorVisible,
});

export default connect(mapStateToProps, {
  downloadVideo,
  showQualitySelector,
  hideQualitySelector,
})(QualitySelector)