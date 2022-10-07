import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import fetchAPI from '../services/fetchAPI';
import addLocalStorage from '../services/localStorage';
import { addUserInfo } from '../redux/actions';


class Login extends React.Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  };

  handleLogin = () => {
    const { name, email } = this.state;
    if (name && email) {
      this.setState({ isDisabled: false });
    }
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.handleLogin);
  };

  handlePlay = async () => {
    const { history } = this.props;
    const { token } = await fetchAPI();
    addLocalStorage(token);
    history.push('/game');
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
    const { name, email, isDisabled } = this.state;
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
            onClick={ this.handlePlay }
            disabled={ isDisabled }
            data-testid="btn-play"
            type="button"
          >
            Play
          </button>
        </header>
      </div>
    );
  }
}

Login.propTypes = {
 nome: PropTypes.string,
 email: PropTypes.string,
 dispatch: PropTypes.func.isRequired,
 history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
   isDisabled: PropTypes.bool.isRequired,
}.isRequired,
export default connect()(Login);


