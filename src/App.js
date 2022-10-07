import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Games from './pages/Games';
import Login from './pages/Login';
import Settings from './pages/Settings';



class App extends React.Component {
  state = { };

  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/games" component={ Games } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>

    );
  }
}

export default connect()(App);
