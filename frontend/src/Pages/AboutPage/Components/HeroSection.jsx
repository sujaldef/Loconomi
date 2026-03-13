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
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-300 opacity-20"
          style={{
            width: Math.random() * 60 + 20,
            height: Math.random() * 60 + 20,
            top: `${Math.random() * 100}%`,
            left: `clamp(0%, ${Math.random() * 90}%, 90%)`,
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
      <div className="z-10 max-w-2xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          About LocalServe
        </motion.h1>
        <motion.p
          className="text-lg mb-8"
          variants={fadeInUp}
        >
          We’re passionate about connecting you with trusted local service providers in your neighborhood. Our mission is to make your life easier by bringing reliable services right to your doorstep.
        </motion.p>
        <motion.button
          className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-100 shadow-md"
          whileHover="hover"
          whileTap="tap"
          variants={pulse}
        >
          Learn More
        </motion.button>
      </div>
    </motion.section>
  );
};

export default HeroSection;