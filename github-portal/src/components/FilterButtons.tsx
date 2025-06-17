import React, { useState } from 'react';
import './FilterButtons.css';

const FilterButtons: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string>('All');

  const buttons = ['All', 'Collection Log', 'Achievements', 'Photos'];

  return (
    <div className="filter-buttons-container">
      {buttons.map((button) => (
        <button
          key={button}
          className={`filter-button ${activeButton === button ? 'active' : ''}`}
          onClick={() => setActiveButton(button)}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons; 