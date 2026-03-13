import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from './animations';

const CallToAction = () => {
  return (
    <motion.section
      className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-6 text-center relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-300 opacity-20"
          style={{
            width: Math.random() * 40 + 20,
            height: Math.random() * 40 + 20,
            top: `${Math.random() * 100}%`,
            left: `clamp(0%, ${Math.random() * 90}%, 90%)`,
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
      <h2 className="text-3xl font-bold mb-4">Join the LocalServe Community</h2>
      <p className="text-lg mb-8 max-w-xl mx-auto">
        Discover trusted local service providers and make your life easier today.
      </p>
      <motion.button
        className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Get Started Now
      </motion.button>
    </motion.section>
  );
};

export default CallToAction;