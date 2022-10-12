import {
  ADD_SCORE,
  ADD_USER_INFO,
  REQ_API,
  CLICK_ANSWER,
  CLICK_NEXT,
  DESABLE_BUTTON,
} from './actionTypes';

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

export const clickAnswer = () => ({
  type: CLICK_ANSWER,
});

export const clickNext = () => ({
  type: CLICK_NEXT,
});

export const addScore = (score) => ({
  type: ADD_SCORE,
  score,
});

export const desableButton = () => ({
  type: DESABLE_BUTTON,
});
