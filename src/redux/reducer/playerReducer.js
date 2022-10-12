import { ADD_USER_INFO, SET_ACERTO } from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  acerto: 0,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER_INFO:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case SET_ACERTO:
    return {
      ...state,
      acerto: action.acerto + state.acerto,
    };

  default:
    return state;
  }
};

export default playerReducer;
