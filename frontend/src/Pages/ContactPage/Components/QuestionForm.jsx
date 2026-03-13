import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import { fadeInUp, staggerChildren, pulse } from './animations';

const QuestionForm = () => {
  const [questionForm, setQuestionForm] = useState({ email: '', question: '' });
  const [questionErrors, setQuestionErrors] = useState({});

  const validateQuestionForm = () => {
    const errors = {};
    if (!questionForm.email.match(/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/)) errors.email = 'Valid email is required';
    if (!questionForm.question.trim()) errors.question = 'Question is required';
    setQuestionErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleQuestionChange = (e) => {
    setQuestionForm({ ...questionForm, [e.target.name]: e.target.value });
    setQuestionErrors({ ...questionErrors, [e.target.name]: '' });
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (validateQuestionForm()) {
      console.log('Question Submitted:', questionForm);
      setQuestionForm({ email: '', question: '' });
    }
  };

  return (
    <motion.div
      variants={staggerChildren}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2
        className="text-2xl font-bold mb-8 text-blue-700"
        variants={fadeInUp}
      >
        Submit a Question
      </motion.h2>
      <motion.form
        onSubmit={handleQuestionSubmit}
        variants={staggerChildren}
      >
        <motion.input
          type="email"
          name="email"
          placeholder="Your Email"
          className={`w-full px-4 py-3 mb-2 rounded-lg border ${questionErrors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-200`}
          value={questionForm.email}
          onChange={handleQuestionChange}
          variants={fadeInUp}
          whileFocus={{ scale: 1.02 }}
        />
        {questionErrors.email && <p className="text-red-500 text-sm mb-2">{questionErrors.email}</p>}
        <motion.textarea
          name="question"
          placeholder="Your Question"
          className={`w-full px-4 py-3 mb-2 rounded-lg border ${questionErrors.question ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-200`}
          rows="4"
          value={questionForm.question}
          onChange={handleQuestionChange}
          variants={fadeInUp}
          whileFocus={{ scale: 1.02 }}
        />
        {questionErrors.question && <p className="text-red-500 text-sm mb-2">{questionErrors.question}</p>}
        <motion.button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center w-full shadow-lg"
          whileHover="hover"
          whileTap="tap"
          variants={pulse}
        >
          <FaPaperPlane className="mr-2" /> Submit Question
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default QuestionForm;