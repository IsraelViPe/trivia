import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addScore } from '../redux/actions';

const de = require('he');

class TriviaComponent extends React.Component {
  render() {
    const { respostas, category, question, result,
      isDisabled, nextClick, answered, handleClickAnswer } = this.props;
    return (
      <div>
        <h2 data-testid="question-category">{category}</h2>
        <p data-testid="question-text">{de.decode(question)}</p>
        <div data-testid="answer-options">
          {respostas.map(
            (resposta, iResp) => (resposta === result.correct_answer ? (
              <button
                disabled={ isDisabled }
                onClick={ handleClickAnswer }
                className={ answered ? 'correct-answer' : undefined }
                key={ iResp }
                type="button"
                data-testid="correct-answer"
              >

                {de.decode(resposta)}
              </button>
            ) : (
              <button
                disabled={ isDisabled }
                onClick={ handleClickAnswer }
                className={ answered ? 'wrong-answer' : undefined }
                key={ iResp }
                type="button"
                data-testid={ `wrong-answer-${iResp}` }
              >
                {de.decode(resposta)}
              </button>
            )),
          )}
          {answered
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
  handleClickAnswer: PropTypes.func.isRequired,
  answered: PropTypes.bool.isRequired,
  respostas: PropTypes.arrayOf(PropTypes.string).isRequired,
  category: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  result: PropTypes.shape({
    difficulty: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
  }).isRequired,
  isDisabled: PropTypes.bool.isRequired,
  nextClick: PropTypes.func.isRequired,
  // timer: PropTypes.number.isRequired,
  // dispatchScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (score) => dispatch(addScore(score)),
});

export default connect(null, mapDispatchToProps)(TriviaComponent);
