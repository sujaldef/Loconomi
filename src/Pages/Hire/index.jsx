import React, { useState } from 'react';
import FilterSidebar from './Components/FilterSidebar';
import ProfessionalsGrid from './Components/ProfessionalsGrid';

const Hire = () => {
  const [filters, setFilters] = useState({
    category: [],
    rating: [],
    availability: [],
    search: '',
    radius: 10,
    wage: 50,
  });

  return (
    <div className="bg-gradient-to-b pb-30 from-blue-50 to-white min-h-screen">
      <div className="flex flex-col md:flex-row">
        <FilterSidebar filters={filters} setFilters={setFilters} />
        <ProfessionalsGrid filters={filters} />
      </div>
    </div>
  );
};

export default Hire;