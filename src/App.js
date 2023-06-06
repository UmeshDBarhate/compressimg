import imageCompression from "browser-image-compression";
import './App.css';
import React, { useState } from 'react';


function App() {
  const compressImage = async (imageFile) => {
    console.log(imageFile)
    console.log(imageFile instanceof Blob)
    const options = {
      maxSizeMB: 1, // Maximum size of the compressed image (in megabytes)
      maxWidthOrHeight: 800, // Maximum width or height of the compressed image
      useWebWorker: true, // Use web workers for faster compression (recommended)
    };
  
    try {
      const compressedFile = await imageCompression(imageFile, options);
      return compressedFile;
    } catch (error) {
      console.error('Error compressing image:', error);
      throw error;
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleCompressImage = async () => {
    try {
      const compressedFile = await compressImage(selectedImage);

      console.log( compressedFile instanceof Blob )
      console.log( compressedFile )
      setCompressedImage(compressedFile);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleCompressImage}>Compress Image</button>

      {compressedImage && (
        <div>
          <p>Compressed Image:</p>
          <img src={URL.createObjectURL(compressedImage)} alt="Compressed" />
        </div>
      )}
    </div>
  );
}

export default App;
