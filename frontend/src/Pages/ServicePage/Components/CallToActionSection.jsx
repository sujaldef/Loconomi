import React from 'react';
import { motion } from 'framer-motion';

const CallToActionSection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-6 md:px-20 text-center relative overflow-hidden">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-300 opacity-20"
          style={{
            width: Math.random() * 40 + 20,
            height: Math.random() * 40 + 20,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      <motion.h2
        className="text-4xl font-bold mb-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Ready to Find Your Service?
      </motion.h2>
      <p className="text-lg mb-8 max-w-2xl mx-auto">
        Join thousands of satisfied customers and connect with top professionals today.
      </p>
      <div className="flex justify-center space-x-4">
        <motion.button
          className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-100"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Find a Service
        </motion.button>
        <motion.button
          className="border border-white text-white px-6 py-2 rounded-lg hover:bg-blue-900"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Become a Provider
        </motion.button>
      </div>
    </section>
  );
};

export default CallToActionSection;