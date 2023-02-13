import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import propTypes from 'prop-types';

class Header extends Component {
  render() {
    const { gravatarEmail, name } = this.props;
    const hast = md5(gravatarEmail).toString();
    const src = `https://www.gravatar.com/avatar/${hast}`;
    console.log();
    return (
      <header>
        <img
          src={ src }
          data-testid="header-profile-picture"
          alt="foto"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  ...state.player,
});
Header.propTypes = {
  gravatarEmail: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
};
export default connect(mapStateToProps)(Header);
