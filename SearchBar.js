import React, { useState, useEffect } from "react";

const SearchBar = ({ onSearch, onNumImagesChange, selectedBreed }) => {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numImages, setNumImages] = useState(1);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await response.json();
        if (response.ok) {
          const breedList = Object.keys(data.message);
          setBreeds(breedList);
          setLoading(false);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        setError("Error loading breeds.");
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  const handleSelectBreed = (event) => {
    const selectedBreed = event.target.value;
    onSearch(selectedBreed);
  };

  const handleNumImagesChange = (event) => {
    const numImages = parseInt(event.target.value);
    onNumImagesChange(numImages);
    setNumImages(numImages);
  };

  const handleShowImages = () => {
    onSearch(selectedBreed);
  };

  if (loading) {
    return <div>Loading breeds...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Search Bar</h2>
      <div>
        <label htmlFor="breedSelect">Select Breed:</label>
        <select id="breedSelect" value={selectedBreed} onChange={handleSelectBreed}>
          <option value="">Select a breed</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="numImagesInput">Number of Images:</label>
        <input
          id="numImagesInput"
          type="number"
          min="1"
          max="100"
          value={numImages}
          onChange={handleNumImagesChange}
        />
      </div>
      <button onClick={handleShowImages}>Show Images</button>
    </div>
  );
};

export default SearchBar;