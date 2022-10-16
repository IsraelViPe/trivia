import React, { Component } from 'react';
import logo from '../trivia.png';

export default class Loading extends Component {
  render() {
    return (
      <div className="container-loading">
        <figure className="image">
          <img src={ logo } className="logo-loading" alt="logo" />
        </figure>
      </div>
    );
  }
}
