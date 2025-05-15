
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative h-screen overflow-hidden bg-gradient-to-br from-nexora-dark to-black"
      ref={containerRef}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Parallax layers */}
      <div className="parallax-container h-full w-full">
        {/* Background layer */}
        <motion.div 
          className="parallax-layer"
          style={{ 
            transform: `translateX(${mousePosition.x * -20}px) translateY(${mousePosition.y * -20}px)` 
          }}
        >
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-nexora-primary rounded-full filter blur-[100px] opacity-20"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-nexora-secondary rounded-full filter blur-[120px] opacity-20"></div>
        </motion.div>

        {/* Middle layer */}
        <motion.div 
          className="parallax-layer"
          style={{ 
            transform: `translateX(${mousePosition.x * -40}px) translateY(${mousePosition.y * -40}px)` 
          }}
        >
          <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-nexora-accent rounded-full filter blur-[80px] opacity-15"></div>
        </motion.div>

        {/* Content layer */}
        <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-5xl mx-auto"
          >
            <div className="relative inline-block mb-4">
              <span className="text-sm md:text-base font-medium text-nexora-secondary tracking-wider">A Dawn of Digital Innovation</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              <span className="glitch-effect" data-text="Welcome to Nexora">Welcome to Nexora</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl mx-auto">
              We merge cinematic 3D environments with buttery-smooth interactions to create browsing experiences that feel alive.
            </p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <button className="magnetic-button bg-nexora-primary hover:bg-opacity-90 text-white px-8 py-3 rounded-full font-medium transition-all">
                Explore Features
              </button>
              <button className="magnetic-button bg-transparent border border-nexora-secondary text-nexora-secondary hover:bg-nexora-secondary hover:bg-opacity-10 px-8 py-3 rounded-full font-medium transition-all">
                View Showcase
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator"></div>
    </motion.div>
  );
};

export default Hero;
