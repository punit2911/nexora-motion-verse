
import React from 'react';
import Navbar from '@/components/Navbar';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-black relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />
        <div className="pt-20">
          <Features />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default FeaturesPage;
