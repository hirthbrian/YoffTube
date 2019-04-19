import React from 'react';
import { connect } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';

class ErrorHandler extends React.Component {
  componentDidUpdate(prevProps) {
    const { type, message } = this.props;
    if (prevProps.message !== message)
      this.dropdown.alertWithType(type, '', message);
  }

  render() {
    return (
      <DropdownAlert
        ref={ref => this.dropdown = ref}
        updateStatusBar={false}
        renderImage={() => { }}
      />
    );
  }
}

const mapStateToProps = ({ errorHandler }) => ({
  type: errorHandler.type,
  message: errorHandler.message
});

export default connect(mapStateToProps)(ErrorHandler)