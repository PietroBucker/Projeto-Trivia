import { REJECTED, SAVE_USER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
  token: '',
  error: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_USER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
      token: action.payload.token,
    };
  case REJECTED:
    return {
      ...state,
      error: action.payload.error,
    };
  default:
    return state;
  }
}

export default player;
