import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionSaveUser } from '../redux/actions';
import { requestApiTrivia } from '../api/api';

class Login extends Component {
  state = {
    name: '',
    gravatarEmail: '',
    disable: true,
    token: '',
  };

  GetApiToken = async () => {
    const { history, dispatch } = this.props;
    const { token } = await requestApiTrivia();
    this.setState({ token }, () => {
      localStorage.setItem('token', token);
      dispatch(actionSaveUser(this.state));
      history.push('/game');
    });
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
      <section>
        <label htmlFor="input-name">
          Nome
          <input
            id="input-name"
            name="name"
            type="text"
            value={ name }
            data-testid="input-player-name"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="input-email">
          Email
          <input
            id="input-email"
            name="gravatarEmail"
            value={ gravatarEmail }
            type="email"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="button"
          disabled={ disable }
          data-testid="btn-play"
          onClick={ () => {
            this.GetApiToken();
          } }
        >
          Play
        </button>

        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Configuração
        </button>

      </section>
    );
  }
}
export default connect()(Login);

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};
