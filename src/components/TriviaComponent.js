import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addScore } from '../redux/actions';

const de = require('he');

class TriviaComponent extends React.Component {
<<<<<<< HEAD
=======
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

>>>>>>> main-group-27
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
<<<<<<< HEAD
                onClick={ handleClickAnswer }
                className={ answered ? 'correct-answer' : undefined }
=======
                onClick={ this.handleClickAnswer }
                className={ respondido ? 'correct-answer' : undefined }
                id="correct"
>>>>>>> main-group-27
                key={ iResp }
                type="button"
                data-testid="correct-answer"
              >

                {de.decode(resposta)}
              </button>
            ) : (
              <button
                disabled={ isDisabled }
<<<<<<< HEAD
                onClick={ handleClickAnswer }
                className={ answered ? 'wrong-answer' : undefined }
=======
                onClick={ this.handleClickAnswer }
                className={ respondido ? 'wrong-answer' : undefined }
                id="incorrect"
>>>>>>> main-group-27
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
  timer: PropTypes.number.isRequired,
  dispatchScore: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (score) => dispatch(addScore(score)),
});

export default connect(null, mapDispatchToProps)(TriviaComponent);
