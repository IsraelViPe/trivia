import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { userInfo: { name, gravatarEmail } } = this.props;
    const emailHash = md5(gravatarEmail).toString();
    return (
      <div>
        <div>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${emailHash}` }
            alt={ `foto de ${name}` }
          />
        </div>
        <div><span data-testid="header-player-name">{name}</span></div>
        <div><span data-testid="header-score">0</span></div>
      </div>
    );
  }
}

Header.propTypes = {
  userInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  userInfo: state.player,
});

export default connect(mapStateToProps)(Header);
