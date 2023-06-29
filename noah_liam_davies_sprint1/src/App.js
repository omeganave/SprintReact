// Sprint 1: Dog API Website

// Most React work by Noah Gillard
// Figma mockup by Liam Scott and Evan Davies
// Figma implementation/CSS by Evan Davies
// Comments attempted by Evan Davies (Noah was unavailable, I tried my best, but comments may be a bit generic)

// Submitted June 29, 2023

// SITE IS BEST VIEWED IN FULL SCREEN ON GOOGLE CHROME!! OTHERWISE, ELEMENTS WON'T BE POSITIONED QUITE RIGHT!!


// Importing other .js files into App.js
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import ImageList from "./ImageList";

// App
const App = () => {
  // Sets breed to a starting state of "", and number of images to 1
  const [breed, setBreed] = useState("");
  const [numImages, setNumImages] = useState(1);

  // Updates selected breed whenever handleSearch is updated
  const handleSearch = (selectedBreed) => {
    setBreed(selectedBreed);
  };

  return (
    <>
    {/* Creates the header (the bar and page title at the top of the screen) */}
    <header>
    <div className="header">
      <div className="headerText">DOG IMAGE SEARCH</div>
    </div>
    </header>
    {/* Displays the search bar from SearchBar.js, and the list of dog images from ImageList.js */}
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