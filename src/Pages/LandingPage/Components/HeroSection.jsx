import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const pulse = {
  hover: { scale: 1.1, transition: { duration: 0.3 } },
  tap: { scale: 0.95, transition: { duration: 0.2 } },
};

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-400 text-white overflow-hidden px-4 sm:px-8 lg:px-24">
      {/* Wave Background Animation */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30 z-0"
        preserveAspectRatio="none"
        viewBox="0 0 1440 320"
      >
        <motion.path
          d="M0,160 C320,300 720,100 1080,200 L1440,160 L1440,320 L0,320 Z"
          fill="#93c5fd"
          initial={{ y: 50 }}
          animate={{ y: [50, 0, 50] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M0,200 C400,350 800,50 1200,200 L1440,200 L1440,320 L0,320 Z"
          fill="#60a5fa"
          initial={{ y: 30 }}
          animate={{ y: [30, -10, 30] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <motion.path
          d="M0,180 C360,320 760,80 1120,220 L1440,180 L1440,320 L0,320 Z"
          fill="#bfdbfe"
          initial={{ y: 40 }}
          animate={{ y: [40, -20, 40] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        />
        <motion.path
          d="M0,220 C340,280 740,120 1140,240 L1440,220 L1440,320 L0,320 Z"
          fill="#3b82f6"
          initial={{ y: 20 }}
          animate={{ y: [20, -30, 20] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        />
      </svg>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center flex flex-col items-center w-full max-w-2xl"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          Connect with Skilled Workers Today
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-10 px-4 text-white/90"
          variants={fadeInUp}
        >
          Discover trusted professionals for your projects. Fast, reliable, and right in your area.
        </motion.p>

       

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
         
<Link to="/hire">
  <motion.button
    className="bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 shadow-md"
    whileHover="hover"
    whileTap="tap"
    variants={pulse}
  >
    Hire a Professional
  </motion.button>
</Link>
<Link to='/joinasworker'>
          <motion.button
            className="border border-white text-white px-8 py-3 rounded-lg hover:bg-blue-700 shadow-md"
            whileHover="hover"
            whileTap="tap"
            variants={pulse}
            
          >
            Join as Worker
          </motion.button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
