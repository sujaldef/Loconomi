import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaUserCheck, FaTruck } from 'react-icons/fa';
import { slideInLeft, slideInRight } from './animations';

const BookingSteps = () => {
  const bookingSteps = [
    {
      step: 'Step 1: Search for a Service',
      description: 'Use our search bar to find the service you need, such as delivery, home services, or mobile vendors, within a 1km radius.',
      icon: <FaSearch className="h-12 w-12 text-blue-600" />,
    },
    {
      step: 'Step 2: Choose a Provider',
      description: 'Browse verified providers, check their ratings and reviews, and select the one that best fits your needs.',
      icon: <FaUserCheck className="h-12 w-12 text-blue-600" />,
    },
    {
      step: 'Step 3: Book and Get Service',
      description: 'Connect directly with the provider, negotiate terms, and get the service delivered right to your doorstep.',
      icon: <FaTruck className="h-12 w-12 text-blue-600" />,
    },
  ];

  return (
    <section className="py-20 px-4 md:px-6 bg-white relative">
      <h2 className="text-3xl font-bold text-center mb-12">How to Book Your First Service</h2>
      <div className="relative max-w-5xl mx-auto">
        <svg
          className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-24"
          fill="none"
          viewBox="0 0 100 400"
          preserveAspectRatio="none"
        >
          <path
            d="M50 20 C50 100, 70 150, 50 200 C30 250, 70 300, 50 380"
            stroke="#60a5fa"
            strokeWidth="4"
            strokeDasharray="5,5"
          />
        </svg>
        {bookingSteps.map((step, index) => (
          <motion.div
            key={`step-${index}`}
            className={`flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            initial="hidden"
            whileInView="visible"
            variants={index % 2 === 0 ? slideInLeft : slideInRight}
            viewport={{ once: true }}
          >
            <div className="w-full md:w-5/12">
              <motion.div
                className="bg-gray-50 p-6 rounded-lg shadow-md"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="mb-4 flex justify-center">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-center">{step.step}</h3>
                <p className="text-gray-700 text-center">{step.description}</p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BookingSteps;