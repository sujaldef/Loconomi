import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaComments, FaCheckCircle } from 'react-icons/fa';

const HowItWorksSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-blue-50 to-white text-center relative overflow-hidden">
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
        className="text-4xl font-bold mb-4 text-blue-700"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        How It Works
      </motion.h2>
      <p className="text-lg text-gray-700 mb-8">Simple steps to get your project done</p>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FaSearch className="h-16 w-16 mx-auto mb-4 text-blue-600" />
          </motion.div>
          <h3 className="text-xl font-semibold mb-2">Search & Browse</h3>
          <p className="text-gray-700">Find the right professionals for your job from our verified list</p>
        </motion.div>
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FaComments className="h-16 w-16 mx-auto mb-4 text-blue-600" />
          </motion.div>
          <h3 className="text-xl font-semibold mb-2">Connect & Discuss</h3>
          <p className="text-gray-700">Chat directly about your project needs and get a personalized quote</p>
        </motion.div>
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FaCheckCircle className="h-16 w-16 mx-auto mb-4 text-blue-600" />
          </motion.div>
          <h3 className="text-xl font-semibold mb-2">Hire & Complete</h3>
          <p className="text-gray-700">Get your project done with confidence and satisfaction guarantee</p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HowItWorksSection;