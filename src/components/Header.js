/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import logo from '../trivia.png';

class Header extends Component {
  render() {
    const { userInfo: { name, gravatarEmail, score } } = this.props;
    const emailHash = md5(gravatarEmail).toString();
    return (
      <section className="section">
        <div className="card has-background-warning">
          <div className="card-content">
            <div className="media is-align-items-center">
              <div className="media-left">
                <figure className="image is-128x128">
                  <img
                    className="is-rounded"
                    data-testid="header-profile-picture"
                    src={ `https://www.gravatar.com/avatar/${emailHash}` }
                    alt={ `foto de ${name}` }
                  />
                </figure>
              </div>
              <div className="media-content">
                <span
                  className="title is-3 header-fonts has-text-grey-dark"
                  data-testid="header-player-name"
                >
                  {name}
                </span>
                <div className="card-content">
                  <span
                    className="title is-2 header-fonts has-text-grey-dark"
                    data-testid="header-score"
                  >
                    {score}

                  </span>
                </div>
              </div>
              <div className="media-content">
                <figure className="image">
                  <img src={ logo } className="App-logo" alt="logo" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Header.propTypes = {
  userInfo: PropTypes.shape({
    score: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  userInfo: state.player,
});

export default connect(mapStateToProps)(Header);
