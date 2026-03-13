import React from 'react';
import ReactDOM from 'react-dom/client';
import HeroSection from './Components/HeroSection';
import BookingSteps from './Components/BookingSteps';
import TeamSection from './Components/TeamSection';
import ValuesSection from './Components/ValuesSection';
import CallToAction from './Components/CallToAction';

const AboutPage = () => {
  return (
    <div className="font-sans">
      <HeroSection />
      <BookingSteps />
      <TeamSection />
      <ValuesSection />
      <CallToAction />
    </div>
  )
};

export default AboutPage;