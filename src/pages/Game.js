import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import TriviaComponent from '../components/TriviaComponent';
import { URL_TOKEN, requestAPI } from '../services/index';
import { getRespApi, clickAnswer, clickNext,
  addScore, addAssertion } from '../redux/actions';
import Timer from '../components/Timer';

class Game extends Component {
  state = {
    isLoading: true,
    id: 0,
  };

  async componentDidMount() {
    await this.getQuestions();
  }

  getToken = () => requestAPI(URL_TOKEN).then((data) => {
    if (data.response_code === 0) {
      return data.token;
    }
    const { history } = this.props;
    history.push('/');
  });

  getQuestions = async () => {
    const { dispatch } = this.props;
    const token = await this.getToken();
    const URL_QUESTIONS = `https://opentdb.com/api.php?amount=5&token=${token}`;

    const response = await requestAPI(URL_QUESTIONS);
    dispatch(getRespApi(response));

    if (response.response_code !== 0) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    }

    this.setState({
      isLoading: false,
    });
  };

  randomizeAnswers = (arr = []) => {
    const num = 0.5;
    return arr.slice().sort(
      () => Math.random() - num,
    );
  };

  handleRenderTriviaComponent = () => {
    const { isLoading, id } = this.state;
    const { getApi } = this.props;

    if (!isLoading) {
      const api = getApi.results;
      const singleQuestion = api[id];

      const respostas = [singleQuestion.correct_answer,
        ...singleQuestion.incorrect_answers];
      const randomRespostas = this.randomizeAnswers(respostas);
      return randomRespostas;
    }
  };

  nextQuestion = () => {
    const lastQuestion = 4;
    const { id } = this.state;
    const { dispatch, history } = this.props;
    this.setState({
      id: id + 1,
    });
    dispatch(clickNext());
    if (id === lastQuestion) history.push('/feedback');
  };

  getDifficultyNumber = () => {
    const { getApi: { results } } = this.props;
    const { id } = this.state;
    const { difficulty } = results[id];
    const hard = 3;
    const medium = 2;
    const easy = 1;
    switch (difficulty) {
    case 'hard':
      return hard;
    case 'medium':
      return medium;
    case 'easy':
      return easy;
    default:
      return 0;
    }
  };

  handleClickAnswer = ({ target: { id } }) => {
    const { dispatch, timer } = this.props;
    dispatch(clickAnswer());
    const difficultyNumber = this.getDifficultyNumber();
    const addition = 10;
    const score = addition + (timer * difficultyNumber);
    if (id === 'correct-answer') {
      dispatch(addScore(score));
      dispatch(addAssertion());
    }
  };

  render() {
    const { isLoading, id } = this.state;
    const { getApi, answered, isDesable, timer } = this.props;
    const api = getApi.results;
    const singleQuestion = api[id];
    const respostas = this.handleRenderTriviaComponent();
    return (
      <>
        <Header { ...this.props } />

        <div>
          <p>
            {!answered && !isLoading && <Timer />}
          </p>
          { !isLoading && (
            <TriviaComponent
              handleClickAnswer={ this.handleClickAnswer }
              answered={ answered }
              question={ singleQuestion.question }
              category={ singleQuestion.category }
              result={ singleQuestion }
              respostas={ respostas }
              isDisabled={ isDesable }
              nextClick={ this.nextQuestion }
              timer={ timer }
            />
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  getApi: state.game,
  player: state.player,
  answered: state.game.answered,
  isDesable: state.game.isDesable,
  timer: state.game.timer,
});

Game.propTypes = {
  timer: PropTypes.number.isRequired,
  isDesable: PropTypes.bool.isRequired,
  answered: PropTypes.bool.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
  getApi: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.shape({
      question: PropTypes.string,
      category: PropTypes.string,
      correct_answer: PropTypes.string,
      incorrect_answers: PropTypes.arrayOf(PropTypes.string),
      difficulty: PropTypes.string.isRequired,
    })).isRequired,
    indexAnswer: PropTypes.number.isRequired,
  }).isRequired,

};

export default connect(mapStateToProps)(Game);
