import React, { useState, useEffect, useRef } from 'react';
import Hamburger from 'hamburger-react';
import './HamburgerMenu.css';

interface HamburgerMenuProps {
  children?: React.ReactNode;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

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
      <div ref={buttonRef} className="hamburger-container">
        <Hamburger
          toggled={isOpen}
          toggle={setIsOpen}
          size={32}
          color="#ffffff"
          rounded
          label="Show menu"
          hideOutline={false}
        />
      </div>
      
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