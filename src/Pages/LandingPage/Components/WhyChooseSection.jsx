import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { FaUserCheck, FaMapMarkerAlt, FaLock } from 'react-icons/fa';

const WhyChooseSection = () => {
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

  const counterControls = useAnimation();
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true });

  useEffect(() => {
    if (isInView) {
      counterControls.start('visible');
    }
  }, [isInView, counterControls]);

  const counters = [
    { value: 5000, suffix: '+', label: 'Verified Workers' },
    { value: 10000, suffix: '+', label: 'Completed Projects' },
    { value: '4.8/5', suffix: '', label: 'Average Rating' },
    { value: 96, suffix: '%', label: 'Customer Satisfaction' },
  ];

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
        className="text-4xl font-bold mb-4 text-blue-700"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Why Choose SkillConnect
      </motion.h2>

      <p className="text-lg text-gray-700 mb-8">
        Experience the difference with our premium service platform
      </p>

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
          <FaUserCheck className="h-12 w-12 mx-auto mb-4 text-blue-600" />
          <h3 className="text-xl font-semibold mb-2">Verified Professionals</h3>
          <p className="text-gray-700">All workers are background-checked and vetted for peace of mind</p>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          <FaMapMarkerAlt className="h-12 w-12 mx-auto mb-4 text-blue-600" />
          <h3 className="text-xl font-semibold mb-2">Location-Based Matching</h3>
          <p className="text-gray-700">Find skilled workers within your area instantly</p>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          <FaLock className="h-12 w-12 mx-auto mb-4 text-blue-600" />
          <h3 className="text-xl font-semibold mb-2">Secure Communication</h3>
          <p className="text-gray-700">Built-in chat and project management tools for seamless collaboration</p>
        </motion.div>
      </motion.div>

      <motion.div
        ref={counterRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12"
        variants={containerVariants}
        initial="hidden"
        animate={counterControls}
      >
        {counters.map((counter, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="text-center"
          >
            <h3 className="text-3xl font-bold text-blue-600">
              {typeof counter.value === 'number' && isInView ? (
                <CountUp end={counter.value} duration={2} separator="," />
              ) : (
                counter.value
              )}
              {counter.suffix}
            </h3>
            <p className="text-gray-700">{counter.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default WhyChooseSection;
