import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CustomCursorProps {
  darkMode: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ darkMode }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [preserveColorHover, setPreserveColorHover] = useState(false);
  
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
    const updateHoverState = (target: Element | null) => {
      const element = target;
      const isInteractive = Boolean(
        element &&
          (element.tagName === 'A' ||
            element.tagName === 'BUTTON' ||
            element.closest('a') ||
            element.closest('button') ||
            element.classList.contains('cursor-pointer'))
      );

      setIsHovering(isInteractive);
      setPreserveColorHover(Boolean(element?.closest('[data-cursor-preserve]')));
    };

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      updateHoverState(document.elementFromPoint(e.clientX, e.clientY));
    };

    const handleMouseOver = (e: MouseEvent) => {
      updateHoverState(e.target as Element);
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
          ${preserveColorHover
            ? darkMode
              ? 'border-neon-cyan'
              : 'border-lab-accent/70'
            : darkMode
            ? 'border-neon-cyan' 
            : 'border-lab-accent/70'
          }`}
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: isHovering 
              ? (preserveColorHover ? 'transparent' : darkMode ? 'rgba(125, 221, 232, 0.10)' : 'rgba(31, 56, 100, 0.06)') 
              : 'transparent',
        }}
        animate={{
          scale: isHovering && !preserveColorHover ? 1.5 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* 2. The Inner Dot (Instant) */}
      <motion.div 
         className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[101] transition-opacity duration-200
            ${darkMode ? 'bg-neon-cyan' : 'bg-lab-accent'} 
            ${isHovering && !preserveColorHover ? 'opacity-0' : 'opacity-100'}
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
