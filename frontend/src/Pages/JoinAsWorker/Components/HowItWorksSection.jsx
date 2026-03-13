import React from 'react';

const HowItWorksSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50 relative">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
      <div className="max-w-6xl mx-auto space-y-16 relative">
        <div className="absolute inset-0 z-0">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M50,50 Q250,150 50,250 Q-150,350 50,450"
              stroke="#60A5FA"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8,8"
              transform="translate(600, 40) scale(1, 1.5)"
            />
          </svg>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">1. Build Your Profile</h3>
            <p className="text-gray-600">
              Create a standout profile with your skills, portfolio, and rates. Attract clients with a professional showcase of your expertise.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="./profile.jpg"
              alt="Profile Creation"
              className="rounded-lg shadow-md w-full h-48 object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 relative z-10">
          <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">2. Discover Projects</h3>
            <p className="text-gray-600">
              Get matched with projects tailored to your skills or browse opportunities that align with your goals.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="./Opportunities.jpg"
              alt="Find Opportunities"
              className="rounded-lg shadow-md w-full h-48 object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="md:w-1/2 bg-white p(headers) p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">3. Work & Get Paid</h3>
            <p className="text-gray-600">
              Deliver top-notch work, earn glowing reviews, and receive secure payments directly to your account.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="./Deliver.jpg"
              alt="Deliver Work"
              className="rounded-lg shadow-md w-full h-48 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;