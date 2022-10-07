import React, { Component } from 'react';
import { Header } from '../components/Header';

export default class Games extends Component {
  render() {
    return (
      <div>
        <Header { ...this.props } />
      </div>
    );
  }
}
