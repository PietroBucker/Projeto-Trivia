import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

const TEST_STATE = {
  players: [
    {
      name: 'Pedrovaldo',
      score: 10,
      image: 'https://picsum.photos/200/200',
    },
    {
      name: 'Genoveva',
      score: 12,
      image: 'https://picsum.photos/200/200',
    },
  ],
};

class Ranking extends Component {
  state = {
    players: [],
  };

  componentDidMount() {
    const { players, player } = this.props;
    players.push(player);
    this.setState({ players });
    localStorage.setItem('ranking', players.map((e) => e.name).indexOf(player.name) + 1);
  }

  handleOnClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  fotoGravatar = (email) => {
    const hast = md5(email).toString();
    const src = `https://www.gravatar.com/avatar/${hast}`;
    return src;
  };

  render() {
    const { players } = this.state;
    return (
      <div className="page-ranking">
        <div className="card-ranking">
          <div className="inputs-ranking">
            <h2 className="title-rankong" data-testid="ranking-title">Ranking</h2>
            {
              players.sort((a, b) => b.score - a.score).map((player, index) => (
                <div className="card-person" key={ player.name }>
                  <img
                    className="foto-ranking"
                    src={ this.fotoGravatar(player.gravatarEmail) }
                    alt=""
                  />
                  <h2
                    data-testid={ `player-name-${index}` }
                  >
                    {player.name}
                  </h2>
                  <div className="card-point">
                    <img src="https://i.imgur.com/1f09Zd2.png" alt="" className="" />
                    <p
                      data-testid={ `player-score-${index}` }
                    >
                      {player.score}
                      {' '}
                      pontos
                    </p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className="card-btn">
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.handleOnClick }
            className="btn-ranking bg-[#2FC18C] hover:scale-105 text-white"
          >
            JOGAR NOVAMENTE
          </button>
        </div>
      </div>

    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  players: PropTypes.arrayOf(PropTypes.shape({})),
  player: PropTypes.shape({
    name: PropTypes.string,
  }),
};

Ranking.defaultProps = {
  players: [],
  player: TEST_STATE.players[0],
};
// Esperando o nome do reducer para essa page.
const mapStateToProps = (state) => ({
  // players: state.players,
  player: state.player,
});

export default connect(mapStateToProps)(Ranking);
