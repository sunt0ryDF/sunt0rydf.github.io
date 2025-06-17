import React, { useState } from 'react';
import './App.css';
import HamburgerMenu from './components/HamburgerMenu';
import FilterButtons from './components/FilterButtons';
import Showcase from './components/Showcase';

function App() {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="App">
      <HamburgerMenu />
      <div className="header-section">
        <div className="image-wrapper">
          <img src="/Suntory_Logo.png" alt="Suntory" className="centered-image" />
        </div>
        <FilterButtons 
          onFilterChange={setActiveFilter}
          activeFilter={activeFilter}
        />
      </div>
      <div className="showcase-section">
        <Showcase activeFilter={activeFilter} />
      </div>
    </div>
  );
}

export default App;
