import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import TriviaComponent from '../components/TriviaComponent';
import { URL_TOKEN, requestAPI } from '../services/index';
import { getRespApi, clickAnswer, clickNext } from '../redux/actions';

class Game extends Component {
  state = {
    isLoading: true,
    timer: 30,
    // randomicAnswers: [],
    isBtnDisabled: false,
    id: 0,
  };

  async componentDidMount() {
    await this.getQuestions();
    this.countdownTimer();
  }

  getToken = () => requestAPI(URL_TOKEN).then((data) => {
    if (data.response_code === 0) {
      return data.token;
    }
    const { history } = this.props;
    history.push('/');
  });

  countdownTimer = () => {
    const time = 1000;
    const interval = setInterval(() => {
      const { timer } = this.state;
      this.setState({
        timer: timer - 1,
      }, () => {
        if (timer === 1) {
          clearInterval(interval);
          this.setState({ isBtnDisabled: true });
        }
      });
    }, time);
  };

  getQuestions = async () => {
    const { dispatch } = this.props;
    const token = await this.getToken();
    const URL_QUESTIONS = `https://opentdb.com/api.php?amount=5&token=${token}`;

    const response = await requestAPI(URL_QUESTIONS);
    dispatch(getRespApi(response));

    this.setState(null, this.handleRenderTriviaComponent);
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
      // this.setState({
      //   randomicAnswers: this.randomizeAnswers(respostas),
      // });
      return this.randomizeAnswers(respostas);
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

  handleClickAnswer = () => {
    const { dispatch } = this.props;
    dispatch(clickAnswer());
  };

  render() {
    const { isLoading, timer, isBtnDisabled, id } = this.state;
    const { getApi, answered } = this.props;
    const api = getApi.results;
    const singleQuestion = api[id];

    return (
      <>
        <Header { ...this.props } />

        <div>
          <p>
            {timer}
            {' '}
            segundos restantes.
          </p>
          { !isLoading && (
            <TriviaComponent
<<<<<<< HEAD
              handleClickAnswer={ this.handleClickAnswer }
              answered={ answered }
=======
>>>>>>> main-group-27
              question={ singleQuestion.question }
              category={ singleQuestion.category }
              result={ singleQuestion }
              respostas={ this.handleRenderTriviaComponent() }
              isDisabled={ isBtnDisabled }
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
});

Game.propTypes = {
  answered: PropTypes.bool.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
  getApi: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.shape({
      question: PropTypes.string,
      category: PropTypes.string,
      correct_answer: PropTypes.string,
      incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    })).isRequired,
    indexAnswer: PropTypes.number.isRequired,
  }).isRequired,

};

export default connect(mapStateToProps)(Game);
