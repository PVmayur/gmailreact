import React, { useState } from 'react';
import './ThemeSwitcher.css'; // Importing specific CSS for the theme switcher

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState('light'); // State to track current theme

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    document.body.className = ''; // Reset body class before adding the new one
    document.body.classList.add(theme); // Apply the theme to the body
  };

  return (
    <div className="theme-switcher">
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
};

export default ThemeSwitcher;
