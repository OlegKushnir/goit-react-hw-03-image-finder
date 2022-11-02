import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, tags, openImage, largeImageURL }) => {
  return (
    <li className={css.galleryItem} onClick={() => openImage(largeImageURL)}>
      <img src={webformatURL} alt={tags} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  openImage: PropTypes.func.isRequired,
};
