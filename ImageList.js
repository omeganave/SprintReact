import React, { useState, useEffect } from "react";

const ImageList = ({ breed, numImages }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      if (breed) {
        setLoading(true);
        try {
          const response = await fetch(
            `https://dog.ceo/api/breed/${breed}/images/random/${numImages}`
          );
          const data = await response.json();
          if (response.ok) {
            setImages(data.message);
          } else {
            throw new Error(data.message);
          }
          setLoading(false);
        } catch (error) {
          setError("Error loading images.");
          setLoading(false);
        }
      } else {
        setImages([]);
      }
    };

    fetchImages();
  }, [breed, numImages]);

  if (loading) {
    return <div>Loading images...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Image List</h2>
      {images.length > 0 ? (
        <ul>
          {images.map((image, index) => (
            <li key={index}>
              <img src={image} alt={`Dog ${index + 1}`} />
            </li>
          ))}
        </ul>
      ) : (
        <div>No images available</div>
      )}
    </div>
  );
};

export default ImageList;

