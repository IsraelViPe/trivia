import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';
import Ranking from './pages/Ranking';
import Feedback from './pages/Feedback';

class App extends React.Component {
  state = { };

  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/settings" component={ Settings } />
<<<<<<< HEAD
        <Route exact path="/ranking" component={ Ranking } />
        <Route exact path="/feedback" component={ Feedback } />
=======
        <Route exact path="feedback" component={ Feedback } />
        <Route exact path="/ranking" component={ Ranking } />
>>>>>>> main-group-27
      </Switch>
    );
  }
}

export default connect()(App);
