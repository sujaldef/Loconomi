import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { containerVariants, slideVariants } from './animations';

const TestimonialsSection = ({ testimonialsRef, testimonialsControls }) => {
  const testimonials = [
    { quote: 'Amazing service! Found a skilled electrician quickly.', author: 'John D.', rating: 5 },
    { quote: 'The plumber was professional and fixed everything perfectly.', author: 'Sarah M.', rating: 4 },
    { quote: 'Highly recommend their carpenters for custom work!', author: 'Emma L.', rating: 5 },
  ];

  return (
    <section ref={testimonialsRef} className="py-20 px-6 md:px-20 bg-gradient-to-b from-blue-50 to-white text-center">
      <motion.h2
        className="text-4xl font-bold mb-8 text-blue-700"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        What Our Customers Say
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={testimonialsControls}
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg"
            variants={slideVariants}
          >
            <FaQuoteLeft className="text-blue-600 mb-4 text-2xl" />
            <p className="text-gray-700 mb-4">{testimonial.quote}</p>
            <div className="flex items-center justify-center space-x-1 mb-2">
              {[...Array(testimonial.rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-800 font-semibold">{testimonial.author}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;