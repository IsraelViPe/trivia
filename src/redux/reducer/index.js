import { combineReducers } from 'redux';
import { ADD_USER_INFO } from '../actions/actionTypes';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER_INFO:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };

  default:
    return state;
  }
};

const rootReducer = combineReducers({ player });

export default rootReducer;
