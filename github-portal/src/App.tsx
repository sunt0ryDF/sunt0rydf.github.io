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
          <img src="/test.png" alt="Test" className="centered-image" />
        </div>
        <h1 className="test-text">TEST</h1>
        <FilterButtons />
      </main>
    </div>
  );
}

export default App;
