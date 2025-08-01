import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBolt, FaWrench, FaHammer, FaPaintRoller, FaLeaf } from 'react-icons/fa';
import { slideVariants } from './animations';

const ServicesSection = ({ currentIndex, servicesRef, servicesControls }) => {
  const services = [
    { name: 'Electrical Services', icon: <FaBolt />, description: 'Expert electricians for all your wiring and installation needs.' },
    { name: 'Plumbing Solutions', icon: <FaWrench />, description: 'Reliable plumbers to fix leaks and install fixtures.' },
    { name: 'Carpentry', icon: <FaHammer />, description: 'Custom furniture and home improvement by skilled carpenters.' },
    { name: 'Painting', icon: <FaPaintRoller />, description: 'Professional painting for vibrant, lasting results.' },
    { name: 'Gardening', icon: <FaLeaf />, description: 'Transform your outdoor space with expert gardeners.' },
  ];

  const visibleServices = [];
  for (let i = 0; i < 4; i++) {
    visibleServices.push(services[(currentIndex + i) % services.length]);
  }

  return (
    <section ref={servicesRef} className="py-20 px-6 md:px-20 bg-white relative overflow-hidden">
      <motion.h2
        className="text-4xl font-bold mb-8 text-blue-700 text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Our Services
      </motion.h2>
      <div className="relative flex overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          {visibleServices.map((service, index) => (
            <motion.div
              key={`${service.name}-${(currentIndex + index) % services.length}`}
              className="flex-shrink-0 w-full sm:w-1/2 md:w-1/4 p-4"
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-blue-50 p-6 rounded-lg shadow-lg h-full">
                <motion.div
                  className="text-blue-600 mb-4 text-4xl flex justify-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 text-center">{service.name}</h3>
                <p className="text-gray-600 text-center">{service.description}</p>
                <motion.a
                  href="#"
                  className="mt-4 inline-block text-blue-600 hover:underline text-center w-full"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ServicesSection;