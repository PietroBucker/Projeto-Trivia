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
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  ...globalState,
});

export default connect(mapStateToProps)(Feedback);
