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
    didClick: false,
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
  }

  handleClick = () => {
    // const { idPergunta } = this.state;
    this.setState({
      // idPergunta: idPergunta + 1,
      didClick: true,
    });
  };

  render() {
    const { perguntas, isLoaded, idPergunta, didClick } = this.state;
    const { history } = this.props;
    return (
      <div>
        <h2>Show do milhão</h2>
        {
          isLoaded ? <Perguntas
            question={ perguntas[idPergunta] }
            handleClick={ this.handleClick }
            history={ history }
            didClick={ didClick }
          /> : ''
        }
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
