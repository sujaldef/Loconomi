import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { fadeInUp, staggerChildren } from './animations';

const ContactInfo = () => {
  const contactDetails = [
    { icon: <FaMapMarkerAlt />, title: 'Address', text: '123 Skill St, Expertise City, 12345' },
    { icon: <FaPhone />, title: 'Phone', text: '(123) 456-7890' },
    { icon: <FaEnvelope />, title: 'Email', text: 'support@skillconnect.com' },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaTwitter />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaLinkedin />, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <section className="py-20 px-6 md:px-20 bg-white relative">
      <motion.h2
        className="text-3xl font-bold text-center mb-12 text-blue-700"
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        viewport={{ once: true }}
      >
        Contact Information
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {contactDetails.map((item, index) => (
          <motion.div
            key={index}
            className="flex items-center space-x-4 p-4 rounded-lg hover:bg-blue-50"
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="text-blue-600 text-2xl"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {item.icon}
            </motion.div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              <p className="text-gray-700">{item.text}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="flex justify-center space-x-6 mt-8"
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {socialLinks.map((social, index) => (
          <motion.a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group"
            variants={fadeInUp}
            whileHover={{ scale: 1.3, rotate: 15 }}
          >
            <span className="text-blue-600 text-2xl">{social.icon}</span>
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {social.label}
            </span>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
};

export default ContactInfo;