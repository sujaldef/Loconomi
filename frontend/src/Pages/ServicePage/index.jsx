import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import BackgroundParticles from './Components/BackgroundParticles';
import HeroSection from './Components/HeroSection';
import ServicesSection from './Components/ServicesSection';
import TestimonialsSection from './Components/TestimonialsSection';
import CallToActionSection from './Components/CallToActionSection';

const ServicePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const servicesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const servicesInView = useInView(servicesRef, { once: true });
  const testimonialsInView = useInView(testimonialsRef, { once: true });
  const servicesControls = useAnimation();
  const testimonialsControls = useAnimation();

  useEffect(() => {
    if (servicesInView) servicesControls.start('visible');
    if (testimonialsInView) testimonialsControls.start('visible');
  }, [servicesInView, testimonialsInView, servicesControls, testimonialsControls]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 5); // Assuming 5 services
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div className="font-sans relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <BackgroundParticles />
      <HeroSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ServicesSection
        currentIndex={currentIndex}
        servicesRef={servicesRef}
        servicesControls={servicesControls}
      />
      <TestimonialsSection
        testimonialsRef={testimonialsRef}
        testimonialsControls={testimonialsControls}
      />
      <CallToActionSection />
    </motion.div>
  );
};

export default ServicePage;