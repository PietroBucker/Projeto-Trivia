import React, { Component } from 'react';

export default class Login extends Component {
  state = {
    name: '',
    gravatarEmail: '',
    disable: true,
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
            type="text"
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="button"
          disabled={ disable }
          data-testid="btn-play"
        >
          Play
        </button>

        <button type="button">Configuração</button>
      </section>
    );
  }
}
