
import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Features = () => {
  const features: Feature[] = [
    {
      title: '3D Product Configurator',
      description: 'Rotate, zoom, and customize products in WebGL with material/texture swaps.',
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
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 mb-4 text-nexora-accent">
          <path d="M4 4L12 12M12 12L20 4M12 12V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="features" className="py-20 relative z-10">
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

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <Card className="bg-nexora-dark bg-opacity-50 backdrop-blur-sm border-nexora-primary border-opacity-20 p-6 h-full hover-expand hover:shadow-lg hover:shadow-nexora-primary/20 transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  {feature.icon}
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
