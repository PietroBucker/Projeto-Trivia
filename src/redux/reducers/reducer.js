import { REJECTED, SAVE_SCORE, SAVE_USER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  token: '',
  error: '',
};

const helperGetDifficulty = ({ seconds, difficulty }) => {
  const numBase = 10;
  const magicNumber = 3;
  if (difficulty === 'easy') {
    return numBase + (seconds * 1);
  }
  if (difficulty === 'medium') {
    return numBase + (seconds * 2);
  }
  return numBase + (seconds * magicNumber);
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_USER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
      token: action.payload.token,
      score: 0,
      assertions: 0,
    };
  case REJECTED:
    return {
      ...state,
      error: action.payload.error,
    };
  case SAVE_SCORE:
    return {
      ...state,
      score: state.score + helperGetDifficulty(action.payload),
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
}

export default player;
