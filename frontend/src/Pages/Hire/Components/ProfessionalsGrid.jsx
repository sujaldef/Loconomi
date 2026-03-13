import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaSpinner } from 'react-icons/fa';
import { useProviders } from '../../../context/ProviderContext';
import { fadeInUp, pulse } from './animations';

const ProfessionalsGrid = ({ filters }) => {
  const { data: professionals, loading } = useProviders();

  const renderStars = (rating) => {
    const starCount = Math.floor(rating);
    return Array(starCount)
      .fill()
      .map((_, index) => (
        <FaStar key={index} className="text-yellow-500 ml-1" />
      ));
  };

  const filteredProfessionals = professionals.filter((pro) => {
    const matchesSearch =
      filters.search === '' ||
      pro.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesWage = pro.wage <= filters.wage;
    return matchesSearch && matchesWage;
  });

  if (loading) {
    return (
      <div className="md:w-3/4 px-6 py-12 flex items-center justify-center">
        <FaSpinner className="text-4xl text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="md:w-3/4 px-6 py-12">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        {filteredProfessionals.length === 0 ? (
          <p className="text-gray-700 col-span-full text-center py-12">
            No professionals found matching your criteria.
          </p>
        ) : (
          filteredProfessionals.map((pro) => (
            <motion.div
              key={pro._id}
              className="bg-white p-6 rounded-lg shadow-md border border-blue-200 hover:shadow-lg hover:shadow-blue-300/50 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center mb-4">
                <img
                  src={pro.profileImage || '/default.png'}
                  alt={pro.name}
                  className="w-12 h-12 rounded-full object-cover mr-4 bg-gray-200"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {pro.name}
                  </h3>
                  <p className="text-blue-600">{pro.role}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Wage:</span> ${pro.wage}/hour
                </p>
                <p className="text-gray-700 flex items-center">
                  <span className="font-medium">Rating:</span>{' '}
                  {pro.rating.toFixed(1)} {renderStars(pro.rating)}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Status:</span>{' '}
                  <span
                    className={
                      pro.availability === 'Available'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }
                  >
                    {pro.availability}
                  </span>
                </p>
                {pro.description && (
                  <p className="text-gray-600 text-sm">{pro.description}</p>
                )}
              </div>
              <motion.button
                className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                whileHover="hover"
                whileTap="tap"
                variants={pulse}
                disabled={pro.availability !== 'Available'}
              >
                {pro.availability === 'Available'
                  ? 'Hire Now'
                  : 'Currently Busy'}
              </motion.button>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default ProfessionalsGrid;
