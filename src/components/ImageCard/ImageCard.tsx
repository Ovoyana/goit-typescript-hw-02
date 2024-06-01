import React from 'react';
import css from '../ImageCard/ImageCard.module.css';

interface Image {
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
}

interface ImageCardProps {
  item: Image;
  onImgClick: (url: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ item, onImgClick }) => {
  const {
    alt_description,
    urls: { small, regular },
  } = item;

  const handleImageClick = () => {
    if (typeof onImgClick === 'function') {
      onImgClick(regular);
    }
  };

  return (
    <div className={css.imageBox}>
      <img
        className={css.galleryImage}
        src={small}
        alt={alt_description}
        onClick={handleImageClick}
      />
    </div>
  );
}

export default ImageCard;