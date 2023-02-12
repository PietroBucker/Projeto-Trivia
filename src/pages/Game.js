import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Perguntas from '../compomemts/Perguntas';
import Header from '../compomemts/Header';
import { requestQuestion } from '../api/api';

class Game extends Component {
  state = {
    perguntas: [],
    idPergunta: 0,
    isLoaded: false,
    seconds: 30,
    respostas: [],
    disabled: false,
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
      const randomFactor = 0.5;
      if (data.results[0].incorrect_answers[0] === 'False'
          || data.results[0].incorrect_answers[0] === 'True'
      ) {
        const resposta0 = [data.results[0].incorrect_answers[0],
          data.results[0].correct_answer];
        resposta0.sort(() => Math.random() - randomFactor);
        this.setState({ respostas: resposta0 });
        this.setState({ isLoaded: true });
        this.startTime();
        return;
      }
      const resposta0 = data.results[0].incorrect_answers;
      resposta0.push(data.results[0].correct_answer);

      resposta0.sort(() => Math.random() - randomFactor);
      this.setState({ respostas: resposta0 });
      this.setState({ isLoaded: true });
      this.startTime();
    });
  }

  componentDidUpdate(_prevProps, prevState) {
    const TIME_LIMIT = 1;
    if (prevState.seconds === TIME_LIMIT) {
      this.turnOnDisabled();
      clearInterval(this.intervalID);
    }
  }

  startTime = () => {
    const ONE_SECOND = 1000;
    this.intervalID = setInterval(() => {
      this.setState((prev) => ({
        seconds: prev.seconds - 1,
      }));
    }, ONE_SECOND);
  };

  handleNext = () => {
    const { idPergunta } = this.state;
    this.setState({
      idPergunta: idPergunta + 1,
    }, () => {
      this.updateNextAnswer();
    });
  };

  updateNextAnswer = () => {
    const { perguntas, idPergunta } = this.state;
    const resposta = perguntas[idPergunta].incorrect_answers;
    resposta.push(perguntas[idPergunta].correct_answer);

    const randomFactor = 0.5;
    resposta.sort(() => Math.random() - randomFactor);
    this.setState({ respostas: resposta });
  };

  turnOnDisabled = () => {
    this.setState({
      disabled: true,
    });
  };

  handleAnswer = () => {
    this.turnOnDisabled();
  };

  render() {
    const { perguntas, isLoaded, idPergunta, seconds,
      respostas, disabled } = this.state;
    const { history } = this.props;
    return (
      <div>
        <h2>Show do milhão</h2>
        {
          isLoaded ? <Perguntas
            question={ perguntas[idPergunta] }
            handleNext={ this.handleNext }
            history={ history }
          /> : ''
        }
        <div data-testid="answer-options">
          { respostas.map((resposta, index) => {
            if (resposta === perguntas[idPergunta].correct_answer) {
              return (
                <button
                  data-testid="correct-answer"
                  onClick={ this.handleAnswer }
                  key={ resposta }
                  className={ disabled ? 'correct-answer' : undefined }
                  disabled={ disabled }
                >
                  { resposta }
                </button>
              );
            }
            const button = (
              <button
                data-testid={ `wrong-answer-${index}` }
                className={ disabled ? 'wrong-answer' : '' }
                onClick={ this.handleAnswer }
                key={ resposta }
                disabled={ disabled }
              >
                { resposta }
              </button>);
            return button;
          })}
        </div>
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
