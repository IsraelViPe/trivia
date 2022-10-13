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

  handleClickGoHome = () => {
    const { history, dispatch } = this.props;
    history.push('/');
    dispatch(restart());
  };

  render() {
    const { localRanking } = this.state;
    const rankingPosition = localRanking
      .sort((a, b) => b.score - a.score);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        { rankingPosition.map(({ name, picture, score }, index) => (
          <div key={ `${name}-${index}` }>
            <div>
              <img
                src={ `https://www.gravatar.com/avatar/${picture}` }
                alt={ `foto de ${name}` }
              />
            </div>
            <div><span data-testid={ `player-name-${index}` }>{name}</span></div>
            <div><span data-testid={ `player-score-${index}` }>{score}</span></div>
          </div>
        ))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClickGoHome }
        >
          Inicio
        </button>
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
