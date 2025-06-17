import React from 'react';
import './FilterButtons.css';

interface FilterButtonsProps {
  onFilterChange: (filter: string) => void;
  activeFilter: string;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ onFilterChange, activeFilter }) => {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'collection', label: 'Collection Log' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'photos', label: 'Photos' }
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