import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../compomemts/Header';

class Feedback extends Component {
  buttonStyle = `w-[234px] h-[50px] ml-3 mr-2 rounded-[8px]
   hover:scale-105 shadow-lg shadow-teal-500/50 relative -left-[4px]`;

  frameStyleError = 'border-rose-500 border-4 shadow-lg shadow-rose-500/50';

  frameStyleRight = 'border-teal-500 border-4 shadow-lg shadow-teal-500/50';

  render() {
    const { assertions, score, history, gravatarEmail } = this.props;
    const asserts = 3;
    const hast = md5(gravatarEmail).toString();
    const src = `https://www.gravatar.com/avatar/${hast}`;
    console.log(src);
    return (
      <section className="grid grid-col-1 grid-rows-4 justify-items-center">
        <Header />
        <div
          className="bg-white w-[500px] h-[300px] absolute top-[300px]
         grid grid-cols-2 grid-rows-5 rounded-[30px] place-self-center"
        >
          <img
            src={ src }
            data-testid="header-profile-picture"
            className={ `absolute w-[150px] h-[150px] rounded-full left-auto
             col-span-2 place-self-center -top-[80px]
             ${assertions >= asserts ? this.frameStyleRight : this.frameStyleError}` }
            alt="foto"
          />
          <div
            className="feedbackbox col-span-full left-auto mt-24 text-stone-600
          font-sans"
          >
            { assertions >= asserts
              ? (
                <span data-testid="feedback-text" className="text-teal-300">
                  Well Done!
                </span>
              )
              : (
                <span data-testid="feedback-text" className="text-orange-600">
                  Could be better...
                </span>
              ) }
            <span
              data-testid="feedback-total-score"
              className="text-[18px] flex flex-row relative -bottom-[16px]"
            >
              <p className="pr-1">Um total de</p>
              { score }
              <p className="pl-1"> pontos</p>
            </span>
            <span
              className="text-[18px] flex flex-row"
              data-testid="feedback-total-question"
            >
              <p className="pr-1">Você acertou</p>
              {assertions}
              <p className="pl-1">questões</p>
            </span>
          </div>
        </div>
        <div
          className="grid grid-cols-2 row-col-full relative
         top-[250px] place-self-center col-span-1"
        >
          <button
            data-testid="btn-play-again"
            type="button"
            className={ ` ${this.buttonStyle} bg-green-500 text-white` }
            onClick={ () => {
              history.push('/');
            } }
          >
            Play Again
          </button>
          <button
            data-testid="btn-ranking"
            type="button"
            className={ ` ${this.buttonStyle} bg-teal-500 text-white` }
            onClick={ () => {
              history.push('/ranking');
            } }
          >
            Ranking
          </button>
        </div>
      </section>
    );
  }
}

Feedback.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  assertions: PropTypes.number,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  score: PropTypes.number,
};

Feedback.defaultProps = {
  assertions: 0,
  score: 0,
  history: {},
};

const mapStateToProps = (globalState) => ({
  ...globalState.player,
});

export default connect(mapStateToProps)(Feedback);
