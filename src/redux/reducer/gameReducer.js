import { REQ_API, CLICK_ANSWER, CLICK_NEXT,
  DESABLE_BUTTON,
  SAVE_TIMER,
  CHANGE_SETTINGS } from '../actions/actionTypes';

const INITIAL_STATE = {
  results: [],
  indexAnswer: 0,
  isLoading: true,
  answered: false,
  timer: '',
  isDesable: false,
  settings: [],
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQ_API: {
    return { ...state, results: action.payload.results };
  }
  case CLICK_ANSWER:
    return {
      ...state,
      answered: true,
    };
  case CLICK_NEXT:
    return {
      ...state,
      answered: false,
      isDesable: false,
    };
  case DESABLE_BUTTON:
    return {
      ...state, isDesable: true,
    };
  case SAVE_TIMER:
    return {
      ...state, timer: action.timer,
    };
  case CHANGE_SETTINGS:
    return {
      ...state, settings: action.payload,
    };
  default:
    return state;
  }
};

export default gameReducer;
