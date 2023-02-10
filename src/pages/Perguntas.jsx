import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Perguntas extends Component {
  createAnswer = () => {
    const { question, handleClick, didClick } = this.props;
    const correctButton = (
      <button
        data-testid="correct-answer"
        type="button"
        key="answer"
        onClick={ handleClick }
        className={ didClick && 'correct-answer' }
      >
        {question.correct_answer}
      </button>);
    const incorrectButtons = question.incorrect_answers.map((answer, index) => (
      <button
        data-testid={ `wrong-answer-${index}` }
        type="button"
        key={ answer }
        className={ didClick && 'wrong-answer' }
        onClick={ handleClick }
      >
        {answer}
      </button>
    ));
    incorrectButtons.push(correctButton);
    const buttons = incorrectButtons;
    const randomFactor = 0.5;
    buttons.sort(() => Math.random() - randomFactor);
    return buttons;
  };

  render() {
    const { question } = this.props;
    const { category } = question;
    return (
      <div>
        <h2>Perguntas</h2>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question.question}</p>
        <div data-testid="answer-options">
          {this.createAnswer()}
        </div>

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
};

Perguntas.defaultProps = {
  question: PropTypes.shape({
    category: '',
    correct_answer: '',
    incorrect_answers: [],
    question: '',
  }),
};
const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Perguntas);
