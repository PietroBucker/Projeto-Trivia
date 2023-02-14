import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

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

  render() {
    const { players } = this.state;
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        {
          players.sort((a, b) => b.score - a.score).map((player, index) => {
            console.log('');
            return (
              <div key={ player.name }>
                <img src={ player.image } alt="" />
                <h2
                  data-testid={ `player-name-${index}` }
                >
                  {player.name}
                </h2>
                <p
                  data-testid={ `player-score-${index}` }
                >
                  {player.score}
                </p>
              </div>
            );
          })
        }
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleOnClick }
        >
          Voltar ao início
        </button>
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
  players: state.players,
  player: state.player,
});

export default connect(mapStateToProps)(Ranking);
