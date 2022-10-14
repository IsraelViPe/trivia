/* eslint-disable react/jsx-max-depth */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import addLocalStorage from '../services/localStorage';
import { addUserInfo } from '../redux/actions';
import '../App.css';
import { requestAPI, URL_TOKEN } from '../services';

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
    this.setState(
      {
        [name]: value,
      },
      this.handleLogin,
    );
  };

  handlePlay = async () => {
    const { history, dispatch } = this.props;
    const { token } = await requestAPI(URL_TOKEN);
    dispatch(addUserInfo(this.state));
    addLocalStorage('token', token);
    history.push('/game');
  };

  handleClickSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <div className="container-login has-background-black-bis ">
        <div className="box has-background-black-ter ">
          <figure className="image">
            <img src={ logo } className="App-logo" alt="logo" />
          </figure>

          <form className="box has-background-link mt-5">
            <div className="field">
              <label className="label" htmlFor="name">
                Nome
                <input
                  className="input"
                  onChange={ this.handleChange }
                  data-testid="input-player-name"
                  type="text"
                  name="name"
                  id="name"
                  value={ name }
                />
              </label>
            </div>
            <div className="field">
              <label className="label" htmlFor="email">
                Email
                <input
                  className="input"
                  onChange={ this.handleChange }
                  data-testid="input-gravatar-email"
                  type="text"
                  name="email"
                  id="email"
                  value={ email }
                />
              </label>
            </div>
            <div className=" field is-grouped ">
              <p className="control">
                <button
                  className="button is-medium is-info is-rounded"
                  onClick={ this.handlePlay }
                  disabled={ isDisabled }
                  data-testid="btn-play"
                  type="button"
                >
                  Play
                </button>
              </p>
              <p className="control">
                <button
                  className="button is-medium is-info is-rounded "
                  data-testid="btn-settings"
                  type="button"
                  onClick={ this.handleClickSettings }
                >
                  Settings
                </button>
              </p>
            </div>
          </form>
        </div>
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
}.isRequired;

export default connect()(Login);
