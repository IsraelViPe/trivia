// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// const ACERTO_MIN = 3;

// class Feedback extends Component {
//   render() {
//     handleClick = () => {
//       const { history } = this.props;
//       history.push('/ranking');
//     };

//     const { acerto } = this.props;
//     return (
//       <main>
//         <h2>Feedback</h2>
//         {
//           acerto >= ACERTO_MIN
//             ? <p data-testid="feedback-text">Well Done!</p>
//             : <p data-testid="feedback-text">Could be better...</p>
//         }
//         <button
//           type="button"
//           data-testid="btn-ranking"
//           onClick={ this.handleClick }
//         >
//           Ranking
//         </button>
//       </main>
//     );
//   }
// }

// Feedback.propTypes = {
//   acerto: PropTypes.string,
// }.isRequired;

// const mapStateToProps = (state) => ({
//   acerto: state.playerReducer.acerto,
// });

// export default connect(mapStateToProps)(Feedback);

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
    const { acertos, score } = this.props;
    const ACERTO_MIN = 3;
    return (
      <main>
        <Header />
        {(acertos >= ACERTO_MIN) ? <p data-testid="feedback-text">Well Done!</p>
          : <p data-testid="feedback-text">Could be better...</p>}
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{Number(acertos)}</p>
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
  acertos: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
