import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classnames from 'classnames';
import onClickOutside from 'react-onclickoutside';
import styles from './styles';

import Button from 'Components/Button';

class UserMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { activeSubMenu: false };
    this.toggleSubMenu = this.toggleSubMenu.bind(this);
  }

  handleClickOutside() {
    this.setState({ activeSubMenu: false });
  }

  toggleSubMenu() {
    this.setState((prevState) => {
      return { activeSubMenu: !prevState.activeSubMenu };
    });
  }

  renderSubMenu() {
    const { activeSubMenu } = this.state;
    const {
      signedIn,
      gitHandler,
    } = this.props;

    if (activeSubMenu) {
      return (
        <div className={styles.subMenu}>
          <Button className={styles.subMenuClose} onClick={this.toggleSubMenu} alwaysActive>
            <i className={classnames('fa fa-close')}></i>
          </Button>

          {/*{ !signedIn && <a className={styles.signInLink} href={'/api/user/authViaGitHub'}>*/}
          { !signedIn && <a className={styles.signInLink} href={'/auth/google'}>
            <Button className={styles.gitLoginBtn} alwaysActive>
              <i className={classnames('fa fa-google-plus', styles.subMenuOcto)}></i>
              <span className={styles.btnLabel}>With Google+</span>
            </Button>
          </a> }

          { signedIn && <span onClick={this.toggleSubMenu}><a className={styles.subMenuItem} href={`/profile`}>My Profile</a></span> }
          {/* { signedIn && <a className={styles.subMenuItem} href={'#'}>Settings</a> } */}
          { signedIn && <a className={styles.subMenuItem} href={'/auth/logout'}>Log Out</a> }
        </div>
      );
    }

    return null;
  }

  render() {
    const {
      signedIn,
      userName,
      avatar,
      signOutAction,
    } = this.props;

    if (signedIn) {
      return (
        <div style={{ position: 'relative' }}>
          <div className={styles.container} onClick={this.toggleSubMenu}>
            <img className={styles.userAvatar} src={avatar} alt={`${userName} Avatar`} />
            <span className={styles.title}>{userName}</span>
          </div>
          {this.renderSubMenu()}
        </div>
      );
    }

    return (
      <div className={styles.container}>
        <Button
          alwaysActive
          className={classnames(styles.signInBtn, styles.title)}
          onClick={this.toggleSubMenu}
        >
          Sign Up / Log In
        </Button>

        {this.renderSubMenu()}
      </div>
    );
  }
}

UserMenu.defaultProps = {
  signedIn: false,
  userName: '',
  gitHandler: '',
  avatar: '',
};

UserMenu.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  userName: PropTypes.string,
  gitHandler: PropTypes.string,
  avatar: PropTypes.string,
};

export default onClickOutside(UserMenu);
