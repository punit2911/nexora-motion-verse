
import React from 'react';
import Navbar from '@/components/Navbar';
import Technology from '@/components/Technology';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

const TechnologyPage = () => {
  return (
    <div className="min-h-screen bg-black relative">
      <AnimatedBackground />
      <Navbar />
      <div className="pt-20 relative z-10">
        <Technology />
      </div>
      <Footer />
    </div>
  );
};

export default TechnologyPage;
