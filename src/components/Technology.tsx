
import React from 'react';
import { motion } from 'framer-motion';

const Technology = () => {
  const technologies = [
    {
      title: "3D Pipeline",
      items: [
        "Three.js + Spline Integration: Pre-rendered 3D assets with LOD optimization.",
        "Raycasting: Objects highlight when intersected by cursor (zero lag)."
      ]
    },
    {
      title: "Motion Choreography",
      items: [
        "GSAP Timeline Control: Animations queue like a storyboard.",
        "ScrollTrigger: Animations sync to scroll distance."
      ]
    },
    {
      title: "Performance Tactics",
      items: [
        "Web Workers: Offload animation math to background threads.",
        "GPU Acceleration: Force-hardware acceleration for complex CSS filters."
      ]
    },
    {
      title: "Hover Physics",
      items: [
        "Poisson Distribution: Particles repel naturally from cursor with velocity decay.",
        "SVG Filter Effects: Buttons apply turbulence/displacement on hover."
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="technology" className="py-20 bg-gradient-to-b from-black to-nexora-dark relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-nexora-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-nexora-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technology</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Advanced animatics breakdown of our innovative technologies.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {technologies.map((tech, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-nexora-dark bg-opacity-50 backdrop-blur-sm border border-nexora-primary border-opacity-20 rounded-lg p-6 hover:shadow-lg hover:shadow-nexora-primary/20 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-nexora-secondary mb-4">{tech.title}</h3>
              <ul className="space-y-3">
                {tech.items.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-nexora-accent mr-2">•</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Additional Features</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-nexora-dark bg-opacity-50 backdrop-blur-sm border border-nexora-primary border-opacity-20 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-white mb-2">Dynamic Shadow System</h4>
              <p className="text-gray-300 text-sm">Light sources that recast shadows when 3D objects move.</p>
            </div>
            
            <div className="bg-nexora-dark bg-opacity-50 backdrop-blur-sm border border-nexora-primary border-opacity-20 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-white mb-2">Glitch Transition Effects</h4>
              <p className="text-gray-300 text-sm">Cyberpunk-style screen distortions between page loads.</p>
            </div>
            
            <div className="bg-nexora-dark bg-opacity-50 backdrop-blur-sm border border-nexora-primary border-opacity-20 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-white mb-2">Battery-Efficient Mode</h4>
              <p className="text-gray-300 text-sm">Detects low-power devices and switches to simplified animations.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Technology;
