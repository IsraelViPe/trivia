import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

// mudar essa requisição api para um arquivo separado

const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';

const requestAPI = async (endpoint) => {
  try {
    const request = await fetch(endpoint);
    return await request.json();
  } catch (e) {
    throw new Error(e);
  }
};

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
    requestAPI(URL_QUESTIONS)
      .then(({ results }) => {
        this.setState({ results });
      });
  };

  /*
    Object.concat(result.correct_answer + result.incorrect_answers.map())
  */

  render() {
    const { results } = this.state;
    console.log(results);

    return (
      <>
        <Header { ...this.props } />
        <div>
          {/* {results.map((result, index) => (
          <div key={ index }>
          <h2 data-testid="question-category">{ result.category }</h2>
          <p data-testid="question-text">{ result.question }</p>
          <div data-testid="answer-options">
          <button type="button" data-testid="correct-answer">
          { result.correct_answer }
          </button>
          { result.incorrect_answers.map((answer, iBtn) => (
            <button type="button" key={ iBtn } data-testid="incorrect-answer">
                  { answer }
                  </button>
                  )) }
                  </div>
                  </div>
                ))} */}
          {results.map((result, index) => {
            const respostas = [result.correct_answer, ...result.incorrect_answers].sort();
            // console.log('sem sort', respostas);
            // console.log('com sort', respostas.sort());
            /*
            array = 5
            array[0] = science - 1
            botao > array[0 + 1] // array[1] - geography

            let acc = 0;
            array[acc];
            botao => acc += 1;

            */
            return (

              <div key={ index }>
                <h2 data-testid="question-category">{result.category}</h2>
                <p data-testid="question-text">{result.question}</p>
                <div data-testid="answer-options">
                  {respostas
                    .map((resposta, iResp) => (resposta === result.correct_answer ? (
                      <button
                        key={ iResp }
                        type="button"
                        data-testid="correct-answer"
                      >
                        {resposta}

                      </button>
                    ) : (
                      <button
                        key={ iResp }
                        type="button"
                        data-testid="incorrect-answer"
                      >
                        {resposta}

                      </button>
                    )))}
                </div>
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
