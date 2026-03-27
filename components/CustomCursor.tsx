import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CustomCursorProps {
  darkMode: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ darkMode }) => {
  const [isHovering, setIsHovering] = useState(false);
  
  // 1. Raw Mouse Position (Instant Response)
  // This tracks the mouse exactly 1:1 to eliminate perceived latency for the user
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Smooth Mouse Position (Delayed/Organic for the Ring)
  // Significantly tightened physics to minimize separation lag while keeping slight smoothness
  // Lower mass + Higher stiffness = tighter follow
  const springConfig = { damping: 35, stiffness: 800, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* 1. The Outer Ring (Smooth Follow) */}
      <motion.div
        className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[100] border transition-colors duration-300
          ${darkMode 
            ? 'border-neon-cyan mix-blend-normal' 
            : 'border-white mix-blend-difference'
          }`}
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: isHovering 
              ? (darkMode ? 'rgba(102, 252, 241, 0.1)' : 'rgba(255, 255, 255, 1)') 
              : 'transparent',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* 2. The Inner Dot (Instant) */}
      <motion.div 
         className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[101] transition-opacity duration-200
            ${darkMode ? 'bg-neon-cyan' : 'bg-white'} 
            ${isHovering ? 'opacity-0' : 'opacity-100'}
            ${!darkMode ? 'mix-blend-difference' : ''} 
         `}
         style={{
            x: mouseX,
            y: mouseY,
            translateX: '-50%',
            translateY: '-50%'
         }}
      />
    </>
  );
};

export default CustomCursor;