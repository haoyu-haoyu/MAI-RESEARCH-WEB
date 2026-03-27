import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroScene from './components/HeroScene';
import BentoGrid from './components/BentoGrid';
import PublicationList from './components/PublicationList';
import Team from './components/Team';
import CustomCursor from './components/CustomCursor';
import { PROJECTS, PUBLICATIONS, TEAM } from './constants';
import { ArrowDown } from 'lucide-react';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Initialize theme based on preference
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  // Update HTML class for Tailwind dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <CustomCursor darkMode={darkMode} />
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <HeroScene darkMode={darkMode} />
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-normal text-lab-text dark:text-void-text tracking-tighter mb-6 mix-blend-exclusion dark:mix-blend-normal">
              MAI<span className="text-lab-accent dark:text-neon-cyan">.</span>Research
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-xl font-mono text-lab-text/80 dark:text-void-text/80 tracking-wide max-w-3xl mx-auto"
          >
            Advancing the frontiers of <span className="text-lab-accent dark:text-neon-cyan border-b border-current">Multimodal Intelligence</span> & Medical Computing.
          </motion.p>
        </div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-lab-text/50 dark:text-void-text/50">Scroll to Explore</span>
            <ArrowDown className="animate-bounce text-lab-text/50 dark:text-void-text/50 w-5 h-5" />
        </motion.div>
      </section>

      {/* Research Section */}
      <section id="research" className="relative py-24 md:py-32 px-6 container mx-auto">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-lab-gray dark:border-void-gray pb-8">
            <div>
                <span className="text-sm font-mono text-lab-accent dark:text-neon-cyan mb-2 block">01 / RESEARCH</span>
                <h2 className="text-4xl md:text-6xl font-serif text-lab-text dark:text-void-text">
                    Selected Work
                </h2>
            </div>
            <p className="max-w-md text-lab-text/70 dark:text-void-text/70">
                Developing next-generation algorithms for computer vision, foundation models, and trustworthy AI in healthcare.
            </p>
        </div>
        <BentoGrid projects={PROJECTS} />
      </section>

      {/* Publications Section */}
      <section id="publications" className="relative py-24 md:py-32 bg-lab-gray/30 dark:bg-void-gray/20">
         <div className="container mx-auto px-6">
            <div className="mb-16 text-center">
                <span className="text-sm font-mono text-lab-accent dark:text-neon-cyan mb-2 block">02 / KNOWLEDGE</span>
                <h2 className="text-4xl md:text-6xl font-serif text-lab-text dark:text-void-text">Publications</h2>
            </div>
            <PublicationList publications={PUBLICATIONS} />
         </div>
      </section>

      {/* Team Section */}
      <section id="team" className="relative py-24 md:py-32 px-6 container mx-auto">
        <div className="mb-16 md:mb-24">
             <span className="text-sm font-mono text-lab-accent dark:text-neon-cyan mb-2 block">03 / PEOPLE</span>
             <h2 className="text-4xl md:text-6xl font-serif text-lab-text dark:text-void-text mb-8">The Team</h2>
             <div className="h-px w-full bg-lab-gray dark:bg-void-gray"></div>
        </div>
        <Team members={TEAM} />
      </section>

      {/* Contact / Footer */}
      <footer id="contact" className="relative py-24 bg-lab-text dark:bg-black text-lab-white dark:text-void-text overflow-hidden">
         {/* Decorative big text */}
         <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5 dark:opacity-10 overflow-hidden flex items-center justify-center">
             <span className="text-[20vw] font-serif leading-none whitespace-nowrap">MAI LAB</span>
         </div>

         <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                    <h2 className="text-4xl md:text-5xl font-serif mb-8">Collaborate with us.</h2>
                    <a href="mailto:zina.ibrahim@kcl.ac.uk" className="text-2xl md:text-3xl font-mono hover:text-neon-cyan transition-colors underline decoration-1 underline-offset-8">
                        zina.ibrahim@kcl.ac.uk
                    </a>
                </div>
                
                <div className="grid grid-cols-2 gap-8 text-sm font-mono">
                    <div>
                        <h4 className="opacity-50 mb-4">LOCATION</h4>
                        <p>Dept. of Biostatistics & Health Informatics</p>
                        <p>King's College London</p>
                        <p>London, United Kingdom</p>
                    </div>
                    <div>
                        <h4 className="opacity-50 mb-4">SOCIALS</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-neon-cyan transition-colors">Twitter / X</a></li>
                            <li><a href="https://github.com/mai-research" target="_blank" rel="noreferrer" className="hover:text-neon-cyan transition-colors">GitHub</a></li>
                            <li><a href="#" className="hover:text-neon-cyan transition-colors">Google Scholar</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs font-mono opacity-50">
                <p>&copy; 2025 MAI Research Group. All rights reserved.</p>
                <p>Designed for clarity.</p>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default App;