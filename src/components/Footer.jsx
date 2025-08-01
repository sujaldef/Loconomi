import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');

  // Animation variants for links
  const linkVariants = {
    hover: { scale: 1.1, color: '#93c5fd', transition: { duration: 0.3 } },
  };

  // Animation variants for social icons
  const iconVariants = {
    hover: { scale: 1.2, rotate: 10, transition: { duration: 0.3 } },
  };

  // Animation variants for newsletter input
  const inputVariants = {
    focus: { scale: 1.05, borderColor: '#93c5fd', transition: { duration: 0.3 } },
  };

  return (
    <footer className="bg-gradient-to-r w-full from-blue-600 to-blue-800 text-white py-12 px-6 md:px-20 relative overflow-hidden">
      {/* Background animated particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-300 opacity-20"
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

     

      {/* Footer Content */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 z-10">
        {/* Company Info */}
        <div>
          <img src="/logo.png" alt="SkillConnect Logo" className="h-8 mb-4" />
          <p className="text-sm mb-4">Connecting clients with skilled professionals for local projects.</p>
          <div className="flex items-center space-x-2 text-sm">
            <FaMapMarkerAlt />
            <span>123 Skill St, Expertise City, 12345</span>
          </div>
          <div className="flex items-center space-x-2 text-sm mt-2">
            <FaPhone />
            <span>(123) 456-7890</span>
          </div>
          <div className="flex items-center space-x-2 text-sm mt-2">
            <FaEnvelope />
            <span>support@skillconnect.com</span>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <motion.div whileHover="hover" variants={linkVariants}>
                <Link to="/services/electricians" className="hover:underline">Electricians</Link>
              </motion.div>
            </li>
            <li>
              <motion.div whileHover="hover" variants={linkVariants}>
                <Link to="/services/plumbers" className="hover:underline">Plumbers</Link>
              </motion.div>
            </li>
            <li>
              <motion.div whileHover="hover" variants={linkVariants}>
                <Link to="/services/carpenters" className="hover:underline">Carpenters</Link>
              </motion.div>
            </li>
            <li>
              <motion.div whileHover="hover" variants={linkVariants}>
                <Link to="/services/painters" className="hover:underline">Painters</Link>
              </motion.div>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <motion.div whileHover="hover" variants={linkVariants}>
                <Link to="/blog" className="hover:underline">Blog</Link>
              </motion.div>
            </li>
            <li>
              <motion.div whileHover="hover" variants={linkVariants}>
                <Link to="/guides" className="hover:underline">Guides</Link>
              </motion.div>
            </li>
            <li>
              <motion.div whileHover="hover" variants={linkVariants}>
                <Link to="/faq" className="hover:underline">FAQ</Link>
              </motion.div>
            </li>
            <li>
              <motion.div whileHover="hover" variants={linkVariants}>
                <Link to="/support" className="hover:underline">Support</Link>
              </motion.div>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
          <p className="text-sm mb-4">Subscribe to our newsletter for tips and updates.</p>
          <div className="flex flex-col space-y-2">
            <motion.input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-lg border border-white text-white focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              whileFocus="focus"
              variants={inputVariants}
            />
            <motion.button
              className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </div>
        </div>
      </div>

      {/* Copyright and Social Icons */}
      <div className="container mx-auto mt-8 flex flex-col md:flex-row justify-between items-center border-t border-blue-500 pt-4 z-10">
        <p className="text-sm mb-4 md:mb-0">© 2025 SkillConnect. All rights reserved.</p>
        <div className="flex space-x-4">
          <motion.a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover="hover"
            variants={iconVariants}
          >
            <FaFacebook className="h-6 w-6 text-white hover:text-blue-200" />
          </motion.a>
          <motion.a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover="hover"
            variants={iconVariants}
          >
            <FaTwitter className="h-6 w-6 text-white hover:text-blue-200" />
          </motion.a>
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover="hover"
            variants={iconVariants}
          >
            <FaLinkedin className="h-6 w-6 text-white hover:text-blue-200" />
          </motion.a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;