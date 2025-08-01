import React from 'react';

const WhyChooseSection = () => {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Why Choose Our Platform?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">Massive Client Network</h3>
          <p className="text-gray-600 mb-4">
            Access over <span className="font-bold text-blue-600">10,000+ active clients</span> monthly, seeking your expertise across diverse industries.
          </p>
          <p className="text-blue-600 font-semibold">Grow your business faster.</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">Earn More</h3>
          <p className="text-gray-600 mb-4">
            Keep up to <span className="font-bold text-blue-600">90% of your earnings</span> with our low platform fees, maximizing your income.
          </p>
          <p className="text-blue-600 font-semibold">Your skills, your profits.</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">Seamless Experience</h3>
          <p className="text-gray-600 mb-4">
            Manage projects with our <span className="font-bold text-blue-600">intuitive tools</span> for scheduling, invoicing, and client communication.
          </p>
          <p className="text-blue-600 font-semibold">Focus on what you love.</p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;