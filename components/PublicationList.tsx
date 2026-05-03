import React, { useEffect, useRef, useState } from 'react';
import { Publication } from '../types';
import { motion } from 'framer-motion';
import { ExternalLink, FileText } from 'lucide-react';

interface PublicationListProps {
  publications: Publication[];
}

const PublicationList: React.FC<PublicationListProps> = ({ publications }) => {
  const [isListScrolling, setIsListScrolling] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleListScroll = () => {
    setIsListScrolling(true);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setIsListScrolling(false);
    }, 900);
  };

  return (
    <div className="mai-publication-list w-full max-w-5xl mx-auto">
      <style>
        {`
          .mai-publication-scroll {
            scrollbar-width: thin;
            scrollbar-color: transparent transparent;
          }

          .mai-publication-scroll::-webkit-scrollbar {
            width: 7px;
          }

          .mai-publication-scroll::-webkit-scrollbar-track {
            background: transparent;
          }

          .mai-publication-scroll::-webkit-scrollbar-thumb {
            background: transparent !important;
            border-radius: 999px;
          }

          .mai-publication-scroll-scrolling {
            scrollbar-color: rgba(10, 25, 47, 0.34) transparent;
          }

          .mai-publication-scroll-scrolling::-webkit-scrollbar-thumb {
            background: rgba(10, 25, 47, 0.34) !important;
          }

          .dark .mai-publication-scroll-scrolling {
            scrollbar-color: rgba(125, 221, 232, 0.34) transparent;
          }

          .dark .mai-publication-scroll-scrolling::-webkit-scrollbar-thumb {
            background: rgba(125, 221, 232, 0.34) !important;
          }

          @media (min-width: 1200px) and (min-aspect-ratio: 21 / 10) {
            .mai-publication-list {
              max-width: 1880px;
            }

            .mai-publication-scroll {
              height: 820px;
              padding-right: 24px;
            }

            .mai-publication-row {
              display: grid;
              grid-template-columns: 150px minmax(0, 1fr) 120px;
              align-items: start;
              gap: 64px;
              padding: 34px 22px;
            }

            .mai-publication-year {
              width: auto;
              gap: 8px;
            }

            .mai-publication-title {
              font-size: 27px;
              line-height: 1.22;
              max-width: 1240px;
            }

            .mai-publication-authors {
              font-size: 16px;
              line-height: 1.65;
              max-width: 1320px;
            }

            .mai-publication-actions {
              opacity: 1;
              align-items: flex-end;
              padding-top: 4px;
            }
          }
        `}
      </style>
      {/* Scrollable Container with Custom Scrollbar */}
      <div
        className={`mai-publication-scroll flex flex-col h-[700px] overflow-y-auto pr-4 ${
          isListScrolling ? 'mai-publication-scroll-scrolling' : ''
        }`}
        onScroll={handleListScroll}
      >
        {publications.map((pub, idx) => {
          const hasLink = Boolean(pub.link && pub.link !== '#');
          const isPdfLink = hasLink && /\.pdf($|\?)/i.test(pub.link);
          const pdfHref = pub.pdf || (isPdfLink ? pub.link : '');
          const showPublisherLink = hasLink && pub.link !== pdfHref;

          return (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="relative group border-b border-lab-text/10 dark:border-white/5 last:border-0 shrink-0"
            >
              {/* Hover Background */}
              <div className="absolute inset-0 bg-lab-text/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mx-4 px-4 rounded-lg pointer-events-none"></div>

              <div className="mai-publication-row py-6 px-4 md:px-4 flex flex-col md:flex-row gap-4 md:gap-8 relative z-10">
                {/* Year & Index */}
                <div className="mai-publication-year flex md:flex-col items-baseline md:items-start gap-2 md:w-24 shrink-0">
                  <span className="font-mono text-xs text-lab-accent dark:text-neon-cyan opacity-60">
                     {String(publications.length - idx).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-sm font-bold text-lab-text dark:text-void-text">
                    {pub.year}
                  </span>
                </div>

                {/* Main Info */}
                <div className="flex-1 space-y-2">
                  <h3 className="mai-publication-title text-lg md:text-xl font-serif leading-snug text-lab-text dark:text-void-text group-hover:text-lab-accent dark:group-hover:text-neon-cyan transition-colors duration-300">
                    {pub.title}
                  </h3>
                  <div className="mai-publication-authors text-sm text-lab-text/70 dark:text-void-text/70 font-sans leading-relaxed">
                    {pub.authors.map((author, i) => (
                      <span key={i}>
                        {author}{i < pub.authors.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-lab-text/50 dark:text-void-text/50 pt-1">
                    <span className="italic px-2 py-0.5 border border-lab-text/10 dark:border-white/10 rounded-full">
                      {pub.journal}
                    </span>
                    {pub.doi && <span>DOI: {pub.doi}</span>}
                  </div>
                </div>

                {/* Actions */}
                <div className="mai-publication-actions flex md:flex-col justify-end gap-2 shrink-0 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {pdfHref && (
                    <a href={pdfHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-lab-text hover:text-lab-accent dark:text-void-text dark:hover:text-neon-cyan transition-colors">
                      <FileText size={14} /> PDF
                    </a>
                  )}
                  {showPublisherLink && (
                    <a href={pub.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-lab-text hover:text-lab-accent dark:text-void-text dark:hover:text-neon-cyan transition-colors">
                      <ExternalLink size={14} /> Link
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
        
        {/* End of list spacer/indicator */}
        <div className="py-8 text-center text-xs font-mono text-lab-text/30 dark:text-void-text/30">
            — END OF LIST —
        </div>
      </div>
    </div>
  );
};

export default PublicationList;
