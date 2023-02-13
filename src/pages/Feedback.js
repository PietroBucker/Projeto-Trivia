import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../compomemts/Header';

class Feedback extends Component {
  render() {
    const { assertions, score, history } = this.props;
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
        <button
          type="button"
          onClick={ () => history.push('/ranking') }
          data-testid="btn-ranking"
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  score: PropTypes.number,
};

Feedback.defaultProps = {
  assertions: 0,
  score: 0,
  history: PropTypes.shape({
    push: () => {},
  }),
};

const mapStateToProps = (globalState) => ({
  ...globalState.player,
});

export default connect(mapStateToProps)(Feedback);
