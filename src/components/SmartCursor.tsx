
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SmartCursorProps {
  className?: string;
}

const SmartCursor: React.FC<SmartCursorProps> = ({ className }) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'click' | 'text'>('default');
  const [cursorSize, setCursorSize] = useState(40);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const [cursorOpacity, setCursorOpacity] = useState(0.8);
  const [cursorColor, setCursorColor] = useState('rgb(110, 89, 165)');
  
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const isScrolling = useRef(false);
  const mouseStationaryTimer = useRef<NodeJS.Timeout | null>(null);
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);
  
  // Initialize cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Detect if mouse moved a significant distance
      const movementDistance = Math.sqrt(
        Math.pow(e.clientX - lastMouseX.current, 2) +
        Math.pow(e.clientY - lastMouseY.current, 2)
      );
      
      // Update last position
      lastMouseX.current = e.clientX;
      lastMouseY.current = e.clientY;
      
      // Position cursor with slight delay for smoother effect
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      // Reset the timer when mouse moves
      if (mouseStationaryTimer.current) {
        clearTimeout(mouseStationaryTimer.current);
      }
      
      // If mouse moves fast, make cursor smaller
      if (movementDistance > 20) {
        setCursorSize(30);
      } else {
        setCursorSize(40);
      }
      
      // Set a new timer for mouse stationary detection
      mouseStationaryTimer.current = setTimeout(() => {
        setCursorSize(50); // Expand when stationary
        setCursorOpacity(0.5); // Fade a bit when stationary
      }, 500);
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    const handleMouseEnter = () => {
      setIsVisible(true);
    };
    
    const handleMouseDown = () => {
      setCursorType('click');
      setCursorSize(30); // Smaller on click
      setCursorOpacity(1); // More opaque on click
    };
    
    const handleMouseUp = () => {
      setCursorType('default');
      setCursorSize(40);
      setCursorOpacity(0.8);
    };
    
    const handleElementTypeDetection = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Text detection
      if (
        target.tagName === 'P' ||
        target.tagName === 'H1' ||
        target.tagName === 'H2' ||
        target.tagName === 'H3' ||
        target.tagName === 'SPAN' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA'
      ) {
        setCursorType('text');
        setCursorSize(25);
        setCursorColor('rgb(51, 195, 240)'); // Blue for text
      }
      // Clickable element detection
      else if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setCursorType('hover');
        setCursorSize(50);
        setCursorColor('rgb(249, 115, 22)'); // Orange for interactive elements
      }
      else {
        setCursorType('default');
        setCursorSize(40);
        setCursorColor('rgb(110, 89, 165)'); // Default purple
      }
    };
    
    // Track scroll speed
    const handleScroll = () => {
      const now = Date.now();
      const scrollY = window.scrollY;
      const timeDiff = now - lastScrollTime.current;
      
      if (timeDiff > 0) {
        // Calculate scroll speed (pixels per millisecond)
        const speed = Math.abs(scrollY - lastScrollY.current) / timeDiff;
        setScrollSpeed(speed * 100); // Scale for better visual effect
        
        // Affect cursor based on scroll speed
        if (speed > 0.1) {
          setCursorSize(30 * (1 - Math.min(speed, 0.5) * 1.5));
          setCursorOpacity(0.6);
        }
      }
      
      lastScrollTime.current = now;
      lastScrollY.current = scrollY;
      
      // Set scroll flag
      if (!isScrolling.current) {
        isScrolling.current = true;
        document.body.classList.add('is-scrolling');
      }
      
      // Clear existing timeout
      if (window.scrollTimeout) {
        clearTimeout(window.scrollTimeout);
      }
      
      // Set new timeout to detect when scrolling stops
      window.scrollTimeout = setTimeout(() => {
        isScrolling.current = false;
        document.body.classList.remove('is-scrolling');
        setCursorSize(40);
        setCursorOpacity(0.8);
      }, 100);
    };
    
    // Add all event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousemove', handleElementTypeDetection);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('scroll', handleScroll);
    
    // Handle cursor for specific elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('button, a, .interactive');
      
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          setCursorType('hover');
          setCursorSize(50);
        });
        
        element.addEventListener('mouseleave', () => {
          setCursorType('default');
          setCursorSize(40);
        });
      });
    };
    
    // Initial setup and periodic refresh for dynamic content
    addHoverListeners();
    const refreshInterval = setInterval(addHoverListeners, 2000);
    
    // Clean up
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousemove', handleElementTypeDetection);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      window.addEventListener('scroll', handleScroll);
      clearInterval(refreshInterval);
      if (mouseStationaryTimer.current) {
        clearTimeout(mouseStationaryTimer.current);
      }
    };
  }, []);
  
  // Different cursor variants
  const cursorVariants = {
    default: {
      height: cursorSize,
      width: cursorSize,
      borderRadius: '50%',
      backgroundColor: cursorColor,
      opacity: cursorOpacity,
      x: position.x - cursorSize / 2,
      y: position.y - cursorSize / 2,
      transition: {
        type: "spring",
        mass: 0.5,
        stiffness: 100,
        damping: isScrolling.current ? 8 : 15
      }
    },
    hover: {
      height: cursorSize,
      width: cursorSize,
      borderRadius: '30%',
      backgroundColor: 'rgba(249, 115, 22, 0.8)',
      opacity: cursorOpacity + 0.1,
      x: position.x - cursorSize / 2,
      y: position.y - cursorSize / 2,
      transition: {
        type: "spring",
        mass: 0.5,
        stiffness: 200,
        damping: 10
      }
    },
    click: {
      height: cursorSize * 0.8,
      width: cursorSize * 0.8,
      borderRadius: '40%',
      backgroundColor: 'rgba(249, 115, 22, 0.9)',
      opacity: 0.9,
      x: position.x - (cursorSize * 0.8) / 2,
      y: position.y - (cursorSize * 0.8) / 2,
      transition: {
        type: "spring",
        mass: 0.3,
        stiffness: 400,
        damping: 10
      }
    },
    text: {
      height: 25,
      width: 3,
      borderRadius: '1px',
      backgroundColor: 'rgba(51, 195, 240, 0.8)',
      opacity: 0.9,
      x: position.x - 1,
      y: position.y - 12,
      transition: {
        type: "spring",
        mass: 0.2,
        stiffness: 300,
        damping: 20
      }
    }
  };
  
  // Effect of scroll speed on cursor
  useEffect(() => {
    if (scrollSpeed > 0.5) {
      // Elongate cursor during fast scrolls
      const stretchFactor = Math.min(scrollSpeed / 10, 3);
      setCursorSize(prev => prev * stretchFactor);
      setCursorOpacity(prev => Math.max(prev - 0.3, 0.3));
    }
  }, [scrollSpeed]);
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            "cursor-follower pointer-events-none fixed z-[9999] mix-blend-difference",
            className
          )}
          variants={cursorVariants}
          animate={cursorType}
          initial="default"
          exit={{ opacity: 0, scale: 0 }}
        >
          <motion.div 
            className="absolute inset-0 opacity-40 blur-sm"
            style={{ 
              backgroundColor: cursorType === 'hover' ? 'rgba(249, 115, 22, 0.5)' 
                : cursorType === 'text' ? 'rgba(51, 195, 240, 0.5)'
                : 'rgba(110, 89, 165, 0.5)',
              borderRadius: 'inherit',
              scale: 1.2
            }}
            animate={{
              scale: [1.2, 1.3, 1.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SmartCursor;
