import { REQ_API, CLICK_ANSWER, CLICK_NEXT } from '../actions/actionTypes';

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
  case CLICK_ANSWER:
    return {
      ...state, answered: true,
    };
  case CLICK_NEXT:
    return {
      ...state, answered: false,
    };
  default:
    return state;
  }
};

export default gameReducer;
