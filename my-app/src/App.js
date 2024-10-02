import React, { useState } from 'react';
import './App.css'; // Import CSS for styling
import ThemeSwitcher from './ThemeSwitcher';
import MyDiverseForm from './MyDiverseForm';
const App = () => {


  return (
    <div>
      <ThemeSwitcher />
      <MyDiverseForm />
    </div>

  );
};

export default App;
