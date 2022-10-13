import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { restart } from '../redux/actions';

class Feedback extends Component {
  handleClick = ({ target: { id } }) => {
    const { history, dispatch } = this.props;
    if (id === 'btn-ranking') {
      history.push('/ranking');
    }
    if (id === 'btn-play-again') {
      dispatch(restart());
      history.push('/');
    }
  };

  render() {
    const { assertions, score } = this.props;
    const ACERTO_MIN = 3;
    return (
      <main>
        <Header />
        {(assertions >= ACERTO_MIN) ? <p data-testid="feedback-text">Well Done!</p>
          : <span data-testid="feedback-text">Could be better...</span>}
        <ul>
          <li data-testid="feedback-total-score">{`Pontos ${score}`}</li>
          <li data-testid="feedback-total-question">
            {' '}
            {`Respostas certas ${assertions}`}
          </li>
        </ul>

        <div className="Feedback">
          <button
            type="button"
            data-testid="btn-ranking"
            id="btn-ranking"
            onClick={ this.handleClick }
          >
            Ranking
          </button>
          <button
            type="button"
            data-testid="btn-play-again"
            id="btn-play-again"
            onClick={ this.handleClick }
          >
            Play Again
          </button>
        </div>

      </main>

    );
  }
}

const mapStateToProps = ({ player: { assertions, score } }) => ({
  assertions,
  score,
});

Feedback.propTypes = {
  dispatch: PropTypes.func.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
