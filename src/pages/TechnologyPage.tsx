
import React from 'react';
import Navbar from '@/components/Navbar';
import Technology from '@/components/Technology';
import Footer from '@/components/Footer';

const TechnologyPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-20">
        <Technology />
      </div>
      <Footer />
    </div>
  );
};

export default TechnologyPage;
