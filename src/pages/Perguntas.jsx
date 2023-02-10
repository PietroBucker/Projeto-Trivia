import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Perguntas extends Component {
  state = {
    didClick: false,
    disabled: false,
  };

  didIsClick = () => {
    this.setState({
      didClick: true,
      disabled: true,
    });
  };

  createAnswer = () => {
    const { question } = this.props;
    const { didClick, disabled } = this.state;
    const correctButton = (
      <button
        data-testid="correct-answer"
        type="button"
        key="answer"
        onClick={ this.didIsClick }
        className={ didClick && 'correct-answer' }
        disabled={ disabled }
      >
        {question.correct_answer}
      </button>);
    const incorrectButtons = question.incorrect_answers.map((answer, index) => (
      <button
        data-testid={ `wrong-answer-${index}` }
        type="button"
        key={ answer }
        className={ didClick && 'wrong-answer' }
        onClick={ this.didIsClick }
        disabled={ disabled }
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
    const { question, handleClick } = this.props;
    const { category } = question;
    return (
      <div>
        <h2>Perguntas</h2>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question.question}</p>
        <div data-testid="answer-options">
          {/* {this.createAnswer()} */}
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
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
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
