import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import logo from '../trivia.png';

class Login extends React.Component {
  state = { };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>SUA VEZ</p>
        </header>
      </div>
    );
  }
}

export default connect()(Login);
