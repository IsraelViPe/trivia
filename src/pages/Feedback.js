import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Feedback extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <button
          onClick={ () => history.push('/ranking') }
          data-testid="btn-ranking"
          type="button"
        >
          Ranking

        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
