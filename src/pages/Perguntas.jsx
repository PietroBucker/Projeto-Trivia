import React, { Component } from 'react';
import { connect } from 'react-redux';

class Perguntas extends Component {
  componentDidMount() {
    const { player: { tokenPlayer }, history } = this.props;
    const token = localStorage.getItem('token');
    if (token !== tokenPlayer) {
      history.push('/');
    }
  }

  render() {
    const { id } = this.state;
    // const respostaErrada = <p data-testid={ `wrong-answer-${index}` } />;
    // const respostaErrada = <p data-testid={ `wrong-answer-${index}` } />;
    return (
      <div>
        <h2>Perguntas</h2>
        <p data-testid="question-category" />
        <p data-testid="question-text" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Perguntas);
