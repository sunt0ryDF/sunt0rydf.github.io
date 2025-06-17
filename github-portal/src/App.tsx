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
      <main className="content-container">
        <div className="image-wrapper">
          <img src="/Suntory_Logo.png" alt="Suntory" className="centered-image" />
        </div>
        <FilterButtons 
          onFilterChange={setActiveFilter}
          activeFilter={activeFilter}
        />
        <Showcase activeFilter={activeFilter} />
      </main>
    </div>
  );
}

export default App;
