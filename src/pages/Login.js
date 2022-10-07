import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import logo from '../trivia.png';

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

  render() {
    const { name, email } = this.state;
    return (
      <div className="App">
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
