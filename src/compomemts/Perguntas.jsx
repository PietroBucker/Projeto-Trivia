import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Perguntas extends Component {
  render() {
    const { question, handleNext } = this.props;
    const { category } = question;
    return (
      <div>
        <h2>Perguntas</h2>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question.question}</p>
        <button type="button" onClick={ handleNext }>Next</button>
      </div>
    );
  }
}

Perguntas.propTypes = {
  handleNext: PropTypes.func.isRequired,
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
