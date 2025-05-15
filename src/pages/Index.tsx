
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Showcase from '@/components/Showcase';
import Technology from '@/components/Technology';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black relative">
      {/* 3D Animated Background */}
      <AnimatedBackground />
      
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Showcase />
        <Technology />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
