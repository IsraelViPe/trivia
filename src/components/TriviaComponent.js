import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addScore } from '../redux/actions';

const de = require('he');

class TriviaComponent extends React.Component {
  state = {
    respondido: false,
  };

  handleClickAnswer = ({ target: { id } }) => {
    const { result, timer, dispatchScore } = this.props;
    const { difficulty } = result;
    const POINT = 10;

    const difficultyNumber = {
      easy: 1,
      medium: 2,
      hard: 3,
    };

    this.setState({
      respondido: true,
    });

    if (id === 'correct') {
      dispatchScore(POINT + (timer + difficultyNumber[difficulty]));
    } else {
      console.log('ERRRRROU');
    }
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
                id="correct"
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
                id="incorrect"
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
    difficulty: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
  }).isRequired,
  isDisabled: PropTypes.bool.isRequired,
  nextClick: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  dispatchScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (score) => dispatch(addScore(score)),
});

export default connect(null, mapDispatchToProps)(TriviaComponent);
