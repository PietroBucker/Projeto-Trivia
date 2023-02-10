import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Perguntas from './Perguntas';
import Header from '../compomemts/Header';
import { requestQuestion } from '../api/api';

class Game extends Component {
  state = {
    perguntas: [],
    idPergunta: 0,
    isLoaded: false,
    seconds: 30,
    didClick: false,
    respostas: [],
  };

  async componentDidMount() {
    const tokenStorage = localStorage.getItem('token');
    const { player: { token }, history } = this.props;
    const data = await requestQuestion(token);
    this.setState({ perguntas: data.results }, () => {
      if (tokenStorage !== token || data.results.length === 0) {
        history.push('/');
      }
      this.setState({ isLoaded: true });
      this.setState({ respostas: this.createAnswer() });
    });
    this.startTime();
  }

  componentDidUpdate(_prevProps, prevState) {
    const TIME_LIMIT = 1;
    if (prevState.seconds === TIME_LIMIT) {
      clearInterval(this.intervalID);
      this.handleClick();
    }
  }

  didIsClick = () => {
    this.setState({
      disabled: true,
      classOne: 'correct-answer',
      classTwo: 'wrong-answer',
    });
    console.log('clickou');
  };

  createAnswer = () => {
    const { classOne, disabled, perguntas, idPergunta, classTwo } = this.state;
    const question = perguntas[idPergunta];
    const correctButton = (
      <button
        data-testid="correct-answer"
        type="button"
        key="answer"
        onClick={ this.didIsClick }
        className={ classOne }
        disabled={ disabled }
      >
        {question.correct_answer}
      </button>);
    const incorrectButtons = question.incorrect_answers.map((answer, index) => (
      <button
        data-testid={ `wrong-answer-${index}` }
        type="button"
        key={ answer }
        className={ classTwo }
        onClick={ this.didIsClick }
        disabled={ disabled }
      >
        {answer}
      </button>));
    incorrectButtons.push(correctButton);
    const buttons = incorrectButtons;
    const randomFactor = 0.5;
    buttons.sort(() => Math.random() - randomFactor);
    return buttons;
  };

  startTime = () => {
    const ONE_SECOND = 1000;
    this.intervalID = setInterval(() => {
      this.setState((prev) => ({
        seconds: prev.seconds - 1,
      }));
    }, ONE_SECOND);
  };

  handleClick = () => {
    const { idPergunta } = this.state;
    this.setState({
      idPergunta: idPergunta + 1,
      didClick: false,
      disabled: false,
      classOne: '',
      classTwo: '',
    }, () => {
      this.setState({ respostas: this.createAnswer() });
    });
  };

  render() {
    const { perguntas, isLoaded, idPergunta, seconds, respostas } = this.state;
    const { history } = this.props;
    return (
      <div>
        <h2>Show do milhão</h2>
        {
          isLoaded ? <Perguntas
            question={ perguntas[idPergunta] }
            handleClick={ this.handleClick }
            history={ history }
            seconds={ seconds }
            answers={ respostas }
          /> : ''
        }
        <p>{seconds}</p>
        <Header />
        game
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  player: PropTypes.shape({
    token: PropTypes.string,
  }).isRequired,
};
