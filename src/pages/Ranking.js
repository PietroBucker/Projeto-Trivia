import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  state = {
    players: [],
  };

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
          players.map((player, index) => {
            console.log('');
            return (
              <div key={ player.name }>
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
};

// Esperando o nome do reducer para essa page.
// const mapStateToProps = (state) => ({
//   players: state.players,
// });

export default connect()(Ranking);
