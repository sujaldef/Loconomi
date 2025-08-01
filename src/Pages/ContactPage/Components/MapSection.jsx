import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from './animations';

const MapSection = () => {
  return (
    <section className="py-20 px-6 md:px-20 bg-gray-50 relative">
      <motion.h2
        className="text-3xl font-bold text-center mb-12 text-blue-700"
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true }}
      >
        Find Us
      </motion.h2>
      <motion.div
        className="max-w-5xl mx-auto h-96 bg-gray-200 rounded-lg overflow-hidden relative group"
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          <img src="map.jpg" className="w-full" alt="Map" />
        </div>
        <motion.div
          className="absolute inset-0 bg-blue-600 bg-opacity-50 flex items-center justify-center text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          123 Skill St, Expertise City, 12345
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MapSection;