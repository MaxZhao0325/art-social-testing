import { background } from '@chakra-ui/react';
import React, { useState } from 'react';

function ImageUploadButton() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (event) => {
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div>
      <label style={{ backgroundColor: 'blue', color: 'white' }}>
        Upload an image
        <input
          type='file'
          accept='image/*'
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </label>
      {selectedImage && (
        <img
          style={{ width: 50, height: 50 }}
          src={selectedImage}
          alt='selected'
        />
      )}
    </div>
  );
}

export default ImageUploadButton;
