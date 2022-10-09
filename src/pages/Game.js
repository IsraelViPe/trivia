import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import TriviaComponent from '../components/TriviaComponent';
import { URL_TOKEN, requestAPI } from '../services/index';

class Game extends Component {
  state = {
    results: [],
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
    const token = await this.getToken();
    const URL_QUESTIONS = `https://opentdb.com/api.php?amount=5&token=${token}`;

    const response = await requestAPI(URL_QUESTIONS);
    if (response.response_code !== 0) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    }
    requestAPI(URL_QUESTIONS)
      .then(({ results }) => {
        this.setState({ results });
      });
  };

  render() {
    const { results } = this.state;
    return (
      <>
        <Header { ...this.props } />

        <div>
          {results.map((result, index) => {
            const num = 0.5;
            const respostas = [result.correct_answer, ...result.incorrect_answers].sort(
              () => Math.random() - num,
            );

            return (
              <div key={ index }>
                <TriviaComponent
                  respostas={ respostas }
                  category={ result.category }
                  question={ result.question }
                  result={ result }
                />
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Game;
