import React from 'react';
import { TeamMember } from '../types';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

interface TeamProps {
  members: TeamMember[];
}

const Team: React.FC<TeamProps> = ({ members }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-start">
      {members.map((member, idx) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
          className="group relative flex flex-col items-center text-center p-8 rounded-2xl bg-white/50 dark:bg-void-gray/30 border border-transparent dark:border-white/5 hover:border-lab-accent/20 dark:hover:border-neon-cyan/30 transition-colors duration-500 backdrop-blur-sm h-full"
        >
          {/* Avatar Container */}
          <div className="relative mb-6 shrink-0">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-lab-white dark:border-void-gray shadow-lg group-hover:scale-105 transition-transform duration-500 z-10 relative">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-lab-accent/20 dark:bg-neon-cyan/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150 z-0"></div>
          </div>

          {/* Name & Role */}
          <div className="shrink-0 mb-4">
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
          <div className="w-full h-40 mb-6 overflow-y-auto pr-2 text-sm font-sans leading-relaxed text-lab-text/80 dark:text-void-text/80 text-left scrollbar-thin scrollbar-thumb-lab-accent/20 dark:scrollbar-thumb-neon-cyan/20 scrollbar-track-transparent">
            {member.bio}
          </div>

          {/* Socials */}
          <div className="mt-auto flex gap-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300 shrink-0">
            {member.socials?.email && (
                <a href={`mailto:${member.socials.email}`} className="text-lab-text hover:text-lab-accent dark:text-void-text dark:hover:text-neon-cyan transition-colors">
                    <Mail size={18} />
                </a>
            )}
            {member.socials?.github && (
                <a href={member.socials.github} target="_blank" rel="noreferrer" className="text-lab-text hover:text-lab-accent dark:text-void-text dark:hover:text-neon-cyan transition-colors">
                    <Github size={18} />
                </a>
            )}
            {member.socials?.linkedin && (
                <a href={member.socials.linkedin} target="_blank" rel="noreferrer" className="text-lab-text hover:text-lab-accent dark:text-void-text dark:hover:text-neon-cyan transition-colors">
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
