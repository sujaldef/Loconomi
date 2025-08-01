import React from 'react';
import { motion } from 'framer-motion';
import { FaBolt, FaWrench, FaHammer, FaPaintRoller, FaMapMarkerAlt, FaDollarSign, FaStar } from 'react-icons/fa';
import { fadeInUp, pulse } from './animations';

const FilterSidebar = ({ filters, setFilters }) => {
  const categories = [
    { name: 'Electrician', icon: <FaBolt className="text-blue-600 mr-2" /> },
    { name: 'Plumber', icon: <FaWrench className="text-blue-600 mr-2" /> },
    { name: 'Carpenter', icon: <FaHammer className="text-blue-600 mr-2" /> },
    { name: 'Painter', icon: <FaPaintRoller className="text-blue-600 mr-2" /> },
  ];
  const ratings = [4.5, 4.7, 4.8, 4.9];
  const availabilities = ['Available', 'Busy'];
  const sortOptions = ['distance', 'fastest'];

  const renderStars = (rating) => {
    const starCount = Math.floor(rating);
    return Array(starCount)
      .fill()
      .map((_, index) => <FaStar key={index} className="text-yellow-500 ml-1" />);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => {
      const currentValues = prev[filterType];
      if (currentValues.includes(value)) {
        return { ...prev, [filterType]: currentValues.filter((v) => v !== value) };
      }
      return { ...prev, [filterType]: [...currentValues, value] };
    });
  };

  const handleSearchChange = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleRadiusChange = (e) => {
    setFilters((prev) => ({ ...prev, radius: parseInt(e.target.value) }));
  };

  const handleWageChange = (e) => {
    setFilters((prev) => ({ ...prev, wage: parseInt(e.target.value) }));
  };

  const handleSortChange = (value) => {
    setFilters((prev) => ({ ...prev, sortBy: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: [],
      rating: [],
      availability: [],
      search: '',
      radius: 10,
      wage: 50,
      sortBy: 'distance',
    });
  };

  return (
    <motion.div
      className="md:w-1/5 m-5 bg-white p-4 rounded-lg shadow-md md:sticky md:top-0 md:h-screen z-10"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Filters</h2>
      <motion.input
        type="text"
        placeholder="Search professionals..."
        className="w-full px-3 py-1 mb-4 rounded-lg border border-blue-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        value={filters.search}
        onChange={handleSearchChange}
        whileFocus={{ scale: 1.05 }}
      />
      <div className="mb-4">
        <h3 className="text-base font-medium text-gray-700 mb-1">Category</h3>
        {categories.map((category) => (
          <motion.label
            key={category.name}
            className="flex items-center mb-1"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <input
              type="checkbox"
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-300"
              checked={filters.category.includes(category.name)}
              onChange={() => handleFilterChange('category', category.name)}
            />
            <span className="flex items-center text-gray-700">
              {category.icon}
              {category.name}
            </span>
          </motion.label>
        ))}
      </div>
      <div className="mb-4">
        <h3 className="text-base font-medium text-gray-700 mb-1 flex items-center">
          <FaMapMarkerAlt className="text-blue-600 mr-2" />
          Radius (km)
        </h3>
        <input
          type="range"
          min="1"
          max="50"
          value={filters.radius}
          onChange={handleRadiusChange}
          className="w-full h-1 bg-blue-200 rounded-lg appearance-none cursor-pointer"
        />
        <p className="text-gray-700 text-sm mt-1">{filters.radius} km</p>
      </div>
      <div className="mb-4">
        <h3 className="text-base font-medium text-gray-700 mb-1 flex items-center">
          <FaDollarSign className="text-blue-600 mr-2" />
          Max Wage ($/hour)
        </h3>
        <input
          type="range"
          min="10"
          max="100"
          value={filters.wage}
          onChange={handleWageChange}
          className="w-full h-1 bg-blue-200 rounded-lg appearance-none cursor-pointer"
        />
        <p className="text-gray-700 text-sm mt-1">${filters.wage}/hour</p>
      </div>
      <div className="mb-4">
        <h3 className="text-base font-medium text-gray-700 mb-1">Rating</h3>
        {ratings.map((rating) => (
          <motion.label
            key={rating}
            className="flex items-center mb-1"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <input
              type="checkbox"
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-300"
              checked={filters.rating.includes(rating)}
              onChange={() => handleFilterChange('rating', rating)}
            />
            <span className="flex items-center text-gray-700">
              {rating} {renderStars(rating)}
            </span>
          </motion.label>
        ))}
      </div>
      <div className="mb-4">
        <h3 className="text-base font-medium text-gray-700 mb-1">Availability</h3>
        {availabilities.map((availability) => (
          <motion.label
            key={availability}
            className="flex items-center mb-1"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <input
              type="checkbox"
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-300"
              checked={filters.availability.includes(availability)}
              onChange={() => handleFilterChange('availability', availability)}
            />
            <span className="text-gray-700">{availability}</span>
          </motion.label>
        ))}
      </div>
      <div className="mb-4">
        <h3 className="text-base font-medium text-gray-700 mb-1">Sort By</h3>
        {sortOptions.map((option) => (
          <motion.label
            key={option}
            className="flex items-center mb-1"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <input
              type="radio"
              name="sortBy"
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-300"
              checked={filters.sortBy === option}
              onChange={() => handleSortChange(option)}
            />
            <span className="text-gray-700">{option === 'distance' ? 'Nearest' : 'Fastest Arrival'}</span>
          </motion.label>
        ))}
      </div>
      <motion.button
        className="w-full bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700"
        onClick={clearFilters}
        whileHover="hover"
        whileTap="tap"
        variants={pulse}
      >
        Clear Filters
      </motion.button>
    </motion.div>
  );
};

export default FilterSidebar;