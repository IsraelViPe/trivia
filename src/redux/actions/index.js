import { ADD_USER_INFO, REQ_API, CLICK_ANSWER, CLICK_NEXT } from './actionTypes';

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
