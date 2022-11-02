import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, openImage }) => {
  return (
    <ul className={css.gallery}>
      {images.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          webformatURL={webformatURL}
          tags={tags}
          openImage={openImage}
        />
      ))}
    </ul>
  );
};
ImageGallery.propTypes = {
  openImage: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
