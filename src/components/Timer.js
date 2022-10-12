import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clickAnswer, desableButton } from '../redux/actions';

const miliSecond = 1000;

class Timer extends Component {
  state = {
    timer: 30,
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, miliSecond);
  }

  componentDidUpdate() {
    const { dispatch } = this.props;
    const { timer } = this.state;
    if (timer === 1) {
      dispatch(clickAnswer());
      dispatch(desableButton());
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        {`${timer} segundos`}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  answered: state.game.answered,
});

Timer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Timer);
