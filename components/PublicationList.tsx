import React, { useState } from 'react';
import { Publication } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ExternalLink, FileText } from 'lucide-react';

interface PublicationListProps {
  publications: Publication[];
}

const PublicationList: React.FC<PublicationListProps> = ({ publications }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Scrollable Container with Custom Scrollbar */}
      <div className="flex flex-col h-[700px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-lab-accent/20 dark:scrollbar-thumb-neon-cyan/20 scrollbar-track-transparent">
        {publications.map((pub, idx) => (
          <motion.div
            key={pub.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="relative group border-b border-lab-text/10 dark:border-white/5 last:border-0 shrink-0"
            onMouseEnter={() => setHoveredId(pub.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Hover Background */}
            <div className="absolute inset-0 bg-lab-text/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mx-4 px-4 rounded-lg pointer-events-none"></div>

            <div className="py-6 px-4 md:px-4 flex flex-col md:flex-row gap-4 md:gap-8 relative z-10">
              {/* Year & Index */}
              <div className="flex md:flex-col items-baseline md:items-start gap-2 md:w-24 shrink-0">
                <span className="font-mono text-xs text-lab-accent dark:text-neon-cyan opacity-60">
                   {String(publications.length - idx).padStart(2, '0')}
                </span>
                <span className="font-mono text-sm font-bold text-lab-text dark:text-void-text">
                  {pub.year}
                </span>
              </div>

              {/* Main Info */}
              <div className="flex-1 space-y-2">
                <h3 className="text-lg md:text-xl font-serif leading-snug text-lab-text dark:text-void-text group-hover:text-lab-accent dark:group-hover:text-neon-cyan transition-colors duration-300">
                  {pub.title}
                </h3>
                <div className="text-sm text-lab-text/70 dark:text-void-text/70 font-sans leading-relaxed">
                  {pub.authors.map((author, i) => (
                    <span key={i} className={author.includes('Ibrahim') ? "font-semibold text-lab-text dark:text-white" : ""}>
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
              <div className="flex md:flex-col justify-end gap-2 shrink-0 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <button className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-lab-text hover:text-lab-accent dark:text-void-text dark:hover:text-neon-cyan transition-colors">
                    <FileText size={14} /> PDF
                 </button>
                 <a href={pub.link} className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-lab-text hover:text-lab-accent dark:text-void-text dark:hover:text-neon-cyan transition-colors">
                    <ExternalLink size={14} /> Link
                 </a>
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* End of list spacer/indicator */}
        <div className="py-8 text-center text-xs font-mono text-lab-text/30 dark:text-void-text/30">
            — END OF LIST —
        </div>
      </div>
    </div>
  );
};

export default PublicationList;