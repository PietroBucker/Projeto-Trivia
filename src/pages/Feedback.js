import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../compomemts/Header';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    console.log(score);
    console.log(assertions);
    const asserts = 3;
    return (
      <div>
        <Header />
        { assertions >= asserts
          ? <span data-testid="feedback-text">Well Done!</span>
          : <span data-testid="feedback-text">Could be better...</span> }
        <span data-testid="feedback-total-score">
          { score }
        </span>
        <span
          data-testid="feedback-total-question"
        >
          {assertions}
        </span>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
};

Feedback.defaultProps = {
  assertions: 0,
  score: 0,
};

const mapStateToProps = (globalState) => ({
  ...globalState.player,
});

export default connect(mapStateToProps)(Feedback);
