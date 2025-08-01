import React from 'react';
import HeroSection from './Components/HeroSection';
import WhyChooseSection from './components/WhyChooseSection';
import HowItWorksSection from './components/HowItWorksSection';
import PerksSection from './components/PerksSection';

const JoinAsWorker = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white font-sans">
      <HeroSection />
      <WhyChooseSection />
      <HowItWorksSection />
      <PerksSection />
    </div>
  );
};

export default JoinAsWorker;