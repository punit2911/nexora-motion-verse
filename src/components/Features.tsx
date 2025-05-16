
import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence, Variants } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  category?: string;
  highlight?: boolean;
}

const Features = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  
  const features: Feature[] = [
    {
      title: '3D Product Configurator',
      description: 'Rotate, zoom, and customize products in WebGL with material/texture swaps.',
      category: 'Visualization',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 mb-4 text-nexora-secondary">
          <path d="M12 17L3 12V19L12 24L21 19V12L12 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 17V24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 5L12 0L21 5L12 10L3 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 0V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'Parallax Depth Engine',
      description: 'Multi-layered backgrounds that shift with device gyroscope or cursor movement.',
      category: 'Animation',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 mb-4 text-nexora-primary">
          <path d="M4 17L7 12L4 7H20L17 12L20 17H4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'Dynamic Gradient Mesh',
      description: 'SVG-based gradients that recalculate paths based on viewport size.',
      category: 'Styling',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 mb-4 text-nexora-accent">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
          <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 2V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: 'Micro-Interaction Library',
      description: '50+ preset animations (e.g., "magnetic" buttons, stretching input fields).',
      category: 'Animation',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 mb-4 text-nexora-secondary">
          <path d="M8 3V7M16 3V7M3 10H21M5 5H19C20.1046 5 21 5.89543 21 7V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V7C3 5.89543 3.89543 5 5 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 15H9M15 15H17M7 18H9M15 18H17M12 15H14M12 18H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'Scroll-Driven Video Scrubber',
      description: 'Background videos that advance frame-by-frame as you scroll.',
      category: 'Media',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 mb-4 text-nexora-primary">
          <path d="M15 6H9M13 18H11M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 14V10L12 12L16 14L12 16L8 14Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'Context-Aware Cursor',
      description: 'Changes shape/color based on interactive elements (e.g., becomes a "drag" icon over carousels).',
      category: 'Interaction',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 mb-4 text-nexora-accent">
          <path d="M4 4L12 12M12 12L20 4M12 12V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    // New features with advanced animations
    {
      title: 'Morphing SVG Illustrations',
      description: 'Vector illustrations that transform between states with fluid shape tweening.',
      category: 'Visualization',
      highlight: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 mb-4 text-nexora-primary">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 9H9.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 9H15.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'Audio Reactive Elements',
      description: 'UI components that pulse and transform in response to music or voice input.',
      category: 'Media',
      highlight: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 mb-4 text-nexora-secondary">
          <path d="M12 6V12M16 9V12M8 12V13M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 14C2 16.2091 3.79086 18 6 18H18C20.2091 18 22 16.2091 22 14V10C22 7.79086 20.2091 6 18 6H6C3.79086 6 2 7.79086 2 10V14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'Spatial Navigation Grid',
      description: '3D grid system allowing users to navigate between content "rooms" in virtual space.',
      category: 'Navigation',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 mb-4 text-nexora-accent">
          <path d="M3 3H21M3 3V21M3 3L21 21M21 3V21M21 3L3 21M21 21H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'Particle Field Interactions',
      description: 'Interactive floating particle systems that respond to user gestures with physics.',
      category: 'Animation',
      highlight: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 mb-4 text-nexora-primary">
          <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" stroke="currentColor" strokeWidth="2" />
          <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" stroke="currentColor" strokeWidth="2" />
          <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" stroke="currentColor" strokeWidth="2" />
          <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" stroke="currentColor" strokeWidth="2" />
          <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" stroke="currentColor" strokeWidth="2" />
          <path d="M12 12L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 12L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: 'Distortion Hover Effects',
      description: 'Liquid-like ripple distortions that follow cursor movement over images and UI.',
      category: 'Interaction',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 mb-4 text-nexora-secondary">
          <path d="M12 3L12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4" />
          <path d="M3 12C3 12 7 8 12 8C17 8 21 12 21 12C21 12 17 16 12 16C7 16 3 12 3 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'Perspective Text Scrolling',
      description: 'Typography that scales and rotates in 3D space as the user scrolls through content.',
      category: 'Typography',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 mb-4 text-nexora-accent">
          <path d="M4 7V4H20V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 20H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 4V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'Augmented Reality Overlays',
      description: 'Camera-based AR elements that anchor digital content to physical world markers.',
      category: 'Visualization',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 mb-4 text-nexora-primary">
          <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.6 9H20.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.6 15H20.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 3C14.5 7.5 14.5 16.5 12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 3C9.5 7.5 9.5 16.5 12 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'Gesture-Based Navigation',
      description: 'Multi-touch gesture recognition system for intuitive drag, swipe, and pinch navigation.',
      category: 'Navigation',
      highlight: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 mb-4 text-nexora-secondary">
          <path d="M8 13V4.5C8 3.67157 8.67157 3 9.5 3C10.3284 3 11 3.67157 11 4.5V13M11 8.5C11 7.67157 11.6716 7 12.5 7C13.3284 7 14 7.67157 14 8.5V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 10.5C14 9.67157 14.6716 9 15.5 9C16.3284 9 17 9.67157 17 10.5V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17 12.5C17 11.6716 17.6716 11 18.5 11C19.3284 11 20 11.6716 20 12.5V16.2C20 19.6 16.4183 22 13 22C9.58172 22 7 19.6 7 16.2V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 12.5C5 11.6716 5.67157 11 6.5 11C7.32843 11 8 11.6716 8 12.5V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'Animated Data Storytelling',
      description: 'Narrative-driven data visualizations that unfold and transform as users scroll.',
      category: 'Data',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 mb-4 text-nexora-accent">
          <path d="M4 15L8 9L12 15L16 9L20 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 22H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="3" y="2" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="14" y="2" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: 'Neural Interface Prototype',
      description: 'Experimental UI that adapts to user attention patterns via webcam eye-tracking.',
      category: 'Interaction',
      highlight: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 mb-4 text-nexora-primary">
          <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 12L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  // Get unique categories
  const categories = Array.from(new Set(features.map(f => f.category)));
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 20px rgba(110, 89, 165, 0.3)",
      transition: { duration: 0.3 }
    }
  };

  const iconVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5, delay: 0.2 }
    },
    hover: {
      scale: 1.2,
      rotate: [0, 5, -5, 0],
      transition: { duration: 0.5, repeat: 0 }
    }
  };

  const filterFeatures = () => {
    if (!activeCategory) return features;
    return features.filter(feature => feature.category === activeCategory);
  };

  return (
    <section id="features" className="py-20 relative z-10 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Cutting-Edge Features</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore our innovative features designed to create immersive and interactive web experiences.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === null ? 'bg-nexora-primary text-white' : 'bg-nexora-dark border border-nexora-primary/30 text-gray-300'
            }`}
            onClick={() => setActiveCategory(null)}
          >
            All
          </motion.button>
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category ? 'bg-nexora-primary text-white' : 'bg-nexora-dark border border-nexora-primary/30 text-gray-300'
              }`}
              onClick={() => setActiveCategory(category || null)}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filterFeatures().map((feature, index) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                exit={{ opacity: 0, scale: 0.8 }}
                variants={cardVariants}
                whileHover="hover"
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredFeature(index)}
                onHoverEnd={() => setHoveredFeature(null)}
                layout
                className={`${feature.highlight ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                <Card 
                  className={`bg-nexora-dark bg-opacity-50 backdrop-blur-sm border-nexora-primary border-opacity-20 p-6 h-full transition-all duration-300 ${
                    feature.highlight ? 'ring-2 ring-nexora-secondary ring-opacity-50' : ''
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      variants={iconVariants}
                      animate={hoveredFeature === index ? "hover" : "visible"}
                    >
                      {feature.icon}
                    </motion.div>
                    <motion.h3 
                      className="text-xl font-semibold text-white mb-3"
                      animate={hoveredFeature === index ? {
                        color: feature.highlight ? "#33C3F0" : "#FFFFFF"
                      } : {}}
                    >
                      {feature.title}
                    </motion.h3>
                    <p className="text-gray-300">{feature.description}</p>
                    {feature.category && (
                      <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 inline-block px-3 py-1 rounded-full text-xs bg-nexora-primary bg-opacity-20 text-nexora-secondary"
                      >
                        {feature.category}
                      </motion.span>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Features;
