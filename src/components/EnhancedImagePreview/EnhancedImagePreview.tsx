import React, { useState, useRef, useEffect } from 'react';

interface ImageSource {
  uri: string;
  id: string;
  type: string;
}

interface ImagePreviewProps {
  images: ImageSource[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

const ImagePreview: React.FC<{}> = ({ 
  images, 
  initialIndex,
  visible, 
  onRequestClose,
  onImageIndexChange 
}) => {
  return (
    <div className="flex flex-col items-center">
      <h2>Image Preview Component</h2>
      {images.map((image, idx) => (
        <img key={image.id} src={image.uri} alt="preview" 
            style={currentImageIndex === idx ? { display: 'block' } : { display: 'none' }} 
      />
      ))}
    </div>
  );
};

export default ImagePreview;
export { default as ImagePreview } from './ImagePreview';