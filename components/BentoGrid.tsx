import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface BentoGridProps {
  projects: Project[];
}

const BentoGrid: React.FC<BentoGridProps> = ({ projects }) => {
  return (
    <div className="mai-bento-grid grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[350px]">
      <style>
        {`
          .mai-bento-description {
            margin-top: 18px;
          }

          .mai-bento-description p {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            line-height: 1.55;
            -webkit-line-clamp: 3;
          }

          .mai-bento-card-large .mai-bento-description p {
            -webkit-line-clamp: 6;
          }

          .mai-bento-card-medium .mai-bento-description p {
            -webkit-line-clamp: 1;
          }

          .mai-bento-card-medium .mai-bento-description,
          .mai-bento-card-small .mai-bento-description {
            margin-top: 10px;
          }

          @media (min-width: 768px) {
            .mai-bento-card-small .mai-bento-description {
              display: none;
            }
          }

          @media (min-width: 1200px) and (min-aspect-ratio: 21 / 10) {
            .mai-bento-grid {
              grid-template-columns: repeat(8, minmax(0, 1fr));
              grid-auto-rows: 336px;
              gap: 34px;
            }

            .mai-bento-card-large {
              grid-column: span 4 / span 4;
              grid-row: span 2 / span 2;
            }

            .mai-bento-card-medium {
              grid-column: span 4 / span 4;
              grid-row: span 1 / span 1;
            }

            .mai-bento-card-small {
              grid-column: span 2 / span 2;
              grid-row: span 1 / span 1;
            }

            .mai-bento-media {
              height: 68%;
              padding: 24px;
            }

            .mai-bento-card-small .mai-bento-media {
              padding: 18px;
            }

            .mai-bento-content {
              height: 32%;
            }

            .mai-bento-card-large .mai-bento-media {
              height: 66%;
            }

            .mai-bento-content {
              padding: 34px;
            }

            .mai-bento-card-large .mai-bento-content {
              height: 34%;
            }

            .mai-bento-card-small .mai-bento-content {
              padding: 28px;
            }

            .mai-bento-card-method .mai-bento-media img {
              transform: scale(1.12);
            }

            .mai-bento-card-pypots .mai-bento-media img {
              transform: scale(1.44);
            }

            .mai-bento-card-csai .mai-bento-media img {
              transform: scale(1.34);
            }

            .mai-bento-card-deari .mai-bento-media img {
              transform: scale(1.32);
            }

            .mai-bento-card-method:hover .mai-bento-media img {
              transform: scale(1.17);
            }

            .mai-bento-card-pypots:hover .mai-bento-media img {
              transform: scale(1.49);
            }

            .mai-bento-card-csai:hover .mai-bento-media img {
              transform: scale(1.4);
            }

            .mai-bento-card-deari:hover .mai-bento-media img {
              transform: scale(1.38);
            }

            .mai-bento-content h3 {
              font-size: 32px;
            }

            .mai-bento-card-small .mai-bento-content h3 {
              font-size: 26px;
            }

            .mai-bento-content p {
              font-size: 14px;
              line-height: 1.55;
            }

            .mai-bento-card-large .mai-bento-description p {
              -webkit-line-clamp: 5;
            }

            .mai-bento-card-medium .mai-bento-description p {
              -webkit-line-clamp: 1;
            }

            .mai-bento-card-medium .mai-bento-content,
            .mai-bento-card-small .mai-bento-content {
              padding: 26px 34px;
            }
          }
        `}
      </style>
      {projects.map((project, index) => {
        const isExternalLink = /^https?:\/\//.test(project.link);

        return (
          <motion.a
            key={project.id}
            href={project.link}
            target={isExternalLink ? '_blank' : undefined}
            rel={isExternalLink ? 'noreferrer' : undefined}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.992 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`mai-bento-card mai-bento-card-${project.size} mai-bento-card-${project.id} relative group block overflow-hidden rounded-3xl bg-lab-white dark:bg-void-gray border border-lab-gray dark:border-white/10 dark:hover:border-neon-cyan/50 transition-all duration-500 shadow-sm hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lab-accent dark:focus-visible:ring-neon-cyan focus-visible:ring-offset-4 focus-visible:ring-offset-lab-white dark:focus-visible:ring-offset-void-black
              ${project.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''}
              ${project.size === 'medium' ? 'md:col-span-2' : ''}
              ${project.size === 'small' ? 'md:col-span-1' : ''}
            `}
          >
            {/* Image Container */}
            <div className="mai-bento-media absolute top-0 left-0 w-full h-[65%] bg-white p-6 flex items-center justify-center overflow-hidden">
              {/* Use object-contain to show full diagrams. Adding blend mode for integration. */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Content Container - Bottom Part */}
            <div className="mai-bento-content absolute bottom-0 left-0 w-full h-[35%] bg-lab-white dark:bg-void-gray p-6 flex flex-col border-t border-lab-gray dark:border-white/5 z-10">
              <div className="flex justify-between items-start">
                <div className="min-w-0 pr-4">
                  <span className="text-xs font-mono text-lab-accent/85 dark:text-neon-cyan mb-1 block">
                      {project.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-serif text-lab-text dark:text-white leading-tight">
                      {project.title}
                  </h3>
                </div>

                <span
                  aria-hidden="true"
                  className="w-8 h-8 rounded-full border border-lab-text/10 dark:border-white/20 flex items-center justify-center group-hover:bg-lab-text group-hover:text-white dark:group-hover:bg-neon-cyan dark:group-hover:text-black transition-all duration-300"
                >
                  {isExternalLink ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  )}
                </span>
              </div>

              {/* Description only visible on large cards or hover on desktop could be an option, but keeping it clean here */}
              <div className="mai-bento-description hidden md:block">
                  <p className="text-xs text-lab-text/75 dark:text-void-text/72">
                      {project.description}
                  </p>
              </div>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
};

export default BentoGrid;
