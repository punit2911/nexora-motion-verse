
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Showcase from '@/components/Showcase';
import Technology from '@/components/Technology';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const Index = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: cursorPosition.x - 20,
      y: cursorPosition.y - 20,
      backgroundColor: "rgba(110, 89, 165, 0.5)",
    },
    link: {
      x: cursorPosition.x - 30,
      y: cursorPosition.y - 30,
      backgroundColor: "rgba(51, 195, 240, 0.5)",
      width: "60px",
      height: "60px",
    },
    button: {
      x: cursorPosition.x - 25,
      y: cursorPosition.y - 25,
      backgroundColor: "rgba(249, 115, 22, 0.5)",
      width: "50px",
      height: "50px",
    },
  };

  const handleMouseEnterLink = () => setCursorVariant('link');
  const handleMouseEnterButton = () => setCursorVariant('button');
  const handleMouseLeave = () => setCursorVariant('default');

  // Add event listeners to interactive elements
  useEffect(() => {
    const links = document.querySelectorAll('a, .hover-expand');
    const buttons = document.querySelectorAll('button, .magnetic-button');

    links.forEach(link => {
      link.addEventListener('mouseenter', handleMouseEnterLink);
      link.addEventListener('mouseleave', handleMouseLeave);
    });

    buttons.forEach(button => {
      button.addEventListener('mouseenter', handleMouseEnterButton);
      button.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleMouseEnterLink);
        link.removeEventListener('mouseleave', handleMouseLeave);
      });

      buttons.forEach(button => {
        button.removeEventListener('mouseenter', handleMouseEnterButton);
        button.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-black">
      {/* Custom cursor */}
      <motion.div 
        className="hidden md:block cursor-follower"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", damping: 15, stiffness: 150 }}
      />

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
