import React, { useEffect, useState } from 'react';
import { fetchImages } from './request-api';
import ImageGallery from './ImageGallery/ImageGallery';
import SearchBar from './SearchBar/SearchBar';
import ImageModal from './ImageModal/ImageModal';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import toast, { Toaster } from 'react-hot-toast';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import css from './App.module.css';

interface Image {
  id: string;
  description: string;
  alt_description: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
}

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSearch = async (newQuery: string) => {
    if (!newQuery.trim()) {
      toast.error('Enter a search query');
      return;
    }
    setImages([]);
    setIsLoading(true);
    setError('');
    setQuery(newQuery);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
    setIsModalOpen(true);
  };

  const modalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function getImages() {
      if (!query) return;

      setIsLoading(true);
      setError('');

      try {
        const data = await fetchImages(query, page);

        if (data.results.length === 0) {
          toast.error('No images were found for your request');
        }

        setImages(prevImages => [...prevImages, ...data.results]);
      } catch (err: any) {
        setError(err.message);
        toast.error('Error occured during loading');
      } finally {
        setIsLoading(false);
      }
    }

    getImages();
  }, [query, page]);

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} />
      <Toaster />
      {error && <ErrorMessage />}
      {images.length > 0 && (
        <ImageGallery items={images} openModal={handleImageClick} />
      )}
      {isLoading && <Loader />}
      {images.length > 0 && images.length > 9 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}

      <ImageModal
        isOpen={isModalOpen}
        onClose={modalClose}
        imageUrl={selectedImageUrl}
      />
    </div>
  );
};

export default App;