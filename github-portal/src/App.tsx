import React from 'react';
import './App.css';
import HamburgerMenu from './components/HamburgerMenu';

function App() {
  return (
    <div className="App">
      <HamburgerMenu>
        <h2>Menu Content</h2>
        <p>Add your menu items here</p>
      </HamburgerMenu>
      <img src="/test.png" alt="Test" className="centered-image" />
    </div>
  );
}

export default App;
