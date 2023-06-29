import React, { useState, useEffect } from "react";

// ImageList
const ImageList = ({ breed, numImages }) => {
  // Setting the image list to be empty, loading to false and error to null
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      // Starts loading if a breed is selected
      if (breed) {
        setLoading(true);
        // Tries to fetch the images
        try {
          const response = await fetch(
            `https://dog.ceo/api/breed/${breed}/images/random/${numImages}`
          );
          const data = await response.json();
          // If the images can't be fetched, am error is thrown
          if (response.ok) {
            setImages(data.message);
          } else {
            throw new Error(data.message);
          }
          // Loading is returned to false after loading is complete
          setLoading(false);
          // Another error catch, if the images cannot be found
        } catch (error) {
          setError("Error loading images.");
          setLoading(false);
        }
        // If the breed has not been selected, the image list is set to empty
      } else {
        setImages([]);
      }
    };

    fetchImages();
  }, [breed, numImages]);

  // Loading message to be displayed if images are loading
  if (loading) {
    return <div>Loading images...</div>;
  }

  // Error message to be displayed if images cannot be loaded, provides the specific error
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {images.length > 0 ? (
        // An unordered list is created to store the images
        <ul className = "extraPadding">
          {/* Images are mapped */}
          {images.map((image, index) => (
            // A list item is created, containing a div which itself contains a dog image
            <li key={index}>
                <div className = "picDiv">
                <img src={image} alt={`Dog ${index + 1}`} className = "img"/>
                </div>
            </li>
          ))}
        </ul>
      ) : (
        // If no images have been selected or are available (if the images list is empty) a message is displayed
        <div>No images available</div>
      )}
    </div>
  );
};

export default ImageList;
