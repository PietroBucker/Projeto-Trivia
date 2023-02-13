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
          data-testid="feedback-total-score"
        >
          {`Voce acertou ${assertions} preguntas`}
        </span>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ () => {
            const { history } = this.props;
            history.push('/');
          } }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

Feedback.defaultProps = {
  assertions: 0,
  score: 0,
};

const mapStateToProps = (globalState) => ({
  ...globalState,
});

export default connect(mapStateToProps)(Feedback);
