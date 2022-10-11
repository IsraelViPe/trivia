import { ADD_USER_INFO } from '../actions/actionTypes';

const INITIAL_STATE = {
  name: 'israel vinicius Pereira',
  assertions: '2',
  score: 50,
  gravatarEmail: 'tchelo92@gmail.com',
};

const playerReducer = (state = INITIAL_STATE, action) => {
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

export default playerReducer;
