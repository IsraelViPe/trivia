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
    this.triggerTimer();
  }

  componentDidUpdate() {
    const { dispatch, answered } = this.props;
    const { timer } = this.state;
    if (timer === 0 || answered) {
      clearInterval(this.interval);
      dispatch(saveTimer(timer));
      dispatch(clickAnswer());
      dispatch(desableButton());
    }
  }

  componentWillUnmount() {
    const { timer } = this.state;
    const { dispatch } = this.props;

    clearInterval(this.interval);
    console.log('desmontar');
  }

  triggerTimer = () => {
    this.setState({
      timer: 30,
    }, () => {
      this.interval = setInterval(() => {
        this.setState((prevState) => ({
          timer: prevState.timer - 1,
        }));
      }, miliSecond);
    });
  };

  render() {
    const { timer } = this.state;
    return (
      <div className="section">
        <div className="box timer has-background-warning">
          <p className="title is-1 has-text-centered has-text-grey-dark">
            {`${timer}`}
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  answered: state.game.answered,
});

Timer.propTypes = {
  answered: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Timer);
