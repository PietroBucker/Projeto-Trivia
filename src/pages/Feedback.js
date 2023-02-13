import React, { Component } from 'react';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    // const { assertions, score } = this.props;

    return (
      <div>a</div>
    );
  }
}

mapStateToProps = (globalState) => ({
  ...globalState,
});

export default connect(mapStateToProps)(Feedback);
