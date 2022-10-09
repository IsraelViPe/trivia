import React from 'react';
import PropTypes from 'prop-types';

const de = require('he');

class TriviaComponent extends React.Component {
  render() {
    const { respostas, category, question, result } = this.props;
    return (
      <div>
        <h2 data-testid="question-category">{category}</h2>
        <p data-testid="question-text">{de.decode(question)}</p>
        <div data-testid="answer-options">
          {respostas.map(
            (resposta, iResp) => (resposta === result.correct_answer ? (
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
                data-testid={ `wrong-answer-${iResp}` }
              >
                {resposta}
              </button>
            )),
          )}
        </div>
      </div>

    );
  }
}
TriviaComponent.propTypes = {
  respostas: PropTypes.arrayOf(PropTypes.string).isRequired,
  category: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  result: PropTypes.shape({
    correct_answer: PropTypes.string.isRequired,
  }).isRequired,
};
export default TriviaComponent;
