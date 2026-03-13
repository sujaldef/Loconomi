import React, { useState, useEffect } from 'react';
import { useProviders } from '../../context/ProviderContext';
import FilterSidebar from './Components/FilterSidebar';
import ProfessionalsGrid from './Components/ProfessionalsGrid';

const Hire = () => {
  const { fetchProviders, loading, error } = useProviders();
  const [filters, setFilters] = useState({
    category: [],
    rating: [],
    availability: [],
    search: '',
    radius: 10,
    wage: 50,
    page: 1,
    limit: 20,
  });

  useEffect(() => {
    // Fetch providers when component mounts or filters change
    const apiFilters = {};
    if (filters.category.length > 0) {
      apiFilters.role = filters.category[0]; // API expects single role
    }
    if (filters.availability.length > 0) {
      apiFilters.availability = filters.availability[0];
    }
    if (filters.rating.length > 0) {
      apiFilters.minRating = Math.min(...filters.rating);
    }

    fetchProviders(filters.page, filters.limit, apiFilters);
  }, [filters, fetchProviders]);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
      page: 1, // Reset to page 1 when filters change
    }));
  };

  return (
    <div className="bg-gradient-to-b pb-30 from-blue-50 to-white min-h-screen">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      <div className="flex flex-col md:flex-row">
        <FilterSidebar filters={filters} setFilters={handleFilterChange} />
        <ProfessionalsGrid filters={filters} />
      </div>
    </div>
  );
};

export default Hire;
