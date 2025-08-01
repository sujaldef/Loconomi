import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaUsers, FaLightbulb, FaHeart } from 'react-icons/fa';
import { fadeInUp, staggerChildren } from './animations';

const ValuesSection = () => {
  const values = [
    { icon: <FaRocket className="h-12 w-12 text-blue-600" />, title: 'Innovation', description: 'We embrace technology to simplify your life.' },
    { icon: <FaUsers className="h-12 w-12 text-blue-600" />, title: 'Community', description: 'Building stronger local connections.' },
    { icon: <FaLightbulb className="h-12 w-12 text-blue-600" />, title: 'Trust', description: 'Verified providers you can rely on.' },
    { icon: <FaHeart className="h-12 w-12 text-blue-600" />, title: 'Passion', description: 'Driven by a love for service excellence.' },
  ];

  return (
    <section className="py-20 px-6 bg-white text-center">
      <h2 className="text-3xl font-bold mb-12">Our Values</h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {values.map((value, index) => (
          <motion.div
            key={index}
            className="bg-gray-50 p-6 rounded-lg shadow-md"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
          >
            <div className="mb-4">{value.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
            <p className="text-gray-700">{value.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ValuesSection;