import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface BentoGridProps {
  projects: Project[];
}

const BentoGrid: React.FC<BentoGridProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[350px]">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`relative group overflow-hidden rounded-3xl bg-lab-white dark:bg-void-gray border border-lab-gray dark:border-white/10 dark:hover:border-neon-cyan/50 transition-all duration-500 shadow-sm hover:shadow-xl
            ${project.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
            ${project.size === 'medium' ? 'md:col-span-2' : ''}
            ${project.size === 'small' ? 'md:col-span-1' : ''}
          `}
        >
          {/* Image Container */}
          <div className="absolute top-0 left-0 w-full h-[65%] bg-white p-6 flex items-center justify-center overflow-hidden">
             {/* Use object-contain to show full diagrams. Adding blend mode for integration. */}
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Content Container - Bottom Part */}
          <div className="absolute bottom-0 left-0 w-full h-[35%] bg-lab-white dark:bg-void-gray p-6 flex flex-col justify-between border-t border-lab-gray dark:border-white/5 z-10">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-mono text-lab-accent/60 dark:text-neon-cyan mb-1 block">
                    {project.category}
                </span>
                <h3 className="text-xl md:text-2xl font-serif text-lab-text dark:text-white leading-tight">
                    {project.title}
                </h3>
              </div>
              
              <div className="w-8 h-8 rounded-full border border-lab-text/10 dark:border-white/20 flex items-center justify-center group-hover:bg-lab-text group-hover:text-white dark:group-hover:bg-neon-cyan dark:group-hover:text-black transition-all duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
            
            {/* Description only visible on large cards or hover on desktop could be an option, but keeping it clean here */}
             <div className="hidden md:block">
                 <p className="text-xs text-lab-text/60 dark:text-void-text/60 line-clamp-2 mt-2">
                    {project.description}
                 </p>
             </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BentoGrid;