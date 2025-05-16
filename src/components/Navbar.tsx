
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Enhanced animations for the navbar
  const navbarVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1,
        ease: "easeOut",
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Animation for the glowing underline effect
  const underlineVariants: Variants = {
    initial: { width: "0%", left: "50%" },
    hover: { 
      width: "100%", 
      left: "0%",
      transition: { 
        type: "tween", 
        ease: "easeInOut", 
        duration: 0.3 
      }
    }
  };

  // Gradient animation for the logo
  const gradientVariants: Variants = {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 8,
        ease: "linear",
        repeat: Infinity,
      }
    }
  };

  // Menu items with enhanced animations
  const navItems = ['Features', 'Showcase', 'Technology', 'Contact'];

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4',
        scrolled 
          ? 'bg-nexora-dark bg-opacity-90 backdrop-blur-sm shadow-lg' 
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <motion.div
          variants={itemVariants}
          className="flex items-center"
          animate="animate"
        >
          <Link to="/" className="flex items-center">
            <motion.span 
              className="text-xl md:text-2xl font-bold"
              variants={gradientVariants}
              animate="animate"
              style={{
                backgroundImage: "linear-gradient(90deg, #6E59A5, #33C3F0, #F97316, #6E59A5)",
                backgroundSize: "300% 100%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                display: "inline-block"
              }}
            >
              Nexora
            </motion.span>
          </Link>
        </motion.div>

        {/* Desktop navigation */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              onHoverStart={() => setHoveredItem(index)}
              onHoverEnd={() => setHoveredItem(null)}
              className="relative"
            >
              <Link 
                to={`/${item.toLowerCase()}`} 
                className="text-white hover:text-nexora-secondary transition-colors duration-300 py-2 px-1"
              >
                {item}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-nexora-secondary"
                  variants={underlineVariants}
                  initial="initial"
                  animate={hoveredItem === index ? "hover" : "initial"}
                />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile menu button with enhanced animation */}
        <motion.div 
          className="md:hidden"
          variants={itemVariants}
        >
          <motion.button 
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          >
            <motion.svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              animate={{
                rotate: menuOpen ? 180 : 0,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut"
              }}
            >
              {menuOpen ? (
                <motion.path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                />
              ) : (
                <motion.path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3, staggerChildren: 0.1 }}
                />
              )}
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>

      {/* Mobile menu with enhanced animations */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              opacity: { duration: 0.3 },
              height: { duration: 0.4, ease: "easeInOut" }
            }}
            className="md:hidden bg-nexora-dark bg-opacity-95 backdrop-blur-sm"
          >
            <div className="container mx-auto px-4 py-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ x: 5 }}
                >
                  <Link 
                    to={`/${item.toLowerCase()}`} 
                    className="block py-3 text-white hover:text-nexora-secondary transition-colors flex items-center"
                    onClick={() => setMenuOpen(false)}
                  >
                    <motion.span
                      initial={{ width: 0 }}
                      animate={{ width: 4 }}
                      className="bg-nexora-secondary h-4 mr-2 rounded-full"
                    />
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
