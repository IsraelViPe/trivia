import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';

class App extends React.Component {
  state = { };

  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>

    );
  }
}

export default connect()(App);
