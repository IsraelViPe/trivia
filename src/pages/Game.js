import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import TriviaComponent from '../components/TriviaComponent';
import { requestAPI } from '../services/index';
import { getRespApi, clickAnswer, clickNext,
  addScore, addAssertion } from '../redux/actions';
import Timer from '../components/Timer';
import Loading from '../components/Loading';

class Game extends Component {
  state = {
    isLoading: true,
    id: 0,
    randomAnswers: [],
  };

  async componentDidMount() {
    await this.getQuestions();
    const { id } = this.state;
    const { getApi } = this.props;

    const api = getApi.results;
    const singleQuestion = api[id];

    const answers = [singleQuestion.correct_answer,
      ...singleQuestion.incorrect_answers];
    const randomAnswers = this.randomizeAnswers(answers);
    this.setState({
      randomAnswers,
    });
  }

  URLsCustomize = (token) => {
    const { settings } = this.props;
    const defaultURL = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const chosenSettings = settings
      .filter(({ category, difficulty, type }) => category || difficulty || type);
    if (chosenSettings.lenght !== 0) {
      const urlFragments = [];
      chosenSettings.forEach((element) => {
        const fragment = `&${Object.keys(element)}=${Object.values(element)}`;
        urlFragments.push(fragment);
      });
      const customizedURL = `https://opentdb.com/api.php?amount=5${urlFragments.join('')}&token=`;
      console.log(customizedURL);
      return customizedURL;
    }
    return defaultURL;
  };

  getQuestions = async () => {
    const { dispatch } = this.props;
    const token = localStorage.getItem('token');
    const URL_QUESTIONS = this.URLsCustomize(token);
    console.log(URL_QUESTIONS);

    const response = await requestAPI(URL_QUESTIONS);
    console.log(response);
    dispatch(getRespApi(response));

    if (response.response_code !== 0) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
      alert('Sua busca não retornou questões, por favor altere as configurações de busca em Settings');
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

      const answers = [singleQuestion.correct_answer,
        ...singleQuestion.incorrect_answers];
      const randomAnswers = this.randomizeAnswers(answers);
      return randomAnswers;
    }
  };

  nextQuestion = () => {
    const lastQuestion = 4;
    const { id } = this.state;
    const { dispatch, history } = this.props;
    this.setState({
      id: id + 1,
    }, () => {
      this.setState({
        randomAnswers: this.handleRenderTriviaComponent(),
      });
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
    const { dispatch, timer, answered } = this.props;
    dispatch(clickAnswer());
    const difficultyNumber = this.getDifficultyNumber();
    const addition = 10;
    const score = addition + (timer * difficultyNumber);
    if (id === 'correct-answer' && !answered) {
      dispatch(addScore(score));
      dispatch(addAssertion());
    }
  };

  render() {
    const { isLoading, id, randomAnswers } = this.state;
    const { getApi, answered, isDesable, timer } = this.props;
    const api = getApi.results;
    const singleQuestion = api[id];
    return (
      <div className="container-game container">
        <div className="box box-game has-background-grey-dark">
          <Header { ...this.props } />
          <div className="box has-background-black-ter">
            { isLoading && <Loading />}
            <Timer />
            { !isLoading && (
              <TriviaComponent
                handleClickAnswer={ this.handleClickAnswer }
                answered={ answered }
                question={ singleQuestion.question }
                category={ singleQuestion.category }
                result={ singleQuestion }
                respostas={ randomAnswers }
                isDisabled={ isDesable }
                nextClick={ this.nextQuestion }
                timer={ timer }
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getApi: state.game,
  player: state.player,
  answered: state.game.answered,
  isDesable: state.game.isDesable,
  timer: state.game.timer,
  settings: state.game.settings,
});

Game.propTypes = {
  settings: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  })).isRequired,
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
