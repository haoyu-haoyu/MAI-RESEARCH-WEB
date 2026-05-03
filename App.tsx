import React, { useState, useEffect, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroBackgroundElements from './components/HeroBackgroundElements';
import CustomCursor from './components/CustomCursor';
import BentoGrid from './components/BentoGrid';
import PublicationList from './components/PublicationList';
import Team from './components/Team';
import MethodPage from './components/MethodPage';
import ProjectPage from './components/ProjectPage';
import { PROJECTS, PROJECT_PAGES, PUBLICATIONS, TEAM } from './constants';
import { ArrowDown } from 'lucide-react';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [hashRoute, setHashRoute] = useState(() => window.location.hash);

  const scrollToTopInstantly = () => {
    const root = document.documentElement;

    root.classList.add('mai-instant-scroll');
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    window.requestAnimationFrame(() => {
      root.classList.remove('mai-instant-scroll');
    });
  };

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

  useEffect(() => {
    const handleHashChange = () => setHashRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useLayoutEffect(() => {
    if (hashRoute.startsWith('#/')) {
      scrollToTopInstantly();
      return;
    }

    if (hashRoute.length > 1 && !hashRoute.startsWith('#/')) {
      window.setTimeout(() => {
        document.querySelector(hashRoute)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    }
  }, [hashRoute]);

  const toggleTheme = () => setDarkMode(!darkMode);
  const isMethodPage = hashRoute.startsWith('#/method');
  const projectSlug = hashRoute.startsWith('#/projects/')
    ? hashRoute.replace('#/projects/', '').split(/[?#]/)[0]
    : '';
  const activeProject = projectSlug ? PROJECT_PAGES[projectSlug] : undefined;

  useEffect(() => {
    const defaultTitle = 'MAI Research | Multimodal AI Laboratory';
    const defaultDescription = 'Advancing multimodal intelligence, foundation models, and trustworthy AI for medicine and health.';

    let nextTitle = defaultTitle;
    let nextDescription = defaultDescription;

    if (isMethodPage) {
      nextTitle = 'METHOD | MAI Research';
      nextDescription = 'METHOD is a Modular Efficient Transformer for health outcome discovery, designed for patient-aware clinical trajectory modeling.';
    } else if (activeProject) {
      nextTitle = `${activeProject.title} | MAI Research`;
      nextDescription = activeProject.summary;
    }

    document.title = nextTitle;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', nextDescription);
  }, [activeProject, isMethodPage]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <CustomCursor darkMode={darkMode} />
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      {isMethodPage ? (
        <MethodPage />
      ) : activeProject ? (
        <ProjectPage project={activeProject} />
      ) : (
        <>
      <style>
        {`
          @media (min-width: 1200px) and (min-aspect-ratio: 21 / 10) {
            .mai-wide-container {
              max-width: min(86vw, 2360px);
            }

            .mai-wide-section {
              padding-top: 144px;
              padding-bottom: 160px;
            }

            .mai-section-heading {
              margin-bottom: 104px;
              gap: clamp(96px, 12vw, 320px);
            }

            .mai-section-heading h2 {
              font-size: clamp(72px, 3.8vw, 96px);
              line-height: 0.96;
            }

            .mai-section-heading p {
              max-width: 640px;
              font-size: 20px;
              line-height: 1.55;
            }
          }
        `}
      </style>

      <main>
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <h1 className="sr-only">MAI Research</h1>
        <HeroBackgroundElements darkMode={darkMode} />

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
        >
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#0a192f] dark:text-white/50">Scroll to Explore</span>
            <ArrowDown className="animate-bounce text-[#0a192f] dark:text-white/50 w-5 h-5" />
        </motion.div>
      </section>

      {/* Research Section */}
      <section id="research" className="relative py-24 md:py-32 px-6 container mai-wide-container mai-wide-section mx-auto">
        <div className="mai-section-heading mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-lab-gray dark:border-void-gray pb-8">
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
      <section id="publications" className="relative py-24 md:py-32 mai-wide-section bg-lab-gray/30 dark:bg-void-gray/20">
         <div className="container mai-wide-container mx-auto px-6">
            <div className="mb-16 text-center">
                <span className="text-sm font-mono text-lab-accent dark:text-neon-cyan mb-2 block">02 / KNOWLEDGE</span>
                <h2 className="text-4xl md:text-6xl font-serif text-lab-text dark:text-void-text">Publications</h2>
            </div>
            <PublicationList publications={PUBLICATIONS} />
         </div>
      </section>

      {/* Team Section */}
      <section id="team" className="relative py-24 md:py-32 px-6 container mai-wide-container mai-wide-section mx-auto">
        <div className="mai-section-heading mb-16 md:mb-24">
             <span className="text-sm font-mono text-lab-accent dark:text-neon-cyan mb-2 block">03 / PEOPLE</span>
             <h2 className="text-4xl md:text-6xl font-serif text-lab-text dark:text-void-text mb-8">The Team</h2>
             <div className="h-px w-full bg-lab-gray dark:bg-void-gray"></div>
        </div>
        <Team members={TEAM} />
      </section>
      </main>

      {/* Contact / Footer */}
      <footer id="contact" className="relative py-24 bg-lab-text dark:bg-black text-lab-white dark:text-void-text overflow-hidden">
         {/* Decorative big text */}
         <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5 dark:opacity-10 overflow-hidden flex items-center justify-center">
             <span className="text-[20vw] font-serif leading-none whitespace-nowrap">MAI LAB</span>
         </div>

         <div className="container mai-wide-container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                    <h2 className="text-4xl md:text-5xl font-serif mb-8">Collaborate with us.</h2>
                    <a href="mailto:zina.ibrahim@kcl.ac.uk" className="text-2xl md:text-3xl font-mono hover:text-neon-cyan transition-colors underline decoration-1 underline-offset-8">
                        zina.ibrahim@kcl.ac.uk
                    </a>
                </div>
                
                <div className="grid grid-cols-2 gap-8 text-sm font-mono">
                    <div>
                        <p className="opacity-50 mb-4">LOCATION</p>
                        <p>Dept. of Biostatistics & Health Informatics</p>
                        <p>King's College London</p>
                        <p>London, United Kingdom</p>
                    </div>
                    <div>
                        <p className="opacity-50 mb-4">SOCIALS</p>
                        <ul className="space-y-2">
                            <li><a href="https://github.com/mai-research" target="_blank" rel="noreferrer" className="hover:text-neon-cyan transition-colors">GitHub</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs font-mono opacity-50">
                <p>&copy; 2026 MAI Research Group. All rights reserved.</p>
                <p>Designed for clarity.</p>
            </div>
         </div>
      </footer>
        </>
      )}
    </div>
  );
};

export default App;
