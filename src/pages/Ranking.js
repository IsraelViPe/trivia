/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { restart } from '../redux/actions';

class Ranking extends Component {
  state = {
    localRanking: JSON.parse(localStorage.getItem('ranking')) || [],
  };

  componentDidMount() {
    const { ranking } = this.props;
    const { name, score, gravatarEmail } = ranking;
    const storageRanking = {
      name,
      score,
      picture: md5(gravatarEmail).toString(),
    };
    this.setState((prevState) => ({
      localRanking: [...prevState.localRanking, storageRanking],
    }), () => {
      const { localRanking } = this.state;
      localStorage.setItem('ranking', JSON.stringify(localRanking));
    });
  }

  handleClick = ({ target: { id } }) => {
    const { history, dispatch } = this.props;
    if (id === 'btn-go-home') {
      history.push('/');
      dispatch(restart());
    }
    if (id === 'btn-play-again') { history.push('/game'); }
  };

  render() {
    const { localRanking } = this.state;
    const rankingPosition = localRanking
      .sort((a, b) => b.score - a.score);
    return (
      <div className="container has-background-grey-dark ">
        <section className="section ">
          <div className="box has-background-danger">
            <h1
              className="title is-1 has-text-centered has-text-danger-light "
              data-testid="ranking-title"
            >
              Ranking

            </h1>
          </div>
        </section>
        { rankingPosition.map(({ name, picture, score }, index) => (
          <section className="section" key={ `${name}-${index}` }>
            <div className="box has-background-warning ">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-128x128">
                    <img
                      className="is-rounded"
                      src={ `https://www.gravatar.com/avatar/${picture}` }
                      alt={ `foto de ${name}` }
                    />
                  </figure>
                </div>

                <div className="card-content ">
                  <span
                    className=" subtitle is-1   has-text-weight-semibold"
                    data-testid={ `player-name-${index}` }
                  >
                    {name}

                  </span>

                </div>
                <div className="card-content">
                  <span
                    className=" subtitle has-text-weight-semibold is-1"
                    data-testid={ `player-score-${index}` }
                  >
                    {`${score} pts`}

                  </span>

                </div>
              </div>
            </div>
          </section>
        ))}
        <div className="section">
          <div className="field is-grouped ">
            <p className="control">
              <button
                className="button is-large is-dark has-text-weight-bold"
                type="button"
                id="btn-go-home"
                data-testid="btn-go-home"
                onClick={ this.handleClick }
              >
                Home
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
      </div>
    );
  }
}

Ranking.propTypes = {
  dispatch: PropTypes.func.isRequired,
  ranking: PropTypes.shape({
    name: PropTypes.string.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  ranking: state.player,
});

export default connect(mapStateToProps)(Ranking);
