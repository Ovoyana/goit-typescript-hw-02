import React, { useEffect } from 'react';
import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrl }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={css.Overlay}
      className={css.Modal}
    >
      <img src={imageUrl} alt="Modal" className={css.image} />
    </Modal>
  );
};

export default ImageModal;