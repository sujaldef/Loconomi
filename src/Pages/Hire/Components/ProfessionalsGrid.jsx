import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { fadeInUp, pulse } from './animations';

const ProfessionalsGrid = ({ filters }) => {
  const professionals = [
    { id: 1, name: 'John Doe', role: 'Electrician', rating: 4.8, availability: 'Available', image: '/guest1.png', wage: 60 },
    { id: 2, name: 'Jane Smith', role: 'Plumber', rating: 4.5, availability: 'Available', image: '/guest2.jpg', wage: 45 },
    { id: 3, name: 'Mike Brown', role: 'Carpenter', rating: 4.7, availability: 'Busy', image: '/guest3.jpg', wage: 50 },
    { id: 4, name: 'Emily Davis', role: 'Electrician', rating: 4.9, availability: 'Available', image: '/guest1.png', wage: 70 },
    { id: 5, name: 'Chris Wilson', role: 'Painter', rating: 4.6, availability: 'Available', image: '/guest2.jpg', wage: 40 },
    { id: 6, name: 'Sarah Lee', role: 'Plumber', rating: 4.8, availability: 'Busy', image: '/guest3.jpg', wage: 55 },
    { id: 7, name: 'Mike Brown', role: 'Carpenter', rating: 4.7, availability: 'Busy', image: '/guest3.jpg', wage: 50 },
    { id: 8, name: 'Emily Davis', role: 'Electrician', rating: 4.9, availability: 'Available', image: '/guest1.png', wage: 70 },
    { id: 9, name: 'Chris Wilson', role: 'Painter', rating: 4.6, availability: 'Available', image: '/guest2.jpg', wage: 40 },
    { id: 10, name: 'Sarah Lee', role: 'Plumber', rating: 4.8, availability: 'Busy', image: '/guest3.jpg', wage: 55 },
    { id: 11, name: 'Mike Brown', role: 'Carpenter', rating: 4.7, availability: 'Busy', image: '/guest3.jpg', wage: 50 },
    { id: 12, name: 'Emily Davis', role: 'Electrician', rating: 4.9, availability: 'Available', image: '/guest1.png', wage: 70 },
    { id: 13, name: 'Chris Wilson', role: 'Painter', rating: 4.6, availability: 'Available', image: '/guest2.jpg', wage: 40 },
    { id: 14, name: 'Sarah Lee', role: 'Plumber', rating: 4.8, availability: 'Busy', image: '/guest3.jpg', wage: 55 },
  ];

  const renderStars = (rating) => {
    const starCount = Math.floor(rating);
    return Array(starCount)
      .fill()
      .map((_, index) => <FaStar key={index} className="text-yellow-500 ml-1" />);
  };

  const filteredProfessionals = professionals.filter((pro) => {
    const matchesCategory = filters.category.length === 0 || filters.category.includes(pro.role);
    const matchesRating = filters.rating.length === 0 || filters.rating.includes(pro.rating);
    const matchesAvailability = filters.availability.length === 0 || filters.availability.includes(pro.availability);
    const matchesSearch = filters.search === '' || pro.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesRadius = true; // Placeholder for geolocation
    const matchesWage = pro.wage <= filters.wage;
    return matchesCategory && matchesRating && matchesAvailability && matchesSearch && matchesRadius && matchesWage;
  });

  return (
    <div className="md:w-3/4 px-6 py-12">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        {filteredProfessionals.length === 0 ? (
          <p className="text-gray-700 col-span-full text-center">No professionals found matching your criteria.</p>
        ) : (
          filteredProfessionals.map((pro) => (
            <motion.div
              key={pro.id}
              className="bg-white p-6 rounded-lg shadow-md border border-blue-200 hover:shadow-lg hover:shadow-blue-300/50 transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center mb-4">
                <img
                  src={pro.image}
                  alt={pro.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{pro.name}</h3>
                  <p className="text-blue-600">{pro.role}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Wage:</span> ${pro.wage}/hour
                </p>
                <p className="text-gray-700 flex items-center">
                  <span className="font-medium">Rating:</span> {pro.rating} {renderStars(pro.rating)}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Availability:</span>{' '}
                  <span className={pro.availability === 'Available' ? 'text-green-600' : 'text-red-600'}>
                    {pro.availability}
                  </span>
                </p>
              </div>
              <motion.button
                className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                whileHover="hover"
                whileTap="tap"
                variants={pulse}
              >
                Hire Now
              </motion.button>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default ProfessionalsGrid;