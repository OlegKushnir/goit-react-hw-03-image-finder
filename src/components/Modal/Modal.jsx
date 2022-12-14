import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
export class Modal extends Component {
  handleKeyDown = e => {
    if (e.code === 'Escape') this.props.closeOnEscape();
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { largeImageURL, closeImage } = this.props;
    return (
      <div className={css.overlay} onClick={e => closeImage(e)}>
        <div className={css.modal}>
          <img src={largeImageURL} alt="" />
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  closeImage: PropTypes.func.isRequired,
  closeOnEscape: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
