import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import TriviaComponent from '../components/TriviaComponent';
import { URL_TOKEN, requestAPI } from '../services/index';
import { getRespApi } from '../redux/actions';

class Game extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    this.getQuestions();
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
    requestAPI(URL_QUESTIONS);
    // .then(({ results }) => {
    // this.setState({ results }, () => {
    this.setState({
      isLoading: false,
    });
    // });
    // });
  };

  handleRenderTriviaComponent = () => {
    const { isLoading } = this.state;
    const { getApi } = this.props;

    if (!isLoading) {
      const api = getApi.results;
      const index = getApi.indexAnswer;
      const singleQuestion = api[index];

      const num = 0.5;
      const respostas = [singleQuestion.correct_answer,
        ...singleQuestion.incorrect_answers].sort(
        () => Math.random() - num,
      );
      return respostas;
    }
  };

  render() {
    const { isLoading } = this.state;
    const { getApi } = this.props;
    const api = getApi.results;
    const index = getApi.indexAnswer;
    const singleQuestion = api[index];

    const test = this.handleRenderTriviaComponent();

    return (
      <>
        <Header { ...this.props } />

        <div>
          { !isLoading && (
            <TriviaComponent
              handleClickAnswer={ this.handleClickAnswer }
              question={ singleQuestion.question }
              category={ singleQuestion.category }
              result={ singleQuestion }
              respostas={ test }
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
});

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
  getApi: PropTypes.shape({
    results: PropTypes.shape({}).isRequired,
    indexAnswer: PropTypes.shape({}).isRequired,
  }).isRequired,

};

export default connect(mapStateToProps)(Game);
