import React from 'react';
import PropTypes from 'prop-types';

const de = require('he');

class TriviaComponent extends React.Component {
  state = {
    respondido: false,
  };

  handleClickAnswer = () => {
    this.setState({
      respondido: true,
    });
  };

  render() {
    const { respostas, category, question, result, isDisabled, nextClick } = this.props;
    const { respondido } = this.state;
    return (
      <div>
        <h2 data-testid="question-category">{category}</h2>
        <p data-testid="question-text">{de.decode(question)}</p>
        <div data-testid="answer-options">
          {respostas.map(
            (resposta, iResp) => (resposta === result.correct_answer ? (
              <button
                disabled={ isDisabled }
                onClick={ this.handleClickAnswer }
                className={ respondido ? 'correct-answer' : undefined }
                key={ iResp }
                type="button"
                data-testid="correct-answer"
              >
                {de.decode(resposta)}
              </button>
            ) : (
              <button
                disabled={ isDisabled }
                onClick={ this.handleClickAnswer }
                className={ respondido ? 'wrong-answer' : undefined }
                key={ iResp }
                type="button"
                data-testid={ `wrong-answer-${iResp}` }
              >
                {de.decode(resposta)}
              </button>
            )),
          )}
          {respondido
            && (
              <button
                data-testid="btn-next"
                type="button"
                onClick={ nextClick }
              >
                Next
              </button>
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
  isDisabled: PropTypes.bool.isRequired,
  nextClick: PropTypes.func.isRequired,
};
export default TriviaComponent;
