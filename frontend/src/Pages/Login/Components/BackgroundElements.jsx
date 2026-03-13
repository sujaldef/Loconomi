import React from 'react';
import { motion } from 'framer-motion';

const BackgroundElements = () => {
  return (
    <>
      {[...Array(10)].map((_, i) => (
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
            y: [0, -50, 0],
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      <svg className="absolute inset-0 w-full h-full opacity-10" fill="none">
        <motion.path
          d="M0 50 C150 100, 300 0, 450 50 S750 150, 900 50"
          stroke="#93c5fd"
          strokeWidth="40"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.1 }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </>
  );
};

export default BackgroundElements;