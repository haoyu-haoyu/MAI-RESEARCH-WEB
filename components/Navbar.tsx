import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Research', href: '#research' },
    { name: 'Publications', href: '#publications' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 border-b ${
        isScrolled
          ? 'bg-lab-white/80 dark:bg-void-black/80 backdrop-blur-md border-lab-gray dark:border-void-gray py-4'
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-4 group">
          <div className="relative w-16 h-8">
            <svg 
              viewBox="0 0 80 40" 
              className="w-full h-full fill-lab-accent dark:fill-neon-cyan transition-colors duration-500"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* M - Geometric Block */}
              <path d="M0 40 V0 L15 20 L30 0 V40 H22 V15 L15 25 L8 15 V40 H0Z" />
              
              {/* A - Solid Triangle */}
              <path d="M35 40 L45 10 L55 40 H35Z" />
              
              {/* i - Stick and Dot */}
              <rect x="62" y="18" width="6" height="22" />
              <circle cx="65" cy="8" r="4" />
            </svg>
            
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-lab-accent dark:bg-neon-cyan blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
          </div>
          
          <div className="h-8 w-px bg-lab-text/10 dark:bg-void-text/10"></div>
          
          <span className="font-mono text-xs font-bold tracking-[0.2em] text-lab-text/80 dark:text-void-text/80 uppercase pt-0.5">
            Research
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-lab-text dark:text-void-text hover:text-lab-accent dark:hover:text-neon-cyan transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          <div className="w-px h-6 bg-lab-gray dark:bg-void-gray mx-2"></div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-lab-gray dark:hover:bg-void-gray transition-colors group relative overflow-hidden"
            aria-label="Toggle Theme"
          >
            <div className="relative z-10">
                {darkMode ? <Sun size={20} className="text-neon-cyan" /> : <Moon size={20} className="text-lab-accent" />}
            </div>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-lab-text dark:text-void-text"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-lab-white dark:bg-void-black border-b border-lab-gray dark:border-void-gray overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-serif text-lab-text dark:text-void-text"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-lab-gray dark:bg-void-gray my-2"></div>
              <button
                onClick={() => {
                  toggleTheme();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-lab-text dark:text-void-text"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                <span>Switch to {darkMode ? 'Light' : 'Dark'} Mode</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;