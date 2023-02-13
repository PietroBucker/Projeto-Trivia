import { requestApiTrivia } from '../../api/api';

export const SAVE_USER = 'SAVE-USER';
export const SUCCESS = 'SUCCESS';
export const REJECTED = 'REJECTED';
export const SAVE_SCORE = 'SAVE_SCORE';

export const actionSaveUser = (payload) => ({
  type: SAVE_USER,
  payload,
});

const actionReject = (payload) => ({
  type: REJECTED,
  payload,
});

export const actionSaveScore = (payload) => ({
  type: SAVE_SCORE,
  payload,
});

export const actionGetApi = (state) => async (dispatch) => {
  try {
    const { token } = await requestApiTrivia();
    localStorage.setItem('token', token);
    dispatch(actionSaveUser({ ...state, token }));
  } catch (error) {
    dispatch(actionReject(error.message));
  }
};
