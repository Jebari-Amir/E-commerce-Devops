"use client"
import React, { useState } from 'react';

const Carousel = ({ images, changeMainImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleImages = 5;

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const displayedImages = images.slice(currentIndex, currentIndex + visibleImages);

  return (
    <div className="flex space-x-2 mt-4 items-center">
      <button onClick={handlePrevClick} className="p-2 bg-gray-200 rounded-full">←</button>
      {displayedImages.map((image, index) => (
        <img
          key={index}
          src={image.url}
          alt={`Thumbnail ${index}`}
          className="w-24 h-24 object-cover cursor-pointer"
          onClick={() => changeMainImage(image.url)}
        />
      ))}
      <button onClick={handleNextClick} className="p-2 bg-gray-200 rounded-full">→</button>
    </div>
  );
};

export default Carousel;
