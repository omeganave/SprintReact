
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import ImageList from "./ImageList";

const App = () => {
  const [breed, setBreed] = useState("");
  const [numImages, setNumImages] = useState(1);

  const handleSearch = (selectedBreed) => {
    setBreed(selectedBreed);
  };

  return (
    <>
    <header>
    <div className="header">
      <div className="headerText">DOG IMAGE SEARCH</div>
    </div>
    </header>
    <div className="App">
      <SearchBar
        onSearch={handleSearch}
        onNumImagesChange={setNumImages}
        selectedBreed={breed}
      />
      <ImageList breed={breed} numImages={numImages} />
    </div>
    </>
  );
};

export default App;