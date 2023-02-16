import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/Perguntas.css';

class Perguntas extends Component {
  render() {
    const { question, seconds } = this.props;
    const { category } = question;
    return (
      <div
        className="w-3/6 pb-4
        ml-12 drop-shadow-2xl
        bg-slate-50
        rounded-2xl
        min-h-[300px]
        block "
      >
        <p
          data-testid="question-category"
          className="pt-2 pb-2 m-auto w-3/6
          inset-x-0 -top-2 rounded-2xl
          absolute text-center drop-shadow-lg
          bg-[#00D5E2]
          text-white
          "
        >
          {category}

        </p>
        <p
          data-testid="question-text"
          className=" absolute
          p-8
          top-20
          inset-x-0
          text-center"
        >
          {question.question}

        </p>
        <div
          className="text-orange-500
          flex flex-row justify-items-stretch
          justify-center justify-self-end absolute
          inset-x-0 bottom-0 animate-bounce
          t-8
          "
        >
          <p className="mr-2 text-center text-[20px]">
            Tempo:
          </p>
          <p className="text-center text-[20px]">
            {seconds}
          </p>
        </div>
      </div>
    );
  }
}

Perguntas.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    question: PropTypes.string,
  }),
  seconds: PropTypes.number.isRequired,
};

Perguntas.defaultProps = {
  question: {
    category: '',
    correct_answer: '',
    incorrect_answers: [],
    question: '',
  },
};
const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Perguntas);
