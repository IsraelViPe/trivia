import { ADD_USER_INFO, ADD_SCORE } from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER_INFO:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case ADD_SCORE: return {
    ...state,
    score: state.score + action.score,
  };
  default:
    return state;
  }
};

export default playerReducer;
