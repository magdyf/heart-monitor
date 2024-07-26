import React from 'react';

const TeamMember = ({ name, role, description }) => (
  <div className="mb-6">
    <h3 className="text-xl font-semibold mb-2">{name}</h3>
    <p className="text-lg text-gray-700 dark:text-gray-300 mb-1">{role}</p>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Magdy Fares",
      role: "Founder, Designer & Developer",
      description: "My passion for intuitive design ensures that Heart Listener is easy to use for people of all ages. My goal was to work on a side project that can help people, hopefully I have accomplished that."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 gradient-text">About Heart Listener</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          At Heart Listener, our mission is to empower individuals to take control of their heart health. 
          We believe that by providing an easy-to-use, accessible tool for heart rate monitoring, we can 
          help people become more aware of their cardiovascular health and make informed decisions about 
          their lifestyle and wellness.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Heart Listener is an innovative application that turns your smartphone into a heart rate monitor. 
          Using advanced audio processing technology, we capture your heartbeat through your device's 
          microphone, providing a convenient way to check your heart rate anytime, anywhere. Whether you're 
          tracking your fitness progress, managing stress, or simply curious about your heart health, 
          Heart Listener is your personal cardiac companion.
        </p>
      </section>

      <section>
      <h1 className="text-3xl font-bold mb-8 gradient-text">Our Team</h1>
        {teamMembers.map((member, index) => (
          <TeamMember 
            key={index}
            name={member.name}
            role={member.role}
            description={member.description}
          />
        ))}
      </section>
    </div>
  );
}