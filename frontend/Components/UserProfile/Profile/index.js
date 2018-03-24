import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles.css';

class Profile extends Component {
  render() {
    const {
      name,
      gitHandler,
      location,
      thumbnail,
    } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.avatarContainer}>
          <img className={styles.avatar} src={thumbnail} alt={`${name} avatar`} />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.name}>{ name }</div>
          <div className={styles.gitHandler}><i className={classnames('fa fa-github-alt', styles.gitIcon)}></i> { gitHandler }</div>
          <div className={styles.location}>{ location }</div>
        </div>
      </div>
    );
  }
}

Profile.defaultProps = {
  name: 'Hello World',
  gitHandler: 'helloWorld',
  location: 'Somewhere in the world',
  thumbnail: 'https://google.com',
};

Profile.propTypes = {
  name: PropTypes.string,
  gitHandler: PropTypes.string,
  location: PropTypes.string,
  thumbnail: PropTypes.string,
};

export default Profile;
