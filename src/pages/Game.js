import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Perguntas from '../compomemts/Perguntas';
import { requestQuestion } from '../api/api';
import { actionSaveScore } from '../redux/actions';
import Header from '../compomemts/Header';

class Game extends Component {
  state = {
    perguntas: [],
    idPergunta: 0,
    isLoaded: false,
    seconds: 30,
    respostas: [],
    disabled: false,
    isFirstQuestion: true,
  };

  buttonStyleStandard = `mt-2 mb-1 h-12 ml-16 drop-shadow-xl rounded-[32px] bg-white
   focus:ring hover:scale-105 ease-in shadow-lg hover:shadow-blue-500/50 `;

  buttonNextStyle = `ml-16 h-12 bg-[#2FC18C] text-white mt-12 hover:scale-105
  hover:drop-shadow-lg ease-in hover:bg-green-600 `;

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

      let resposta0 = [];
      if (data.results[0].incorrect_answers[0] === 'False'
          || data.results[0].incorrect_answers[0] === 'True'
      ) {
        resposta0 = [data.results[0].incorrect_answers[0]];
      } else {
        resposta0 = data.results[0].incorrect_answers;
        // resposta0.push(data.results[0].correct_answer);
      }

      if (Array.isArray(data.results[0].correct_answer)) {
        resposta0.push(data.results[0].correct_answer[0]);
      } else {
        resposta0.push(data.results[0].correct_answer);
      }

      const randomFactor = 0.5;
      resposta0.sort(() => Math.random() - randomFactor);
      this.setState({ respostas: resposta0 });
      this.setState({ isLoaded: true });
      this.startTime();
    });
  }

  componentDidUpdate(_prevProps, prevState) {
    const TIME_LIMIT = 1;
    if (prevState.seconds === TIME_LIMIT) {
      this.setState({ disabled: true, isFirstQuestion: false });
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
      disabled: false,
      respostas: [],
    }, () => {
      this.updateNextAnswer();
      this.setState({ seconds: 30 });
      this.startTime();
      const { history } = this.props;
      const n = 4;
      if (idPergunta === n) {
        history.push('/feedback');
      }
    });
  };

  updateNextAnswer = () => {
    const { perguntas, idPergunta } = this.state;

    this.setState({ respostas: [] }, () => {
      let resposta = [];
      // resposta = perguntas[idPergunta].incorrect_answers;
      resposta = perguntas[idPergunta].incorrect_answers
        .filter((respost) => respost !== perguntas[idPergunta]);
      if (Array.isArray(perguntas[idPergunta].correct_answer)) {
        resposta.push(perguntas[idPergunta].correct_answer[0]);
      } else {
        resposta.push(perguntas[idPergunta].correct_answer);
      }

      const randomFactor = 0.5;
      resposta.sort(() => Math.random() - randomFactor);
      this.setState({ respostas: resposta,
      });
    });
  };

  sendScoreToGlobalState = (resposta) => {
    const { seconds, idPergunta, perguntas } = this.state;
    const { dispatch } = this.props;
    const { difficulty } = perguntas[idPergunta];
    if (resposta === 'correct-answer') {
      dispatch(actionSaveScore({ seconds, difficulty }));
    }
  };

  handleAnswer = ({ target }) => {
    this.setState({ disabled: true,
      isFirstQuestion: false,
    }, () => {
      clearInterval(this.intervalID);
      this.sendScoreToGlobalState(target.name);
    });
  };

  render() {
    const { perguntas, isLoaded, idPergunta, seconds,
      respostas, disabled, isFirstQuestion } = this.state;
    const { history } = this.props;
    return (
      <div className="flex flex-col ">
        <Header />
        <div className="flex flex-row h-min-[100px] items-center">
          {
            isLoaded ? <Perguntas
              question={ perguntas[idPergunta] }
              handleNext={ this.handleNext }
              history={ history }
              seconds={ seconds }
            /> : ''
          }
          <div
            data-testid="answer-options"
            className="flex flex-col grow
           justify-center mr-12"
          >
            { respostas.map((resposta, index) => {
              if (resposta === perguntas[idPergunta].correct_answer) {
                return (
                  <button
                    data-testid="correct-answer"
                    name="correct-answer"
                    onClick={ this.handleAnswer }
                    key={ resposta }
                    className={ `${disabled ? 'correct-answer' : ''} 
                  ${this.buttonStyleStandard}` }
                    disabled={ disabled }
                  >
                    { resposta }
                  </button>
                );
              }
              const button = (
                <button
                  data-testid={ `wrong-answer-${index}` }
                  className={ ` ${disabled ? 'wrong-answer' : ''} 
                ${this.buttonStyleStandard}` }
                  name="wrong-answer"
                  onClick={ this.handleAnswer }
                  key={ resposta }
                  disabled={ disabled }
                >
                  { resposta }
                </button>);
              return button;
            })}
            { !isFirstQuestion
              ? (
                <button
                  className={ this.buttonNextStyle }
                  type="button"
                  onClick={ this.handleNext }
                  data-testid="btn-next"
                >
                  Next
                </button>)
              : '' }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Game);

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  player: PropTypes.shape({
    token: PropTypes.string,
  }).isRequired,
};
