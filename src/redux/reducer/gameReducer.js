import { REQ_API } from '../actions/actionTypes';

const INITIAL_STATE = {
  results: [],
  indexAnswer: 0,
  isLoading: true,
  answered: false,
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQ_API: {
    return { ...state, results: action.payload.results };
  }
  default:
    return state;
  }
};

export default gameReducer;
