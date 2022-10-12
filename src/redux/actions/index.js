<<<<<<< HEAD
import { ADD_USER_INFO, REQ_API, CLICK_ANSWER, CLICK_NEXT } from './actionTypes';
=======
import { ADD_USER_INFO, REQ_API, SET_ACERTO, ADD_SCORE } from './actionTypes';
>>>>>>> main-group-27

export const addUserInfo = (payload) => ({
  type: ADD_USER_INFO,
  payload,
});

export const getRespApi = (payload) => ({
  type: REQ_API,
  payload,
});

export const actionGenerica = (payload, type) => ({
  type,
  payload,
});

<<<<<<< HEAD
export const clickAnswer = () => ({
  type: CLICK_ANSWER,
});

export const clickNext = () => ({
  type: CLICK_NEXT,
=======
export const setAcerto = (acerto) => ({
  type: SET_ACERTO,
  acerto,
});

export const addScore = (score) => ({
  type: ADD_SCORE,
  score,
>>>>>>> main-group-27
});
