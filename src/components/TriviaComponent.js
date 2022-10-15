/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

const de = require('he');

class TriviaComponent extends React.Component {
  render() {
    const { respostas, category, question, result,
      isDisabled, nextClick, answered, handleClickAnswer } = this.props;
    return (
      <div className="section">
        <div className="columns ">
          <div className="column ">
            <div className="box has-background-link">
              <div className="box has-background-link-light">
                <p
                  className="title is-2 has-text-grey-dark"
                  data-testid="question-category"
                >
                  {category}

                </p>
              </div>
              <div className="box has-background-link-light">
                <p
                  className="subtitle is-4 mt-1 has-text-weight-semibold"
                  data-testid="question-text"
                >
                  {de.decode(question)}
                </p>
              </div>
            </div>
          </div>
          <div className="column" data-testid="answer-options">
            <div className="box has-background-link">
              {respostas.map(
                (resposta, iResp) => (resposta === result.correct_answer ? (

                  <div className="box has-background-link-light">
                    <button
                      disabled={ isDisabled }
                      onClick={ handleClickAnswer }
                      className={ answered
                        ? 'correct-answer button is-large is-success is-fullwidth'
                        : 'button is-large is-info is-fullwidth' }
                      key={ iResp }
                      type="button"
                      id="correct-answer"
                      data-testid="correct-answer"
                    >
                      {de.decode(resposta)}
                    </button>
                  </div>

                ) : (

                  <div className="box has-background-link-light">
                    <button
                      disabled={ isDisabled }
                      onClick={ handleClickAnswer }
                      className={ answered
                        ? 'wrong-answer button is-large is-danger is-fullwidth'
                        : 'button is-large is-info is-fullwidth' }
                      key={ iResp }
                      type="button"
                      id="wrong-answer"
                      data-testid={ `wrong-answer-${iResp}` }
                    >
                      {de.decode(resposta)}
                    </button>
                  </div>

                )),
              )}
            </div>
          </div>
        </div>
        {answered
            && (
              <button
                className="button is-large is-fullwidth is-dark has-text-weight-bold"
                data-testid="btn-next"
                type="button"
                onClick={ nextClick }
              >
                Next Question
              </button>
            )}
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
};

const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (score) => dispatch(addScore(score)),
});

export default connect(null, mapDispatchToProps)(TriviaComponent);
