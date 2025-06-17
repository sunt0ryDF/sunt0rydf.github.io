import React, { useState } from 'react';
import './HamburgerMenu.css';

interface HamburgerMenuProps {
  children?: React.ReactNode;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button 
        className={`hamburger-button ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>
      
      <div className={`menu-overlay ${isOpen ? 'open' : ''}`}>
        <div className="menu-content">
          <div className="menu-headers">
            <h2 className="menu-header">Account Progression</h2>
            <h2 className="menu-header">About</h2>
            <h2 className="menu-header">Guides</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu; 