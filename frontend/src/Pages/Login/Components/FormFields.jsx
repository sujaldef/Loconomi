import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaPaperPlane } from 'react-icons/fa';
import { fadeInUp, staggerChildren, pulse } from './animations';

const FormFields = ({ isLogin, formData, errors, handleChange, handleSubmit }) => {
  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      variants={staggerChildren}
    >
      {!isLogin && (
        <motion.div variants={fadeInUp}>
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-blue-600" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-black placeholder-gray-300 box-border`}
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          {errors.name && (
            <motion.p
              className="text-red-500 text-sm mt-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {errors.name}
            </motion.p>
          )}
        </motion.div>
      )}
      <motion.div variants={fadeInUp}>
        <div className="relative">
          <FaUser className="absolute top-3 left-3 text-blue-600" />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-black placeholder-gray-300 box-border`}
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {errors.email && (
          <motion.p
            className="text-red-500 text-sm mt-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {errors.email}
          </motion.p>
        )}
      </motion.div>
      <motion.div variants={fadeInUp}>
        <div className="relative">
          <FaLock className="absolute top-3 left-3 text-blue-600" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-black placeholder-gray-300 box-border`}
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {errors.password && (
          <motion.p
            className="text-red-500 text-sm mt-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {errors.password}
          </motion.p>
        )}
      </motion.div>
      {!isLogin && (
        <motion.div variants={fadeInUp}>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-blue-600" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-200 text-black placeholder-gray-300 box-border`}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          {errors.confirmPassword && (
            <motion.p
              className="text-red-500 text-sm mt-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {errors.confirmPassword}
            </motion.p>
          )}
        </motion.div>
      )}
      <motion.button
        type="submit"
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center shadow-lg box-border"
        whileHover="hover"
        whileTap="tap"
        variants={pulse}
      >
        <FaPaperPlane className="mr-2" /> {isLogin ? 'Login' : 'Signup'}
      </motion.button>
    </motion.form>
  );
};

export default FormFields;