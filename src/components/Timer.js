import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clickAnswer, desableButton, saveTimer } from '../redux/actions';

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
    const { timer } = this.state;
    const { dispatch } = this.props;
    dispatch(saveTimer(timer));
    clearInterval(this.interval);
  }

  render() {
    const { timer } = this.state;
    return (
      <div>
        <p>{`${timer} segundos`}</p>
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
