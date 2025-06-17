import React, { useState, useEffect } from 'react';
import './Showcase.css';

interface Image {
  src: string;
  alt: string;
  category: string;
}

interface ShowcaseProps {
  activeFilter: string;
}

const Showcase: React.FC<ShowcaseProps> = ({ activeFilter }) => {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  useEffect(() => {
    // Load images from the showcase directory
    const loadImages = async () => {
      try {
        const response = await fetch('/showcase/images.json');
        const data = await response.json();
        console.log('Loaded images:', data); // Debug log
        setImages(data);
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    loadImages();
  }, []);

  // Map filter IDs to folder names
  const getCategoryFolder = (filter: string) => {
    switch (filter) {
      case 'collection':
        return 'collection';
      case 'achievements':
        return 'achievements';
      case 'photos':
        return 'photos';
      default:
        return 'all';
    }
  };

  const filteredImages = images.filter(image => {
    const categoryFolder = getCategoryFolder(activeFilter);
    console.log('Filtering:', { activeFilter, categoryFolder, imageCategory: image.category }); // Debug log
    return categoryFolder === 'all' ? true : image.category === categoryFolder;
  });

  const openLightbox = (image: Image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="showcase-container">
      <div className="image-grid">
        {filteredImages.map((image, index) => (
          <div 
            key={index} 
            className="image-item"
            onClick={() => openLightbox(image)}
          >
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={closeLightbox}>×</button>
            <img src={selectedImage.src} alt={selectedImage.alt} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Showcase; 