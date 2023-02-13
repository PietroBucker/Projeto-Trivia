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
        <h2>Ranking</h2>
        {
          players.map((player, index) => {
            console.log('');
            return (
              <div>
                <h2
                  data-testid={ `player-name-${index}` }
                  key={ player.name }
                >
                  {player.name}

                </h2>
                <p
                  data-testid={ `player-score-${index}` }
                  key={ player.name }
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

// Esperando o nome do reducer para essa page.
const mapStateToProps = (state) => ({
  players: state.players,
});

export default connect()(Ranking);
