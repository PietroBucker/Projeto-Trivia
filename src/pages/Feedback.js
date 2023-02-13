import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    const asserts = 3;
    return (
      <div>
        { assertions >= asserts
          ? <span data-testid="feedback-text">Well Done!</span>
          : <span data-testid="feedback-text">Could be better...</span> }
        <span data-testid="feedback-total-score">
          Sua pontuação foi:
          { score }
        </span>
        <span
          data-testid="feedback-total-question"
        >
          {`Voce acertou ${assertions} preguntas`}
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
  ...globalState,
});

export default connect(mapStateToProps)(Feedback);
