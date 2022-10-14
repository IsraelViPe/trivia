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
      <main className="container">
        <div className="box box-feedback has-background-grey-dark">
          <Header />
          {
            (assertions >= ACERTO_MIN)
              ? (
                <section className="section">
                  <div className="box">
                    <span data-testid="feedback-text">Well Done!</span>
                  </div>
                </section>
              )
              : (
                <div className="box has-text-centered has-background-link">
                  <span
                    className="is-size-1 has-text-weight-semibold has-text-warning"
                    data-testid="feedback-text"
                  >
                    Could be better...

                  </span>
                </div>
              )
          }
          <div className="box has-text-centered has-background-link has-text-warning">
            <ul>
              <li
                className="is-size-3 has-text-weight-semibold"
                data-testid="feedback-total-score"
              >
                {`${score} pontos`}

              </li>
              <li
                className="is-size-3 has-text-weight-semibold"
                data-testid="feedback-total-question"
              >
                {' '}
                {`${assertions} respostas certas`}
              </li>
            </ul>
          </div>
          <div className=" field is-grouped ">
            <p className="control">
              <button
                className="button is-large is-dark has-text-weight-bold"
                type="button"
                data-testid="btn-ranking"
                id="btn-ranking"
                onClick={ this.handleClick }
              >
                Ranking
              </button>
            </p>
            <p className="control">
              <button
                className="button is-large is-dark has-text-weight-bold"
                type="button"
                data-testid="btn-play-again"
                id="btn-play-again"
                onClick={ this.handleClick }
              >
                Play Again
              </button>
            </p>
          </div>
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
