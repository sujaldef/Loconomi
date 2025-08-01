import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaQuestionCircle } from 'react-icons/fa';
import { fadeInUp, staggerChildren } from './animations';

const FAQSection = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  const faqs = [
    {
      question: 'How do I find a service provider?',
      answer: 'Use the search bar on our homepage to find services within a 1km radius. Browse providers, check reviews, and book directly.',
    },
    {
      question: 'Are providers verified?',
      answer: 'Yes, all providers are vetted and verified to ensure trust and quality service.',
    },
    {
      question: 'What if I have an issue with a service?',
      answer: 'Contact our support team via email or phone, and we’ll assist you promptly to resolve any issues.',
    },
    {
      question: 'How can I become a provider?',
      answer: 'Visit our "Become a Provider" page, fill out the application, and our team will review your submission.',
    },
  ];

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
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
        Frequently Asked Questions
      </motion.h2>
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          className="mb-4 border-b border-gray-200 rounded-lg hover:bg-blue-50 transition-colors"
          variants={fadeInUp}
        >
          <button
            className="w-full flex justify-between items-center py-4 px-4 text-left"
            onClick={() => toggleFAQ(index)}
          >
            <span className="text-lg font-semibold text-gray-800 flex items-center">
              <motion.div
                className="mr-2 text-blue-600"
                animate={{ rotate: activeFAQ === index ? 360 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaQuestionCircle />
              </motion.div>
              {faq.question}
            </span>
            <motion.span
              className="text-blue-600 text-xl"
              animate={{ rotate: activeFAQ === index ? 180 : 0 }}
            >
              {activeFAQ === index ? '-' : '+'}
            </motion.span>
          </button>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: activeFAQ === index ? 'auto' : 0,
              opacity: activeFAQ === index ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden px-4"
          >
            <p className="text-gray-700 pb-4">{faq.answer}</p>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FAQSection;