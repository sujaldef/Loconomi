import React from 'react';
import HeroSection from './Components/HeroSection';
import WhyChooseSection from './Components/WhyChooseSection';
import HowItWorksSection from './Components/HowItWorksSection';
import PopularServicesSection from './Components/PopularServicesSection';
import CallToActionSection from './Components/CallToActionSection';

const LandingPage = () => {
  return (
    <div className="font-sans ">
      <HeroSection />
      <WhyChooseSection />
      <HowItWorksSection />
      <PopularServicesSection />
      <CallToActionSection />
    </div>
  );
};

export default LandingPage;