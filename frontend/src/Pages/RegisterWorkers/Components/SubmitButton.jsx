import React from 'react';

const SubmitButton = ({ handleSubmit }) => {
  return (
    <div className="text-center mt-6">
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Create Your Profile
      </button>
    </div>
  );
};

export default SubmitButton;