import React from 'react';
import ImageCard from '../ImageCard/ImageCard';
import css from '../ImageGallery/ImageGallery.module.css';

interface Image {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
}

interface ImageGalleryProps {
  items: Image[];
  openModal: (url: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ items, openModal }) => {
  return (
    <section className={css.galleryBox}>
    <ul className={css.gallery}>
      {items.map((item, index) => (
        <li className={css.image} key={`${item.id}-${index}`}>
          <ImageCard item={item} onImgClick={openModal} />
        </li>
      ))}
    </ul>
    </section>
  );
};

export default ImageGallery;