import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Perguntas extends Component {
  render() {
    const { question, handleClick } = this.props;
    const { category } = question;
    return (
      <div>
        <h2>Perguntas</h2>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question.question}</p>
        <div data-testid="answer-options">
          {/* {answers} */}
        </div>
        <button type="button" onClick={ handleClick }>Next</button>
      </div>
    );
  }
}

Perguntas.propTypes = {
  handleClick: PropTypes.func.isRequired,
  question: PropTypes.shape({
    category: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.shape({})),
    question: PropTypes.string,
  }),
  seconds: PropTypes.number,
  didClick: PropTypes.bool.isRequired,
};

Perguntas.defaultProps = {
  question: PropTypes.shape({
    category: '',
    correct_answer: '',
    incorrect_answers: [],
    question: '',
  }),
  seconds: 0,
};
const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Perguntas);
