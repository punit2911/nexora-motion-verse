import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  
  const fullText = "Experience the perfect fusion of cutting-edge design and seamless functionality in one captivating digital space.";
  
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

  // Typing animation effect with special handling for "We"
  useEffect(() => {
    // Start with just "W" for a brief moment
    setDisplayText('W');
    
    // Delay before completing to "We"
    const initialDelay = setTimeout(() => {
      setDisplayText('We '); // Added a space after "We"
      
      // Then continue with the rest of the text after another short delay
      const continueDelay = setTimeout(() => {
        let currentIndex = 3; // Start from index 3 (after "We ")
        
        const typingInterval = setInterval(() => {
          if (currentIndex < fullText.length) {
            setDisplayText(prev => prev + fullText.charAt(currentIndex));
            currentIndex++;
          } else {
            clearInterval(typingInterval);
            setIsTypingComplete(true);
          }
        }, 40); // Speed of typing
        
        return () => clearInterval(typingInterval);
      }, 400); // Delay before continuing with the rest of the text
      
      return () => clearTimeout(continueDelay);
    }, 800); // Delay before completing "We"
    
    return () => clearTimeout(initialDelay);
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

  // Blinking cursor animation - fixed type definition
  const cursorVariants: Variants = {
    blinking: {
      opacity: [0, 1, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "loop" as const,
      }
    }
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
          
          {/* Enhanced title with advanced blur effect */}
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 relative"
            variants={textContainer}
          >
            <div className="absolute -inset-1 blur-[20px] bg-gradient-to-r from-nexora-primary via-nexora-secondary to-nexora-accent opacity-70 rounded-lg"></div>
            <div className="absolute -inset-2 blur-[40px] bg-nexora-primary/30 rounded-lg animate-pulse"></div>
            {Array.from("Welcome to Nexora").map((letter, index) => (
              <motion.span
                key={index}
                variants={textChild}
                className="inline-block relative z-10"
                style={{ 
                  display: 'inline-block',
                  textShadow: letter !== " " ? 
                    "0 0 15px rgba(110, 89, 165, 0.8), 0 0 30px rgba(51, 195, 240, 0.4), 0 0 5px rgba(249, 115, 22, 0.3)" 
                    : "none"
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>
          
          {/* Typing effect for paragraph with special handling for "We" */}
          <div className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl mx-auto relative z-10 h-[80px] flex items-center justify-center">
            <div className="flex">
              <p>{displayText}</p>
              {!isTypingComplete && (
                <motion.span
                  variants={cursorVariants}
                  animate="blinking"
                  className="inline-block w-[3px] h-[24px] bg-nexora-secondary ml-1"
                />
              )}
            </div>
          </div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={textContainer}
          >
            <motion.button 
              variants={textChild}
              onClick={handleExploreClick}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(110, 89, 165, 0.8)" 
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-nexora-primary hover:bg-opacity-90 text-white px-8 py-3 rounded-full font-medium transition-all relative z-10 overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-nexora-primary to-nexora-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10">Explore Features</span>
            </motion.button>
            
            <motion.button 
              variants={textChild}
              onClick={handleShowcaseClick}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(51, 195, 240, 0.8)" 
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-transparent border border-nexora-secondary text-nexora-secondary hover:bg-nexora-secondary hover:bg-opacity-10 px-8 py-3 rounded-full font-medium transition-all relative z-10"
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
