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
    score: 0,
    // IdInterval: '',
    // respostas: [],
    // enable: true,
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

  startTime = () => {
    const ONE_SECOND = 1000;
    this.intervalID = setInterval(() => {
      this.setState((prev) => ({
        seconds: prev.seconds - 1,
      }));
    }, ONE_SECOND);
  };

  // countDown = (sec) => {
  //   if(sec < 1) {
  //     clearTimeout(timer);
  //   };
  //   sec - sec - 1;
  //   let timer = setTimeout(this.countDown(sec),1000);
  // };

  handleClick = () => {
    const { idPergunta } = this.state;
    this.setState({
      idPergunta: idPergunta + 1,
    });
    // this.startTime();
  };

  render() {
    const { perguntas, isLoaded, idPergunta, seconds } = this.state;
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
            // answer={}
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
