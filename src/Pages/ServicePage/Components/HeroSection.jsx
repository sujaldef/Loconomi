import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ searchTerm, setSearchTerm }) => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-400 text-white flex flex-col items-center justify-center py-24 px-6 md:px-20 overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-300 opacity-20"
          style={{
            width: Math.random() * 50 + 20,
            height: Math.random() * 50 + 20,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: Math.random() * 4 + 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      <motion.div
        className="text-center z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover Our Expert Services
        </h1>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Connect with top professionals for all your home and business needs. Fast, reliable, and trusted.
        </p>
        <div className="flex justify-center space-x-4">
          <motion.input
            type="text"
            placeholder="Search services (e.g., plumbing, carpentry)"
            className="px-4 py-2 rounded-lg border border-white text-white w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            whileFocus={{ scale: 1.05 }}
          />
          <motion.button
            className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Search
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;