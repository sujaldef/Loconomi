import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative py-24 px-4 text-center bg-blue-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-900 opacity-50"></div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          Empower Your Career as a Service Provider
        </h1>
        <p className="text-lg md:text-2xl max-w-3xl mx-auto mb-8">
          Join a platform designed to amplify your skills, connect you with clients, and grow your business with ease.
        </p>
        <a
          href="/registerworker"
          className="inline-block bg-blue-500 text-white font-semibold py-4 px-10 rounded-full hover:bg-blue-600 transition duration-300 shadow-lg"
        >
          Create Your Account
        </a>
      </div>
    </section>
  );
};

export default HeroSection;