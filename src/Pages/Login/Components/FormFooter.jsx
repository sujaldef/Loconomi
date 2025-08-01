import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from './animations';

const FormFooter = ({ isLogin, toggleMode }) => {
  return (
    <motion.div className="mt-4 text-center" variants={fadeInUp}>
      {isLogin ? (
        <p className="text-black">
          Forgot Password?{' '}
          <motion.a
            href="#"
            className="text-blue-300 hover:text-blue-100"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            Reset Here
          </motion.a>
        </p>
      ) : null}
      <p className="text-black mt-2">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <motion.button
          onClick={toggleMode}
          className="text-blue-300 hover:text-blue-100"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          {isLogin ? 'Signup' : 'Login'}
        </motion.button>
      </p>
    </motion.div>
  );
};

export default FormFooter;