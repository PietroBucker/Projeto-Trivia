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
    indexResposta: 0,
  };

  async componentDidMount() {
    const tokenStorage = localStorage.getItem('token');
    const { player: { token }, history } = this.props;
    const data = await requestQuestion(token);
    this.setState({ perguntas: data.results }, () => {
      if (tokenStorage !== token || data.results.length === 0) {
        history.push('/');
        return;
      }

      this.setState({ respostas: [] });
      // organiza os respects
      if (data.results[0].incorrect_answers[0] === 'False'
          || data.results[0].incorrect_answers[0] === 'True'
      ) {
        const resposta0 = [data.results[0].incorrect_answers[0],
          data.results[0].correct_answer];
        const randomFactor = 0.5;
        resposta0.sort((a, b) => Math.random() - randomFactor);
        this.setState({ respostas: resposta0 });
        this.setState({ isLoaded: true });
        this.startTime();
        return;
      }
      const resposta0 = data.results[0].incorrect_answers;
      resposta0.push(data.results[0].correct_answer);

      const randomFactor = 0.5;
      resposta0.sort(() => Math.random() - randomFactor);
      this.setState({ respostas: resposta0 });
      this.setState({ isLoaded: true });
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

  shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  createCorrectButton = () => {
    const correctButton = (
      <button
        data-testid="correct-answer"
        type="button"
        key="answer"
        onClick={ this.didIsClick }
        className="correct-answer"
        disabled={ disabled }
      >
        {question.correct_answer}
      </button>);
    return correctButton;
  };

  createIncorrectButton = (incorrectAnswers) => {
    const incorrectButtons = incorrectAnswers.map((answer, index) => (
      <button
        data-testid={ `wrong-answer-${index}` }
        type="button"
        key={ answer }
        className="wrong-answer"
        onClick={ this.didIsClick }
        disabled={ disabled }
      >
        {answer}
      </button>));
    return incorrectButtons;
  };

  // sortButtons = (button) => {
  //   const buttons = incorrectButtons;
  //   const randomFactor = 0.5;
  //   buttons.sort(() => Math.random() - randomFactor);
  //   return buttons;
  // };

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
      // didClick: false,
      disabled: false,
    }, () => {
      this.setState({ respostas: this.createAnswer() });
    });
  };

  render() {
    const { perguntas, isLoaded, idPergunta, seconds,
      respostas, indexResposta } = this.state;
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
            // answers={ respostas }
          /> : ''
        }
        { respostas.map((resposta, index) => {
          if (resposta === perguntas[idPergunta].correct_answer) {
            return (
              <button
                data-testid="correct-answer"
                key={ resposta }
                className="correct-answer"
              >
                { resposta }
              </button>
            );
          }
          const button = (
            <button
              data-testid={ `wrong-answer-${index}` }
              className="wrong-answer"
              key={ resposta }
            >
              { resposta }
            </button>);
          // this.setState({ indexResposta: indexResposta + 1 });
          return button;
        })}
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
