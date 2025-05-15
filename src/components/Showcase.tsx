
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface ShowcaseItem {
  title: string;
  description: string;
  color: string;
}

const Showcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const showcaseItems: ShowcaseItem[] = [
    {
      title: "Procedural Motion Backgrounds",
      description: "Unique algorithm-generated patterns that create a different experience with every visit.",
      color: "from-nexora-primary to-nexora-secondary",
    },
    {
      title: "Sticky Element Orchestration",
      description: "Multiple sticky elements that intelligently avoid collisions during scroll.",
      color: "from-nexora-secondary to-nexora-accent",
    },
    {
      title: "Real-Time Physics UI",
      description: "Menus that 'swing' into place with spring animations using Matter.js.",
      color: "from-nexora-accent to-nexora-primary",
    },
    {
      title: "Animated SVG Data Viz",
      description: "Charts and graphs that self-draw with variable line tension for dynamic visualization.",
      color: "from-nexora-primary to-nexora-secondary",
    },
  ];

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <section id="showcase" className="py-20 bg-nexora-dark relative overflow-hidden" ref={containerRef}>
      {/* Animated background shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full morphing-shape opacity-10"></div>
        <div className="absolute -bottom-[10%] -left-[10%] w-[35%] h-[35%] rounded-full morphing-shape opacity-10"></div>
      </div>

      <motion.div 
        style={{ opacity, scale }}
        className="container mx-auto px-4 relative z-10"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Showcase</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Experience our innovative UI techniques that push the boundaries of web design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {showcaseItems.map((item, index) => (
            <ShowcaseCard 
              key={index} 
              title={item.title}
              description={item.description}
              color={item.color}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

interface ShowcaseCardProps {
  title: string;
  description: string;
  color: string;
  index: number;
}

const ShowcaseCard = ({ title, description, color, index }: ShowcaseCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * -10}deg)`,
        transition: 'transform 0.3s ease-out',
      }}
      whileHover={{ scale: 1.02 }}
      className="w-full"
    >
      <Card className={cn(
        "bg-gradient-to-br", 
        color, 
        "border-none overflow-hidden p-8 h-60 flex flex-col justify-end relative"
      )}>
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
        <div className="relative z-10">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-200">{description}</p>
        </div>
      </Card>
    </motion.div>
  );
};

export default Showcase;
