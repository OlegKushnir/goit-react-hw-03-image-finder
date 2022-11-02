import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ id, webformatURL, tags, openImage }) => {
  return (
    <li className={css.galleryItem} onClick={() => openImage(id)}>
      <img src={webformatURL} alt={tags} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  openImage: PropTypes.func.isRequired,
};
