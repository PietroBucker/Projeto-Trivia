import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionGetApi } from '../redux/actions';

class Login extends Component {
  state = {
    name: '',
    gravatarEmail: '',
    disable: true,
  };

  // GetApiToken = async () => {
  //   const { history, dispatch } = this.props;
  //   const { token } = await requestApiTrivia();
  //   this.setState({ token }, () => {
  //     localStorage.setItem('token', token);
  //     dispatch(actionSaveUser(this.state));
  //     history.push('/game');
  //   });
  // };

  GetApiToken = async () => {
    const { history, dispatch } = this.props;
    await dispatch(actionGetApi(this.state));
    history.push('/game');
  };

  validate = () => {
    const { name, gravatarEmail } = this.state;
    const min = 6;
    const validateName = name.length > min;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\)?$/i;
    const validateEmail = regex.test(gravatarEmail);
    this.setState({
      disable: !(validateName && validateEmail),
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validate);
  };

  render() {
    const { name, gravatarEmail, disable } = this.state;
    const { history } = this.props;
    return (
      <section className="page-login">
        <img src="https://imgur.com/liyWz8F.png" className="App-logo" alt="logo" />
        <div className="card-login">
          <div className="inputs-login">
            <label htmlFor="input-name">
              <input
                placeholder="Qual é o seu nome?"
                className="name-login"
                id="input-name"
                name="name"
                type="text"
                value={ name }
                data-testid="input-player-name"
                onChange={ this.handleChange }
              />
            </label>

            <label htmlFor="input-email">
              <input
                placeholder="Qual é o seu e-mail do gravatar?"
                className="email-login"
                id="input-email"
                name="gravatarEmail"
                value={ gravatarEmail }
                type="email"
                data-testid="input-gravatar-email"
                onChange={ this.handleChange }
              />
            </label>

            <button
              className="btn-play bg-[#2FC18C] hover:scale-105 text-white"
              type="button"
              disabled={ disable }
              data-testid="btn-play"
              onClick={ () => {
                this.GetApiToken();
              } }
            >
              JOGAR
            </button>

            <button
              className="btn-config bg-[#35906F] hover:scale-105 text-white"
              type="button"
              data-testid="btn-settings"
              onClick={ () => history.push('/settings') }
            >
              Configuração
            </button>
          </div>
        </div>
      </section>
    );
  }
}
export default connect()(Login);

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};
