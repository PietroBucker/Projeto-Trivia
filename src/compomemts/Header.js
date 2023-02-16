import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import propTypes from 'prop-types';

class Header extends Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
    const hast = md5(gravatarEmail).toString();
    const src = `https://www.gravatar.com/avatar/${hast}`;
    return (
      <header className="grid grid-cols-12 grid-rows-1 bg-white h-32 mb-32 w-screen">
        <img
          src="https://imgur.com/liyWz8F.png"
          className="col-span-7 place-self-center mt-32 z-10 drop-shadow-lg h-56"
          alt="logo"
        />
        <div className="col-span-5  grid grid-cols-2">
          <div className="col-span-1 flex flex-row">
            <img
              src={ src }
              data-testid="header-profile-picture"
              className="rounded-full relative my-auto "
              alt="foto"
            />
            <p
              className="text-xl my-auto ml-6"
              data-testid="header-player-name"
              // className="my-auto ml-5"
            >
              {name}
            </p>
          </div>
          <div className="flex flex-row">
            <img src="https://i.imgur.com/1f09Zd2.png" alt="" className="h-8 my-auto" />
            <p
              className="my-auto ml-6 text-xl"
              data-testid="header-score"
            >
              { score }
            </p>
          </div>
        </div>
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
  score: propTypes.number.isRequired,
};
export default connect(mapStateToProps)(Header);
