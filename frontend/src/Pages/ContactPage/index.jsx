import React from 'react';
import HeroSection from './components/HeroSection';
import ContactInfo from './components/ContactInfo';
import FAQSection from './components/FAQSection';
import QuestionForm from './components/QuestionForm';
import MapSection from './components/MapSection';

const ContactPage = () => {
  return (
    <div className="font-sans bg-gradient-to-b from-blue-50 to-white">
      <HeroSection />
      <ContactInfo />
      <div className="py-20 px-6 md:px-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-200 opacity-20" />
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <FAQSection />
          <QuestionForm />
        </div>
      </div>
      <MapSection />
    </div>
  );
};

export default ContactPage;