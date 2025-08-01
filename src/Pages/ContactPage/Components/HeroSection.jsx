import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, pulse } from './animations';

const HeroSection = () => {
  return (
    <motion.section
      className="bg-gradient-to-r from-blue-600 to-blue-400 text-white py-20 px-6 md:px-20 text-center relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
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
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
      <p className="text-lg mb-6 max-w-2xl mx-auto">
        We’re here to help! Reach out with any questions, feedback, or inquiries, and our team will respond promptly.
      </p>
      <motion.button
        className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-100 shadow-lg"
        whileHover="hover"
        whileTap="tap"
        variants={pulse}
      >
        Contact Us
      </motion.button>
    </motion.section>
  );
};

export default HeroSection;