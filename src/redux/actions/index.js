import { ADD_USER_INFO } from './actionTypes';

export const addUserInfo = (payload) => ({
  type: ADD_USER_INFO,
  payload,
});

export const actionGENERICA = (payload) => ({
  type: 'qualquerCoisa',
  payload,
});
