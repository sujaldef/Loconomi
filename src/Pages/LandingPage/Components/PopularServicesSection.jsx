import React from 'react';
import { motion } from 'framer-motion';

const PopularServicesSection = () => {
  const services = [
    { name: 'Electricians', image: '/electrician.png' },
    { name: 'Plumbers', image: '/plumber.png' },
    { name: 'Carpenters', image: '/carpenter.png' },
    { name: 'Painters', image: '/painter.png' },
    { name: 'Gardeners', image: '/gardener.png' },
    { name: 'Cleaners', image: '/cleaner.png' },
    { name: 'Movers', image: '/mover.png' },
    { name: 'Handymen', image: '/handyman.png' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 px-6 md:px-20 text-center bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      {/* Background animated shapes */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-100 opacity-20"
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
        className="text-4xl font-bold mb-8 text-blue-700"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Popular Services
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <motion.img
              src={service.image}
              alt={service.name}
              className="w-full h-40 object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
              <motion.a
                href="#"
                className="text-blue-600 hover:underline"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                View Professionals
              </motion.a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default PopularServicesSection;