import React from 'react';

const PerksSection = () => {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Perks That Set Us Apart</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl shadow-md hover:bg-blue-100 transition transform hover:scale-105">
          <svg className="w-8 h-8 text-blue-600 mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          <h3 className="text-xl font-semibold text-blue-700 mb-2">Vast Client Network</h3>
          <p className="text-gray-600">Connect with clients globally, from startups to enterprises, seeking your unique skills.</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-xl shadow-md hover:bg-blue-100 transition transform hover:scale-105">
          <svg className="w-8 h-8 text-blue-600 mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
          </svg>
          <h3 className="text-xl font-semibold text-blue-700 mb-2">Smart Tools</h3>
          <p className="text-gray-600">Use our all-in-one dashboard for project management, invoicing, and client communication.</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-xl shadow-md hover:bg-blue-100 transition transform hover:scale-105">
          <svg className="w-8 h-8 text-blue-600 mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8.433 7.418c.409-.364.777-.728 1.135-1.092A9.507 9.507 0 0112 4c0-.932-.156-1.83-.438-2.682C10.932 1.107 10.305 1 9.667 1H4.333C3.595 1 3 1.597 3 2.333v15.334C3 18.403 3.595 19 4.333 19h11.334c.738 0 1.333-.597 1.333-1.333V8.667c0-.639-.107-1.265-.318-1.894C15.893 7.105 15.267 7 14.667 7H12v1h2.667c.368 0 .667.298.667.667v9c0 .368-.299.667-.667.667H5.333A.667.667 0 014.667 18v-10h3.766z" />
          </svg>
          <h3 className="text-xl font-semibold text-blue-700 mb-2">Free Promotion</h3>
          <p className="text-gray-600">Get featured in our marketing campaigns and boost your visibility at no extra cost.</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-xl shadow-md hover:bg-blue-100 transition transform hover:scale-105">
          <svg className="w-8 h-8 text-blue-600 mb-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.24 1.929-.667 2.754l-1.087-1.087a.996.996 0 00-1.414 0l-1.414 1.414a.996.996 0 000 1.414l1.087 1.087A3.97 3.97 0 0010 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5z" />
          </svg>
          <h3 className="text-xl font-semibold text-blue-700 mb-2">24/7 Support</h3>
          <p className="text-gray-600">Our dedicated team is here to help you succeed, anytime you need assistance.</p>
        </div>
      </div>
      <div className="text-center mt-12">
        <a
          href="/registerworker"
          className="inline-block bg-blue-500 text-white font-semibold py-4 px-10 rounded-full hover:bg-blue-600 transition duration-300 shadow-lg"
        >
          Join Now and Start Earning
        </a>
      </div>
    </section>
  );
};

export default PerksSection;