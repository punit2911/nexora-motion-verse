
import React from 'react';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-black relative">
      <AnimatedBackground />
      <Navbar />
      <div className="pt-20 relative z-10">
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
