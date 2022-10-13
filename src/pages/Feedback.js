import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  handleRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    console.log(assertions);
    const ACERTO_MIN = 3;
    return (
      <main>
        <Header />
        {(assertions >= ACERTO_MIN) ? <p data-testid="feedback-text">Well Done!</p>
          : <p data-testid="feedback-text">Could be better...</p>}
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <div className="Feedback">
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.handleRanking }
          >
            Ranking
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
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
