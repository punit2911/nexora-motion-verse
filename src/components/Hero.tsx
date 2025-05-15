
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  
  // Scroll-based animations
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);
  const y = useTransform(scrollY, [0, 300], [0, -50]);

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

  // Text reveal animation variants
  const textContainer = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const textChild = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const handleExploreClick = () => {
    navigate('/features');
  };

  const handleShowcaseClick = () => {
    navigate('/showcase');
  };

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, scale, y }}
      className="relative h-screen overflow-hidden"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

      {/* Content */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={textContainer}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.div 
            variants={textChild} 
            className="relative inline-block mb-4"
          >
            <span className="text-sm md:text-base font-medium text-nexora-secondary tracking-wider">
              A Dawn of Digital Innovation
            </span>
          </motion.div>
          
          {/* Main title with letter animation */}
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            variants={textContainer}
          >
            {Array.from("Welcome to Nexora").map((letter, index) => (
              <motion.span
                key={index}
                variants={textChild}
                className="inline-block"
                style={{ 
                  display: 'inline-block',
                  filter: letter !== " " ? "drop-shadow(0 0 15px rgba(110, 89, 165, 0.5))" : "none"
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.p 
            variants={textChild}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl mx-auto"
          >
            We merge cinematic 3D environments with buttery-smooth interactions to create browsing experiences that feel alive.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={textContainer}
          >
            <motion.button 
              variants={textChild}
              onClick={handleExploreClick}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 15px rgba(110, 89, 165, 0.7)" 
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-nexora-primary hover:bg-opacity-90 text-white px-8 py-3 rounded-full font-medium transition-all"
            >
              Explore Features
            </motion.button>
            
            <motion.button 
              variants={textChild}
              onClick={handleShowcaseClick}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 15px rgba(51, 195, 240, 0.7)" 
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-transparent border border-nexora-secondary text-nexora-secondary hover:bg-nexora-secondary hover:bg-opacity-10 px-8 py-3 rounded-full font-medium transition-all"
            >
              View Showcase
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          ease: "easeInOut" 
        }}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-white rounded-full mt-2"
            animate={{ y: [0, 15, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              ease: "easeInOut",
              delay: 0.2
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
