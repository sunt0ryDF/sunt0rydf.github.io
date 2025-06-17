import React, { useState, useEffect, useRef } from 'react';
import './HamburgerMenu.css';

interface HamburgerMenuProps {
  children?: React.ReactNode;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && 
          menuRef.current && 
          !menuRef.current.contains(e.target as Node) && 
          buttonRef.current && 
          !buttonRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button 
        ref={buttonRef}
        className={`hamburger-menu ${isOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>
      
      <div 
        ref={menuRef}
        className={`menu-overlay ${isOpen ? 'active' : ''}`}
        aria-hidden={!isOpen}
      >
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