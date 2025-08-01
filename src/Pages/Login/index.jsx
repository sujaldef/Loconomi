import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BackgroundElements from './Components/BackgroundElements';
import FormHeader from './Components/FormHeader';
import FormFields from './Components/FormFields';
import FormFooter from './Components/FormFooter';
import { fadeInUp } from './Components/animations';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!isLogin && !formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.match(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/)) newErrors.email = 'Valid email is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!isLogin && formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(isLogin ? 'Login Submitted:' : 'Signup Submitted:', formData);
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
  };

  return (
    <div className="font-sans min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-x-hidden box-border">
      <BackgroundElements />
      <motion.div
        className="bg-white backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4 box-border"
        initial="hidden"
        animate={shake ? 'shake' : 'visible'}
        variants={fadeInUp}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <FormHeader isLogin={isLogin} />
        <FormFields
          isLogin={isLogin}
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <FormFooter isLogin={isLogin} toggleMode={toggleMode} />
      </motion.div>
    </div>
  );
};

export default Login;