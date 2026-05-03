import React, { useEffect, useRef, useState } from 'react';
import { TeamMember } from '../types';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

interface TeamProps {
  members: TeamMember[];
}

const Team: React.FC<TeamProps> = ({ members }) => {
  const [scrollingBioId, setScrollingBioId] = useState<string | null>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleBioScroll = (memberId: string) => {
    setScrollingBioId(memberId);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setScrollingBioId((activeId) => (activeId === memberId ? null : activeId));
    }, 900);
  };

  return (
    <div className="mai-team-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-start">
      <style>
        {`
          .mai-team-bio {
            scrollbar-width: thin;
            scrollbar-color: transparent transparent;
          }

          .mai-team-bio::-webkit-scrollbar {
            width: 7px;
          }

          .mai-team-bio::-webkit-scrollbar-track {
            background: transparent;
          }

          .mai-team-bio::-webkit-scrollbar-thumb {
            background: transparent !important;
            border-radius: 999px;
          }

          .mai-team-bio-scrolling {
            scrollbar-color: rgba(10, 25, 47, 0.34) transparent;
          }

          .mai-team-bio-scrolling::-webkit-scrollbar-thumb {
            background: rgba(10, 25, 47, 0.34) !important;
          }

          .dark .mai-team-bio-scrolling {
            scrollbar-color: rgba(125, 221, 232, 0.34) transparent;
          }

          .dark .mai-team-bio-scrolling::-webkit-scrollbar-thumb {
            background: rgba(125, 221, 232, 0.34) !important;
          }

          @media (min-width: 1200px) and (min-aspect-ratio: 21 / 10) {
            .mai-team-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 36px;
              max-width: 2320px;
              margin-left: auto;
              margin-right: auto;
            }

            .mai-team-card {
              display: grid;
              grid-template-columns: 210px minmax(0, 1fr);
              grid-template-rows: auto auto 1fr auto;
              align-items: center;
              column-gap: 42px;
              min-height: 330px;
              padding: 38px 44px;
              text-align: left;
            }

            .mai-team-avatar-wrap {
              grid-column: 1;
              grid-row: 1 / span 4;
              justify-self: center;
              margin-bottom: 0;
            }

            .mai-team-avatar {
              width: 178px;
              height: 178px;
            }

            .mai-team-meta {
              grid-column: 2;
              grid-row: 1;
              margin-bottom: 14px;
            }

            .mai-team-card h3 {
              font-size: 31px;
              line-height: 1.05;
            }

            .mai-team-meta p {
              text-align: left;
            }

            .mai-team-bio {
              grid-column: 2;
              grid-row: 2 / span 2;
              height: auto;
              max-height: none;
              margin-bottom: 22px;
              overflow: visible;
              padding-right: 0;
              display: block;
              font-size: 15.5px;
              line-height: 1.55;
            }

            .mai-team-social {
              grid-column: 2;
              grid-row: 4;
              justify-content: flex-start;
              margin-top: 0;
            }
          }
        `}
      </style>
      {members.map((member, idx) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
          className="mai-team-card group relative flex flex-col items-center text-center p-8 rounded-2xl bg-white/50 dark:bg-void-gray/30 border border-transparent dark:border-white/5 hover:border-lab-accent/20 dark:hover:border-neon-cyan/30 transition-colors duration-500 backdrop-blur-sm h-full"
        >
          {/* Avatar Container */}
          <div className="mai-team-avatar-wrap relative mb-6 shrink-0">
            <div className="mai-team-avatar w-40 h-40 rounded-full overflow-hidden border-4 border-lab-white dark:border-void-gray shadow-lg group-hover:scale-105 transition-transform duration-500 z-10 relative">
              <img 
                src={member.image} 
                alt={member.name} 
                className={`w-full h-full ${member.imageFit === 'contain' ? 'object-contain bg-white' : 'object-cover'}`}
                style={{
                  ...(member.imagePosition ? { objectPosition: member.imagePosition } : {}),
                  ...(member.imageScale ? { transform: `scale(${member.imageScale})` } : {})
                }}
              />
            </div>
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-lab-accent/20 dark:bg-neon-cyan/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150 z-0"></div>
          </div>

          {/* Name & Role */}
          <div className="mai-team-meta shrink-0 mb-4">
            <h3 className="text-2xl font-serif text-lab-text dark:text-void-text mb-1">
                {member.name}
            </h3>
            <p className="text-lab-accent dark:text-neon-cyan font-bold text-sm tracking-wide uppercase mb-1">
                {member.role}
            </p>
            {member.roleDetail && (
                <p className="text-xs font-mono text-lab-text/60 dark:text-void-text/60">
                {member.roleDetail}
                </p>
            )}
          </div>

          {/* Bio - Fixed height with scroll */}
          <div
            className={`mai-team-bio w-full h-40 mb-6 overflow-y-auto pr-2 text-sm font-sans leading-relaxed text-lab-text/80 dark:text-void-text/80 text-left ${
              scrollingBioId === member.id ? 'mai-team-bio-scrolling' : ''
            }`}
            onScroll={() => handleBioScroll(member.id)}
          >
            {member.bio}
          </div>

          {/* Socials */}
          <div className="mai-team-social mt-auto flex gap-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300 shrink-0">
            {member.socials?.email && (
                <a
                  href={`mailto:${member.socials.email}`}
                  aria-label={`Email ${member.name}`}
                  title={`Email ${member.name}`}
                  className="text-lab-text hover:text-lab-accent dark:text-void-text dark:hover:text-neon-cyan transition-colors"
                >
                    <Mail size={18} />
                </a>
            )}
            {member.socials?.github && (
                <a
                  href={member.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${member.name} on GitHub`}
                  title={`${member.name} on GitHub`}
                  className="text-lab-text hover:text-lab-accent dark:text-void-text dark:hover:text-neon-cyan transition-colors"
                >
                    <Github size={18} />
                </a>
            )}
            {member.socials?.linkedin && (
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  title={`${member.name} on LinkedIn`}
                  className="text-lab-text hover:text-lab-accent dark:text-void-text dark:hover:text-neon-cyan transition-colors"
                >
                    <Linkedin size={18} />
                </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Team;
