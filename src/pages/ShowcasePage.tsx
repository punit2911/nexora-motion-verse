
import React from 'react';
import Navbar from '@/components/Navbar';
import Showcase from '@/components/Showcase';
import Footer from '@/components/Footer';

const ShowcasePage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-20">
        <Showcase />
      </div>
      <Footer />
    </div>
  );
};

export default ShowcasePage;
