
import React from 'react';
import Navbar from '@/components/Navbar';
import Showcase from '@/components/Showcase';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

const ShowcasePage = () => {
  return (
    <div className="min-h-screen bg-black relative">
      <AnimatedBackground />
      <Navbar />
      <div className="pt-20 relative z-10">
        <Showcase />
      </div>
      <Footer />
    </div>
  );
};

export default ShowcasePage;
