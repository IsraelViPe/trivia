import { ADD_USER_INFO, REQ_API } from './actionTypes';

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
