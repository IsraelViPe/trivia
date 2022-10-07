import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import { addUserInfo } from '../redux/actions';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    dispatch(addUserInfo(this.state));
    history.push('/games');
  };

  handleClickSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email } = this.state;
    return (
      <div className="App">
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.handleClickSettings }
        >
          Settings

        </button>
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <label htmlFor="name">
            Nome
            <input
              onChange={ this.handleChange }
              data-testid="input-player-name"
              type="text"
              name="name"
              id="name"
              value={ name }
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
              type="text"
              name="email"
              id="email"
              value={ email }
            />
          </label>
          <button
            onClick={ this.handleClick }
            disabled={ !name || !email }
            data-testid="btn-play"
            type="button"
          >
            Enviar

          </button>
        </header>
      </div>
    );
  }
}

export default connect()(Login);

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
