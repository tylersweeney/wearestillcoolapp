import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

import RichEditor from 'Components/RichEditor';

class ReplyBox extends Component {
  render() {
    const {
      posting,
      onSubmit,
      onChange,
    } = this.props;

    if (posting) return <div className={styles.loadingWrapper}>Posting your opinion...</div>;

    return (
      <RichEditor
        type="newOpinion"
        onSave={onSubmit}
        onChange={onChange}
      />
    );
  }
}

ReplyBox.defaultProps = {
  posting: false,
  onSubmit: () => { },
  onChange: (value) => { },
};

ReplyBox.propTypes = {
  posting: PropTypes.bool,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
};

export default ReplyBox;
