import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerChildren } from './animations';

const TeamSection = () => {
  const teamMembers = [
    { name: 'Jane Doe', role: 'Founder & CEO', image: '/guest1.png', bio: 'Passionate about connecting communities.' },
    { name: 'John Smith', role: 'CTO', image: '/guest2.jpg', bio: 'Tech enthusiast driving innovation.' },
    { name: 'Emily Brown', role: 'Head of Operations', image: '/guest3.jpg', bio: 'Ensuring seamless service delivery.' },
  ];

  return (
    <section className="py-20 px-6 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-12">Meet Our Team</h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md"
            variants={fadeInUp}
            whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
            <p className="text-gray-500 mb-4">{member.role}</p>
            <motion.p
              className="text-gray-700"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {member.bio}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TeamSection;