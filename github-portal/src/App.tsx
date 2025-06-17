import React from 'react';
import './App.css';
import HamburgerMenu from './components/HamburgerMenu';
import FilterButtons from './components/FilterButtons';

function App() {
  return (
    <div className="App">
      <HamburgerMenu />
      <main className="content-container">
        <div className="image-wrapper">
          <img src="/Suntory_Logo.png" alt="Suntory" className="centered-image" />
        </div>
        <FilterButtons />
      </main>
    </div>
  );
}

export default App;
