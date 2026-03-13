import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import BackgroundElements from './Components/BackgroundElements';
import FormHeader from './Components/FormHeader';
import FormFields from './Components/FormFields';
import FormFooter from './Components/FormFooter';
import { fadeInUp } from './Components/animations';

const Login = () => {
  const navigate = useNavigate();
  const {
    userLogin,
    providerLogin,
    isAuthenticated,
    loading,
    error,
    clearError,
    userType,
  } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isProvider, setIsProvider] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const redirectPath = userType === 'provider' ? '/hire' : '/';
      setTimeout(() => navigate(redirectPath), 500);
    }
  }, [isAuthenticated, userType, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!isLogin && !formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.match(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/))
      newErrors.email = 'Valid email is required';
    if (formData.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters';
    if (!isLogin && formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isLogin) {
      // Login
      if (isProvider) {
        await providerLogin(formData.email, formData.password);
      } else {
        await userLogin(formData.email, formData.password);
      }
    } else {
      // Signup - not implemented in this form yet
      console.log('Signup:', formData);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
    clearError();
  };

  const toggleUserType = () => {
    setIsProvider(!isProvider);
    clearError();
  };

  const handleShake = shake ? 'shake' : 'visible';

  return (
    <div className="font-sans min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-x-hidden box-border">
      <BackgroundElements />
      <motion.div
        className="bg-white backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4 box-border"
        initial="hidden"
        animate={handleShake}
        variants={fadeInUp}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <FormHeader isLogin={isLogin} isProvider={isProvider} />

        {/* User Type Toggle */}
        {isLogin && (
          <div className="mb-4 flex items-center justify-center space-x-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                checked={!isProvider}
                onChange={toggleUserType}
                className="mr-2"
              />
              <span className="text-gray-700">User</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                checked={isProvider}
                onChange={toggleUserType}
                className="mr-2"
              />
              <span className="text-gray-700">Provider</span>
            </label>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.div>
        )}

        <FormFields
          isLogin={isLogin}
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
        />

        <FormFooter isLogin={isLogin} toggleMode={toggleMode} />
      </motion.div>
    </div>
  );
};

export default Login;
