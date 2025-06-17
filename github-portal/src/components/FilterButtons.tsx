import React from 'react';
import './FilterButtons.css';

interface FilterButtonsProps {
  onFilterChange: (filter: string) => void;
  activeFilter: string;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ onFilterChange, activeFilter }) => {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'whisky', label: 'Whisky' },
    { id: 'beer', label: 'Beer' },
    { id: 'wine', label: 'Wine' },
    { id: 'spirits', label: 'Spirits' }
  ];

  return (
    <div className="filter-buttons">
      {filters.map(filter => (
        <button
          key={filter.id}
          className={`filter-button ${activeFilter === filter.id ? 'active' : ''}`}
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons; 