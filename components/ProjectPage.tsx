import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react';
import { ProjectPageData } from '../types';

interface ProjectPageProps {
  project: ProjectPageData;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ project }) => {
  const primaryResources = project.resources.filter((resource) => resource.primary);
  const secondaryResources = project.resources.filter((resource) => !resource.primary);

  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="min-h-screen bg-lab-white pt-24 text-lab-text dark:bg-void-black dark:text-void-text md:pt-28"
    >
      <section className="relative overflow-hidden border-b border-lab-text/10 dark:border-white/10">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-[36vw] top-[-8vh] h-[74vh] w-[86vw] rotate-45 bg-[#e4ebfe]/58 dark:bg-neon-cyan/6 md:-left-[12vw] md:top-0 md:h-[72vh] md:w-[52vw] md:bg-[#e4ebfe]/80 md:dark:bg-neon-cyan/8" />
          <div className="hidden md:block absolute right-[4vw] top-[18vh] h-[58vh] w-[14vw] rotate-[-28deg] bg-[#f9f3ec]/80 dark:bg-white/[0.035]" />
        </div>

        <div className="relative mx-auto grid max-w-[2360px] grid-cols-1 gap-12 px-6 pb-20 pt-12 md:px-12 md:pb-28 md:pt-16 xl:grid-cols-[0.88fr_1.12fr] xl:items-center xl:px-20 2xl:px-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <a
              href="#research"
              className="inline-flex items-center gap-2 rounded-full border border-lab-text/10 bg-white/75 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-lab-text/60 shadow-sm transition-colors hover:border-lab-accent hover:text-lab-accent dark:border-white/10 dark:bg-white/5 dark:text-void-text/70 dark:hover:border-neon-cyan dark:hover:text-neon-cyan"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Research
            </a>

            <div className="mt-12">
              <p className="font-mono text-sm uppercase tracking-[0.18em] text-lab-accent dark:text-neon-cyan">
                {project.category}
              </p>
              <h1 className="mt-5 font-serif text-[clamp(72px,12vw,190px)] leading-[0.82] text-[#c10201] dark:text-[#e11b1a]">
                {project.title}
              </h1>
              <h2 className="mt-8 max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
                {project.headline}
              </h2>
              <p className="mt-7 max-w-2xl text-base leading-8 text-lab-text/68 dark:text-void-text/68 md:text-lg">
                {project.summary}
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {primaryResources.map((resource) => (
                <a
                  key={resource.href}
                  href={resource.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-lab-text px-5 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 dark:bg-neon-cyan dark:text-void-black"
                >
                  {resource.label}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ))}
              {secondaryResources.slice(0, 2).map((resource) => (
                <a
                  key={resource.href}
                  href={resource.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-lab-accent/35 bg-white/70 px-5 py-3 text-sm font-medium text-lab-text transition-colors hover:border-lab-text hover:bg-lab-text hover:text-white dark:border-neon-cyan/30 dark:bg-white/5 dark:text-void-text dark:hover:border-neon-cyan dark:hover:bg-neon-cyan dark:hover:text-void-black"
                >
                  {resource.label}
                  <ExternalLink className="h-4 w-4" />
                </a>
              ))}
            </div>

            <dl className="mt-10 grid max-w-2xl grid-cols-3 border-y border-lab-text/10 py-5 text-xs uppercase tracking-[0.16em] dark:border-white/10">
              <div>
                <dt className="font-mono text-lab-text/38 dark:text-void-text/38">Focus</dt>
                <dd className="mt-2 font-mono text-lab-text/72 dark:text-void-text/72">{project.focus}</dd>
              </div>
              <div>
                <dt className="font-mono text-lab-text/38 dark:text-void-text/38">Mode</dt>
                <dd className="mt-2 font-mono text-lab-text/72 dark:text-void-text/72">{project.model}</dd>
              </div>
              <div>
                <dt className="font-mono text-lab-text/38 dark:text-void-text/38">{project.yearLabel || 'Year'}</dt>
                <dd className="mt-2 font-mono text-lab-text/72 dark:text-void-text/72">{project.year}</dd>
              </div>
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="min-w-0"
          >
            <div className="overflow-hidden rounded-[2rem] border border-lab-gray bg-white shadow-2xl shadow-slate-900/10 dark:border-white/10 dark:bg-void-gray/70 dark:shadow-black/30">
              <div className="flex items-center justify-between border-b border-lab-gray bg-lab-gray/35 px-6 py-4 dark:border-white/10 dark:bg-white/5">
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-lab-accent/60 dark:text-neon-cyan/75">
                  Project diagram
                </span>
                <span className="font-mono text-xs text-lab-text/45 dark:text-void-text/45">{project.title}</span>
              </div>
              <div className="flex min-h-[340px] items-center justify-center overflow-hidden bg-white p-8 md:min-h-[460px] md:p-12 2xl:min-h-[560px]">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className="max-h-[620px] w-full object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-[2360px] px-6 py-20 md:px-12 md:py-28 xl:px-20 2xl:px-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.45fr_1fr]">
          <div>
            <span className="font-mono text-sm uppercase tracking-[0.18em] text-lab-accent dark:text-neon-cyan">
              01 / Overview
            </span>
            <h2 className="mt-4 max-w-md font-serif text-4xl leading-tight md:text-6xl">
              What this project is built to solve.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {project.overview.map((item) => (
              <article key={item.label} className="border-t border-lab-text/15 pt-6 dark:border-white/15">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-lab-accent/70 dark:text-neon-cyan/75">
                  {item.label}
                </p>
                <h3 className="mt-5 font-serif text-2xl leading-tight text-lab-text dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-5 text-sm leading-7 text-lab-text/66 dark:text-void-text/66">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-20 border-y border-lab-text/12 dark:border-white/12">
          {project.ideas.map((item) => (
            <article
              key={item.title}
              className="grid grid-cols-1 gap-4 border-t border-lab-text/10 py-7 first:border-t-0 dark:border-white/10 md:grid-cols-[88px_minmax(220px,0.45fr)_1fr] md:items-start md:gap-8"
            >
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-lab-accent/65 dark:text-neon-cyan/70">
                {item.label}
              </span>
              <h3 className="font-serif text-2xl leading-tight text-lab-text dark:text-white md:text-3xl">
                {item.title}
              </h3>
              <p className="max-w-3xl text-sm leading-7 text-lab-text/64 dark:text-void-text/64 md:text-base md:leading-8">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-lab-gray/30 py-20 dark:bg-void-gray/20 md:py-28">
        <div className="mx-auto grid max-w-[2360px] grid-cols-1 gap-12 px-6 md:px-12 xl:grid-cols-[0.4fr_1fr] xl:px-20 2xl:px-28">
          <div>
            <span className="font-mono text-sm uppercase tracking-[0.18em] text-lab-accent dark:text-neon-cyan">
              02 / Resources
            </span>
            <h2 className="mt-4 max-w-md font-serif text-4xl leading-tight md:text-5xl">
              Follow the work.
            </h2>
            {project.note && (
              <p className="mt-6 max-w-md text-sm leading-7 text-lab-text/58 dark:text-void-text/58">
                {project.note}
              </p>
            )}
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="border-t border-lab-text/14 pt-5 dark:border-white/14">
                  <p className="font-serif text-4xl leading-none text-lab-text dark:text-white">{metric.value}</p>
                  <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-lab-accent/70 dark:text-neon-cyan/75">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-lab-gray bg-white dark:border-white/10 dark:bg-void-gray/50">
              {project.resources.map((resource) => (
                <a
                  key={resource.href}
                  href={resource.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid grid-cols-1 gap-3 border-t border-lab-gray px-6 py-6 first:border-t-0 transition-colors hover:bg-lab-gray/40 dark:border-white/10 dark:hover:bg-white/5 md:grid-cols-[180px_1fr_48px] md:items-center"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-lab-accent dark:text-neon-cyan">
                    {resource.label}
                  </span>
                  <span className="text-sm leading-7 text-lab-text/64 dark:text-void-text/64">
                    {resource.description}
                  </span>
                  <span className="hidden h-10 w-10 items-center justify-center rounded-full border border-lab-text/10 transition-colors group-hover:bg-lab-text group-hover:text-white dark:border-white/15 dark:group-hover:bg-neon-cyan dark:group-hover:text-void-black md:flex">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
};

export default ProjectPage;
