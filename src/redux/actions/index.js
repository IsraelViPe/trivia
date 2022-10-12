import { ADD_USER_INFO, REQ_API, ADD_SCORE } from './actionTypes';

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

export const addScore = (score) => ({
  type: ADD_SCORE,
  score,
});
