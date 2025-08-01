import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from "./animations";

const FormHeader = ({ isLogin }) => {
  return (
    <motion.h2
      className="text-3xl text-center mb-6 text-black"
      variants={fadeInUp}
      key={isLogin ? 'login' : 'signup'}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {isLogin ? 'Welcome Back!' : 'Join Us!'}
    </motion.h2>
  );
};

export default FormHeader;