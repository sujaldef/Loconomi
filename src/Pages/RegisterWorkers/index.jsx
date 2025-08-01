import React, { useState } from 'react';
import Header from './components/Header';
import ProfilePicture from './components/ProfilePicture';
import FormFields from './components/FormFields';
import SubmitButton from './components/SubmitButton';

const RegisterWorkers = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    category: '',
    serviceType: 'individual',
    location: '',
    minRate: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  const categories = ['Select a category', 'Plumbing', 'Electrical', 'Cleaning', 'Tutoring', 'Freelancing'];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white font-sans py-16">
      <section className="max-w-3xl mx-auto px-4">
        <Header />
        <div className="bg-white p-8 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <ProfilePicture />
            <FormFields
              formData={formData}
              handleChange={handleChange}
              categories={categories}
              column="left"
            />
          </div>
          <FormFields
            formData={formData}
            handleChange={handleChange}
            categories={categories}
            column="right"
          />
        </div>
        <SubmitButton handleSubmit={handleSubmit} />
      </section>
    </div>
  );
};

export default RegisterWorkers;