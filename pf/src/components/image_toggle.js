import React, { useState } from "react";
import "./App.css";

function App() {
  // 1. Import the useState hook from React
  // 2. Add a state variable called isFullScreen and initialize it to false
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <div className="App">
      {/* 3. Add an onClick event listener to the img element and set its callback to a function that toggles the value of isFullScreen */}
      <img
        src={gym}
        alt="Your image description here"
        className={`full-size-img ${isFullScreen ? "full-screen" : ""}`}
        onClick={() => setIsFullScreen(!isFullScreen)}
      />
    </div>
  );
}

// 4. Add a CSS class to your img element that sets the width and height properties to 100% when isFullScreen is true, and to the original width and height of the image when isFullScreen is false
