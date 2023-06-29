import React, { useState, useEffect } from "react";

// SearchBar
const SearchBar = ({ onSearch, onNumImagesChange, selectedBreed }) => {
  // Breeds selection list is set to a blank array, loading is set to true, error to null, and the number of images to 1
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [numImages, setNumImages] = useState(1);

  useEffect(() => {
    // Fetching the list of breeds
    const fetchBreeds = async () => {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await response.json();
        // If the breed list is available, the breed selector is set to the list of breeds, and loading is complete
        if (response.ok) {
          const breedList = Object.keys(data.message);
          setBreeds(breedList);
          setLoading(false);
          // If not, an error is thrown
        } else {
          throw new Error(data.message);
        }
        // Another error catch
      } catch (error) {
        setError("Error loading breeds.");
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  // Event to handle when the user selects a breed from the list
  const handleSelectBreed = (event) => {
    const selectedBreed = event.target.value;
    onSearch(selectedBreed);
  };

  // Event to handle when the user changes the number of images
  const handleNumImagesChange = (event) => {
    const numImages = parseInt(event.target.value);
    onNumImagesChange(numImages);
    setNumImages(numImages);
  };

  // Shows images based on the breed selected (?)
  const handleShowImages = () => {
    onSearch(selectedBreed);
  };

  // Loading message when loading the breed list
  if (loading) {
    return <div>Loading breeds...</div>;
  }

  // Error message, displays specific error messages
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <br /><br /><br /><br /><br /><br />
      <div>
        {/* Creates the breed selection box */}
        <select id="breedSelect" value={selectedBreed} onChange={handleSelectBreed} className = "selectBox">
          <option value="">Select a breed</option>
          {/* Fills the breed selection box with all the breeds, fetched earlier */}
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </div>
      <div>
        {/* Creates the image number selection box, with a minimum value of 1 and a maximum value of 100 */}
        <input
          id="numImagesInput"
          type="number"
          min="1"
          max="100"
          value={numImages}
          onChange={handleNumImagesChange}
          className = "numBox"
        />
      </div>
      {/* Creates "Show Images" button. Currently not functional, as whenever the breed or number box are updated, the list is updated automatically. Ran out of time to fix this issue. */}
      <button onClick={handleShowImages} className = "showBox">Show Images</button>
      <br /> <br />
    </div>
  );
};

export default SearchBar;