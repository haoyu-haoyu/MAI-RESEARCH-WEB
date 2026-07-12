import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Clipboard,
  Github,
  Mail,
  Newspaper,
  Presentation,
} from 'lucide-react';
import {
  METHOD_ATTENTION_MODES,
  METHOD_DEMO_PATIENTS,
  METHOD_DEMO_TOKENS,
  canAttendToken,
  getAttentionPairStats,
  getAttentionReason,
  getAttentionSummary,
} from './methodDemoLogic.js';
import { Publication } from '../types';

const overview = [
  {
    label: 'Problem',
    title: 'Irregular patient timelines challenge generic sequence models.',
    text: 'EHR trajectories vary in length, temporal resolution, and clinical context.',
  },
  {
    label: 'Approach',
    title: 'Patient-aware attention models clinical trajectories.',
    text: 'METHOD combines patient isolation, adaptive windows, and dynamic skip paths.',
  },
  {
    label: 'Outcome',
    title: 'Clinically aligned sequence learning for health outcome discovery.',
    text: 'The model is designed to preserve temporal structure and medical concept relationships.',
  },
];

const innovations = [
  {
    title: 'Patient-aware attention',
    text: 'Keeps patient information isolated while preserving efficient batch computation for clinical sequence modeling.',
  },
  {
    title: 'Adaptive temporal context',
    text: 'Uses sliding-window attention to capture local and longer-range clinical dependencies across patient timelines.',
  },
  {
    title: 'Dynamic skip architecture',
    text: 'Adopts U-Net inspired connections to support long sequence processing without losing clinically meaningful structure.',
  },
  {
    title: 'ETHOS-based tokenization',
    text: 'Builds on ETHOS decile tokenization while treating variable-specific representation and continuous-value alignment as open design challenges.',
  },
];

const results = [
  {
    value: '0.832 ± 0.0003',
    label: 'Macro AUC stability',
    text: 'Inference-length changes barely move the reported Macro AUC.',
  },
  {
    value: '32,768',
    label: 'Training context',
    text: 'Long-sequence training is the recipe behind stable trajectory modeling.',
  },
  {
    value: 'SOFA > 7',
    label: 'High-severity cases',
    text: 'The paper reports the clearest gains on high-severity patient trajectories.',
  },
];

const talks = [
  {
    title: "Patient Trajectories with AI: from Generation to Insight, the King's Festival on AI",
    date: 'May 2025',
    href: 'https://mai-research.github.io/talks/aifestival.pdf',
  },
  {
    title: 'Showcasing the Architectural Components of METHOD at the Annual CogStack Symposium',
    date: 'November 2024',
    href: 'https://mai-research.github.io/talks/cogstack.pdf',
  },
  {
    title: 'Our showcase talk at the Department of Science, Innovation and Technology',
    date: 'October 2024',
    href: 'https://mai-research.github.io/talks/dsit.pdf',
  },
];

const methodSectionLinks = [
  { label: '01', target: 'method-overview', title: 'Overview' },
  { label: '02', target: 'method-evidence', title: 'Evidence' },
  { label: '03', target: 'method-demo', title: 'Interactive demo' },
  { label: 'Bib', target: 'method-citation', title: 'Citation' },
];

const skipRows = [
  {
    left: 'Encoder 1',
    lambdaLabel: 'λ1',
    lambdaValue: '0.35',
    right: 'Decoder 3',
    widthClass: 'w-8',
    height: 2,
  },
  {
    left: 'Encoder 2',
    lambdaLabel: 'λ2',
    lambdaValue: '0.60',
    right: 'Decoder 2',
    widthClass: 'w-12',
    height: 3,
  },
  {
    left: 'Bottleneck',
    lambdaLabel: 'λ3',
    lambdaValue: '0.85',
    right: 'Decoder 1',
    widthClass: 'w-16',
    height: 4,
  },
];

const citation = `@misc{qian2025methodmodularefficienttransformer,
  title={METHOD: Modular Efficient Transformer for Health Outcome Discovery},
  author={Qian, Linglong and Ibrahim, Zina},
  year={2025},
  eprint={2505.17054},
  archivePrefix={arXiv},
  primaryClass={cs.CL},
  doi={10.48550/arXiv.2505.17054},
  url={https://arxiv.org/abs/2505.17054}
}`;

type SelectedAttentionPair = {
  queryId: string;
  keyId: string;
} | null;

interface MethodPageProps {
  publications: Publication[];
}

const MethodPage: React.FC<MethodPageProps> = ({ publications }) => {
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [attentionMode, setAttentionMode] = useState('patient');
  const [windowSize, setWindowSize] = useState(2);
  const [selectedPair, setSelectedPair] = useState<SelectedAttentionPair>(null);
  const [activeSection, setActiveSection] = useState(methodSectionLinks[0].target);
  const [activeSkipIndex, setActiveSkipIndex] = useState<number | null>(null);
  const methodPublications = publications.filter((publication) =>
    publication.title.toLowerCase().includes('modular efficient transformer for health outcome discovery')
  );
  const attentionStats = getAttentionPairStats(attentionMode, windowSize);
  const activeSkip = activeSkipIndex === null ? null : skipRows[activeSkipIndex];
  const selectedQuery = selectedPair
    ? METHOD_DEMO_TOKENS.find((token) => token.id === selectedPair.queryId)
    : undefined;
  const selectedKey = selectedPair
    ? METHOD_DEMO_TOKENS.find((token) => token.id === selectedPair.keyId)
    : undefined;
  const selectedReason = selectedPair && selectedQuery && selectedKey
    ? getAttentionReason(selectedQuery, selectedKey, attentionMode, windowSize)
    : null;
  const selectedLabel = selectedQuery && selectedKey
    ? `${selectedQuery.patient} / ${selectedQuery.label} -> ${selectedKey.patient} / ${selectedKey.label}`
    : 'Choose a query-key cell';
  const isWindowMode = attentionMode === 'window';
  const maskControlLabel = isWindowMode ? 'Window size' : 'Mask rule';
  const maskControlValue = isWindowMode
    ? `${windowSize} steps`
    : attentionMode === 'standard'
      ? 'Fixed causal mask'
      : 'Fixed patient-aware mask';

  const handleWindowSizeChange = (value: number) => {
    setWindowSize(value);
    setSelectedPair(null);
  };

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      const anchorOffset = 220;
      let nextSection = methodSectionLinks[0].target;

      methodSectionLinks.forEach((link) => {
        const section = document.getElementById(link.target);
        if (!section) {
          return;
        }

        if (section.getBoundingClientRect().top <= anchorOffset) {
          nextSection = link.target;
        }
      });

      const citationSection = document.getElementById('method-citation');
      if (citationSection) {
        const citationRect = citationSection.getBoundingClientRect();
        if (citationRect.top < window.innerHeight * 0.75 && citationRect.bottom > 0) {
          nextSection = 'method-citation';
        }
      }

      setActiveSection(nextSection);
    };

    const handleViewportChange = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', handleViewportChange, { passive: true });
    window.addEventListener('resize', handleViewportChange);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleViewportChange);
      window.removeEventListener('resize', handleViewportChange);
    };
  }, []);

  const copyCitation = async () => {
    try {
      await navigator.clipboard.writeText(citation);
      setCopiedCitation(true);
      window.setTimeout(() => setCopiedCitation(false), 1600);
    } catch {
      setCopiedCitation(false);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="min-h-screen bg-lab-white text-lab-text dark:bg-void-black dark:text-void-text"
    >
      <nav
        aria-label="METHOD page sections"
        className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2 rounded-full border border-lab-gray bg-lab-white/90 px-3 py-4 shadow-lg shadow-slate-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-void-black/82 2xl:flex"
      >
        {methodSectionLinks.map(({ label, target, title }) => {
          const isActive = activeSection === target;

          return (
          <button
            key={target}
            type="button"
            aria-label={`Jump to ${title}`}
            aria-current={isActive ? 'location' : undefined}
            data-active-section={isActive ? 'true' : 'false'}
            title={title}
            onClick={() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className={`rounded-full px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
              isActive
                ? 'bg-lab-text text-white shadow-sm dark:bg-neon-cyan dark:text-void-black'
                : 'text-lab-text/52 hover:bg-lab-text hover:text-white dark:text-void-text/62 dark:hover:bg-neon-cyan dark:hover:text-void-black'
            }`}
          >
            {label}
          </button>
          );
        })}
      </nav>

      <section className="relative overflow-hidden border-b border-lab-gray dark:border-white/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[-14%] top-[-24%] h-[72vh] w-[58vw] rotate-[-42deg] bg-[#e4ebfe] dark:bg-[#22324d] opacity-80 dark:opacity-35" />
          <div className="absolute right-[-10%] top-[8%] h-[70vh] w-[42vw] rotate-[22deg] bg-[#f9f3ec] dark:bg-white/5 opacity-90" />
        </div>

        <div className="relative mx-auto grid min-h-[88vh] max-w-[2360px] grid-cols-1 gap-12 px-6 pb-20 pt-32 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:px-12 md:pt-40 xl:px-20 2xl:px-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="flex min-w-0 flex-col justify-center"
          >
            <a
              href="#research"
              className="mb-10 inline-flex w-fit items-center gap-2 rounded-full border border-lab-accent/18 bg-white/70 px-4 py-2 text-xs font-mono uppercase tracking-[0.18em] text-lab-accent/80 transition-colors hover:border-lab-accent hover:bg-lab-text hover:text-white dark:border-neon-cyan/20 dark:bg-white/5 dark:text-neon-cyan/80 dark:hover:border-neon-cyan dark:hover:bg-neon-cyan dark:hover:text-void-black"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to research
            </a>

            <h1 className="font-serif text-[4.6rem] font-semibold leading-[0.82] tracking-normal text-[#c10201] sm:text-[5.8rem] md:text-[6.6rem] xl:text-[7.6rem] 2xl:text-[10rem]">
              METHOD
            </h1>
            <p className="mt-8 max-w-3xl font-serif text-3xl leading-tight text-lab-text dark:text-void-text md:text-5xl 2xl:text-6xl">
              Modular Efficient Transformer for Health Outcome Discovery
            </p>
            <p className="mt-8 max-w-2xl text-base leading-8 text-lab-text/70 dark:text-void-text/72 md:text-lg 2xl:text-xl">
              A transformer architecture for patient trajectory modeling, designed around EHR sequence structure, patient isolation, and clinically meaningful temporal dependencies.
            </p>

            <div className="mt-10 flex flex-wrap gap-3" aria-label="METHOD primary resources">
              <a
                href="https://github.com/LinglongQian/METHOD"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-lab-text px-5 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 dark:bg-neon-cyan dark:text-void-black"
              >
                <Github className="h-4 w-4" />
                GitHub repository
              </a>
              <a
                href="https://arxiv.org/abs/2505.17054"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-lab-accent/35 bg-white/70 px-5 py-3 text-sm font-medium text-lab-text transition-colors hover:border-lab-text hover:bg-lab-text hover:text-white dark:border-neon-cyan/30 dark:bg-white/5 dark:text-void-text dark:hover:border-neon-cyan dark:hover:bg-neon-cyan dark:hover:text-void-black"
              >
                arXiv preprint
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <dl className="mt-10 grid max-w-2xl grid-cols-3 border-y border-lab-text/10 py-5 text-xs uppercase tracking-[0.16em] dark:border-white/10">
              <div>
                <dt className="font-mono text-lab-text/38 dark:text-void-text/38">Focus</dt>
                <dd className="mt-2 font-mono text-lab-text/72 dark:text-void-text/72">EHR trajectories</dd>
              </div>
              <div>
                <dt className="font-mono text-lab-text/38 dark:text-void-text/38">Model</dt>
                <dd className="mt-2 font-mono text-lab-text/72 dark:text-void-text/72">Transformer</dd>
              </div>
              <div>
                <dt className="font-mono text-lab-text/38 dark:text-void-text/38">Year</dt>
                <dd className="mt-2 font-mono text-lab-text/72 dark:text-void-text/72">2025</dd>
              </div>
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.12 }}
            className="flex min-w-0 items-center"
          >
            <div className="w-full overflow-hidden rounded-[2rem] border border-lab-gray bg-white shadow-2xl shadow-slate-900/10 dark:border-white/10 dark:bg-void-gray/70 dark:shadow-black/30">
              <div className="flex items-center justify-between border-b border-lab-gray bg-lab-gray/35 px-6 py-4 dark:border-white/10 dark:bg-white/5">
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-lab-accent/60 dark:text-neon-cyan/75">
                  Architecture
                </span>
                <span className="font-mono text-xs text-lab-text/45 dark:text-void-text/45">MIMIC-IV trajectories</span>
              </div>
              <div className="flex min-h-[360px] items-center justify-center overflow-hidden p-4 md:min-h-[440px] md:p-6 2xl:min-h-[540px] 2xl:p-8">
                <img
                  src="images/method-architecture.png"
                  alt="METHOD architecture diagram"
                  className="max-h-[620px] w-full object-contain"
                />
              </div>
              <div className="grid grid-cols-1 border-t border-lab-gray bg-lab-gray/25 dark:border-white/10 dark:bg-white/[0.03] sm:grid-cols-3">
                {['Patient-aware attention', 'Adaptive windowing', 'Dynamic skip paths'].map((item) => (
                  <div key={item} className="border-lab-gray px-5 py-4 first:border-0 sm:border-l dark:border-white/10">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-lab-text/55 dark:text-void-text/55">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="method-overview" className="mx-auto max-w-[2360px] scroll-mt-28 px-6 py-20 md:px-12 md:py-28 xl:px-20 2xl:px-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.45fr_1fr]">
          <div>
            <span className="font-mono text-sm uppercase tracking-[0.18em] text-lab-accent dark:text-neon-cyan">01 / Overview</span>
            <h2 className="mt-4 max-w-md font-serif text-4xl leading-tight md:text-6xl">Built for clinical sequence modelling.</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {overview.map((item) => (
              <article key={item.label} className="border-t border-lab-text/15 pt-6 dark:border-white/15">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-lab-accent/70 dark:text-neon-cyan/75">{item.label}</p>
                <h3 className="mt-5 font-serif text-2xl leading-tight text-lab-text dark:text-white">{item.title}</h3>
                <p className="mt-5 text-sm leading-7 text-lab-text/66 dark:text-void-text/66">{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-20 border-y border-lab-text/12 dark:border-white/12">
          {innovations.map((item, index) => (
            <article
              key={item.title}
              className="grid grid-cols-1 gap-4 border-t border-lab-text/10 py-7 first:border-t-0 dark:border-white/10 md:grid-cols-[88px_minmax(220px,0.45fr)_1fr] md:items-start md:gap-8"
            >
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-lab-accent/65 dark:text-neon-cyan/70">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-lab-text/38 dark:text-void-text/38">
                  {index === 3 ? 'Design note' : 'Module'}
                </p>
                <h3 className="font-serif text-2xl leading-tight text-lab-text dark:text-white md:text-3xl">{item.title}</h3>
              </div>
              <p className="max-w-3xl text-sm leading-7 text-lab-text/64 dark:text-void-text/64 md:pt-8 md:text-base md:leading-8">{item.text}</p>
            </article>
          ))}
        </div>

        <div id="method-evidence" className="mt-20 grid scroll-mt-28 grid-cols-1 gap-10 border-y border-lab-text/12 py-12 dark:border-white/12 lg:grid-cols-[0.36fr_1fr] lg:items-start">
          <div>
            <span className="font-mono text-sm uppercase tracking-[0.18em] text-lab-accent dark:text-neon-cyan">
              02 / Evidence
            </span>
            <h2 className="mt-4 max-w-sm font-serif text-4xl leading-tight md:text-5xl">Results at a glance.</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {results.map((item) => (
              <article key={item.label} className="border-t border-lab-text/14 pt-5 dark:border-white/14">
                <p className="font-serif text-4xl leading-none text-lab-text dark:text-white">{item.value}</p>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-lab-accent/70 dark:text-neon-cyan/75">{item.label}</p>
                <p className="mt-4 text-sm leading-7 text-lab-text/62 dark:text-void-text/62">{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div id="method-demo" className="mt-20 hidden scroll-mt-28 border-y border-lab-text/12 py-16 dark:border-white/12 md:block md:py-20">
          <div className="grid grid-cols-1 gap-12 xl:grid-cols-[0.42fr_1fr] xl:gap-16">
            <div>
              <span className="font-mono text-sm uppercase tracking-[0.18em] text-lab-accent dark:text-neon-cyan">
                03 / Demo
              </span>
              <h2 className="mt-4 max-w-lg font-serif text-4xl leading-tight md:text-6xl">
                How METHOD sees patient timelines.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-lab-text/68 dark:text-void-text/68">
                A toy visualization of patient-aware attention. It shows causal attention, patient isolation, static context visibility, and local temporal windows in one small batch.
              </p>

              <div className="mt-8 rounded-2xl border border-lab-gray bg-white p-2 dark:border-white/10 dark:bg-void-gray/45">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {METHOD_ATTENTION_MODES.map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      data-attention-mode={mode.id}
                      aria-pressed={attentionMode === mode.id}
                      onClick={() => {
                        setAttentionMode(mode.id);
                        setSelectedPair(null);
                      }}
                      className={`rounded-xl px-4 py-3 text-left font-mono text-xs uppercase tracking-[0.14em] transition-colors ${
                        attentionMode === mode.id
                          ? 'bg-lab-text text-white dark:bg-neon-cyan dark:text-void-black'
                          : 'text-lab-text/58 hover:bg-lab-gray dark:text-void-text/58 dark:hover:bg-white/8'
                      }`}
                    >
                      {mode.shortLabel}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-lab-gray bg-white p-5 dark:border-white/10 dark:bg-void-gray/45">
                <div className="flex items-center justify-between gap-4">
                  <label
                    htmlFor={isWindowMode ? 'method-window-size' : undefined}
                    className="font-mono text-xs uppercase tracking-[0.16em] text-lab-text/55 dark:text-void-text/55"
                  >
                    {maskControlLabel}
                  </label>
                  <span className="text-right font-mono text-xs text-lab-accent dark:text-neon-cyan">{maskControlValue}</span>
                </div>
                {isWindowMode ? (
                  <input
                    id="method-window-size"
                    type="range"
                    min="1"
                    max="5"
                    value={windowSize}
                    onInput={(event) => handleWindowSizeChange(Number(event.currentTarget.value))}
                    onChange={(event) => handleWindowSizeChange(Number(event.currentTarget.value))}
                    className="mt-5 h-2 w-full accent-lab-accent dark:accent-neon-cyan"
                  />
                ) : (
                  <div className="mt-5 h-2 rounded-full bg-lab-gray dark:bg-white/10" aria-hidden="true" />
                )}
                <p className="mt-5 text-sm leading-7 text-lab-text/64 dark:text-void-text/64">
                  {getAttentionSummary(attentionMode, windowSize)}
                </p>
                {!isWindowMode && (
                  <p className="mt-3 font-mono text-[10px] uppercase leading-5 tracking-[0.14em] text-lab-text/38 dark:text-void-text/40">
                    This mask has no tunable window. Switch to Window to adjust temporal context.
                  </p>
                )}
                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-lab-gray pt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-lab-text/48 dark:border-white/10 dark:text-void-text/48">
                  <div>
                    <p
                      className="text-lab-text/35 dark:text-void-text/35"
                      title="Ordered query-key pairs permitted by the current attention mask, including self-attention."
                    >
                      Active pairs
                    </p>
                    <p className="mt-1 text-sm text-lab-accent dark:text-neon-cyan">
                      {attentionStats.active} / {attentionStats.total}
                    </p>
                  </div>
                  <div>
                    <p className="text-lab-text/35 dark:text-void-text/35">Static pairs</p>
                    <p className="mt-1 text-sm text-lab-accent dark:text-neon-cyan">
                      {attentionStats.staticContext}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-5 text-lab-text/42 dark:text-void-text/42">
                  Active pairs are ordered query-key pairs allowed by the current mask, including self-attention.
                </p>
              </div>

              <p className="mt-5 max-w-lg font-mono text-[11px] uppercase leading-6 tracking-[0.16em] text-lab-text/38 dark:text-void-text/38">
                Illustrative demo only. It does not run trained METHOD weights or make clinical predictions.
              </p>
            </div>

            <div className="grid min-w-0 grid-cols-1 gap-5 2xl:grid-cols-[0.92fr_1.08fr]">
              <div className="rounded-3xl border border-lab-gray bg-white p-6 dark:border-white/10 dark:bg-void-gray/45">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-serif text-2xl">Toy patient timeline</h3>
                  <span className="font-mono text-xs uppercase tracking-[0.16em] text-lab-text/42 dark:text-void-text/42">Batch order</span>
                </div>
                <div className="mt-7 space-y-7">
                  {METHOD_DEMO_PATIENTS.map((patient) => (
                    <div key={patient} className="grid grid-cols-[72px_minmax(0,1fr)] items-center gap-4">
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-lab-accent dark:text-neon-cyan">
                          Patient {patient}
                        </p>
                      </div>
                      <div className="grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-3">
                        {METHOD_DEMO_TOKENS.filter((token) => token.patient === patient).map((token) => (
                          <div
                            key={token.id}
                            className={`min-w-0 rounded-2xl border px-4 py-3 ${
                              token.staticContext
                                ? 'border-[#bb7a1d]/45 bg-[#fff6df] text-lab-text ring-1 ring-[#bb7a1d]/20 dark:border-[#d8aa4a]/45 dark:bg-[#3d321d]/60 dark:text-void-text dark:ring-[#d8aa4a]/20'
                                : token.type === 'outcome'
                                ? 'border-lab-text bg-lab-text text-white dark:border-neon-cyan dark:bg-neon-cyan dark:text-void-black'
                                : token.type === 'measurement'
                                  ? 'border-[#d4def8] bg-[#e4ebfe]/72 text-lab-text dark:border-[#314768] dark:bg-[#22324d] dark:text-void-text'
                                  : token.type === 'treatment'
                                    ? 'border-[#f0e4d9] bg-[#f9f3ec]/88 text-lab-text dark:border-white/10 dark:bg-white/8 dark:text-void-text'
                                    : 'border-lab-gray bg-lab-gray/45 text-lab-text dark:border-white/10 dark:bg-white/5 dark:text-void-text'
                            }`}
                          >
                            <p className="font-mono text-[10px] uppercase tracking-[0.14em] opacity-60">{token.time}</p>
                            <p className="mt-2 text-sm font-medium">{token.label}</p>
                            {token.staticContext && (
                              <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-lab-accent/70 dark:text-neon-cyan/70">
                                Static context
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl border border-lab-gray bg-lab-gray/30 p-5 dark:border-white/10 dark:bg-black/18">
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-lab-text/45 dark:text-void-text/45">
                    U-Net style dynamic skip
                  </p>
                  <div className="mt-5 grid grid-cols-[1fr_auto_1fr] gap-x-4 gap-y-3">
                    {skipRows.map((row, index) => {
                      const isActive = activeSkipIndex === index;

                      return (
                      <React.Fragment key={row.left}>
                        <div
                          className={`rounded-xl border px-3 py-3 text-center transition-colors ${
                            isActive
                              ? 'border-lab-accent bg-[#e4ebfe] dark:border-neon-cyan dark:bg-neon-cyan/12'
                              : 'border-lab-gray bg-white dark:border-white/10 dark:bg-void-black/45'
                          }`}
                        >
                          <p className={`font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                            isActive ? 'text-lab-accent dark:text-neon-cyan' : 'text-lab-text/58 dark:text-void-text/58'
                          }`}>
                            {row.left}
                          </p>
                        </div>
                        <button
                          type="button"
                          onMouseEnter={() => setActiveSkipIndex(index)}
                          onMouseLeave={() => setActiveSkipIndex(null)}
                          onFocus={() => setActiveSkipIndex(index)}
                          onBlur={() => setActiveSkipIndex(null)}
                          className="flex items-center gap-2 rounded-full px-1 py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-lab-accent/45 dark:focus:ring-neon-cyan/60"
                          aria-label={`${row.lambdaLabel} skip weight ${row.lambdaValue}`}
                          title={`${row.lambdaLabel} = ${row.lambdaValue}`}
                        >
                          <span
                            className={`rounded-full transition-colors ${row.widthClass} ${
                              isActive ? 'bg-lab-accent dark:bg-neon-cyan' : 'bg-lab-accent/45 dark:bg-neon-cyan/45'
                            }`}
                            style={{ height: `${row.height}px` }}
                          />
                          <span className={`font-mono text-[10px] uppercase tracking-[0.1em] transition-colors ${
                            isActive ? 'text-lab-accent dark:text-neon-cyan' : 'text-lab-accent/62 dark:text-neon-cyan/65'
                          }`}>
                            {row.lambdaLabel} = {row.lambdaValue}
                          </span>
                          <span
                            className={`rounded-full transition-colors ${row.widthClass} ${
                              isActive ? 'bg-lab-accent dark:bg-neon-cyan' : 'bg-lab-accent/45 dark:bg-neon-cyan/45'
                            }`}
                            style={{ height: `${row.height}px` }}
                          />
                        </button>
                        <div
                          className={`rounded-xl border px-3 py-3 text-center transition-colors ${
                            isActive
                              ? 'border-lab-accent bg-[#e4ebfe] dark:border-neon-cyan dark:bg-neon-cyan/12'
                              : 'border-lab-gray bg-white dark:border-white/10 dark:bg-void-black/45'
                          }`}
                        >
                          <p className={`font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                            isActive ? 'text-lab-accent dark:text-neon-cyan' : 'text-lab-text/58 dark:text-void-text/58'
                          }`}>
                            {row.right}
                          </p>
                        </div>
                      </React.Fragment>
                    );
                    })}
                  </div>
                  <p className="mt-5 text-xs leading-6 text-lab-text/54 dark:text-void-text/54">
                    Skip weights let shallow trajectory signals re-enter deeper representations without treating every layer equally.
                  </p>
                  <p className="mt-3 rounded-xl bg-white px-3 py-2 font-mono text-[11px] text-lab-text/48 dark:bg-void-black/45 dark:text-void-text/52">
                    h_l = RMSNorm(Attention(x_l) +{' '}
                    <span className={activeSkip ? 'rounded bg-[#e4ebfe] px-1 text-lab-accent dark:bg-neon-cyan/15 dark:text-neon-cyan' : ''}>
                      {activeSkip ? activeSkip.lambdaValue : 'λ_l'}
                    </span>{' '}
                    s_l)
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-lab-text/35 dark:text-void-text/38">
                    {activeSkip
                      ? `${activeSkip.lambdaLabel} injects ${activeSkip.lambdaValue}x skip signal into ${activeSkip.right}.`
                      : 'Hover or focus a skip path to inspect its learned weight.'}
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-lab-gray bg-white p-6 dark:border-white/10 dark:bg-void-gray/45">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h3 className="font-serif text-2xl">Attention mask</h3>
                  <div className="text-right font-mono text-xs uppercase tracking-[0.16em] text-lab-text/42 dark:text-void-text/42">
                    <p>Query by key</p>
                    <p
                      className="mt-1 text-lab-accent/70 dark:text-neon-cyan/75"
                      title="Ordered query-key pairs permitted by the current attention mask, including self-attention."
                    >
                      {attentionStats.active} active pairs
                    </p>
                  </div>
                </div>
                <div
                  data-selected-attention-pair
                  className="mt-5 rounded-2xl border border-lab-gray bg-lab-gray/35 p-4 dark:border-white/10 dark:bg-black/18"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-lab-text/40 dark:text-void-text/40">
                        Selected pair
                      </p>
                      <p className="mt-2 text-sm font-medium text-lab-text dark:text-white">{selectedLabel}</p>
                    </div>
                    {selectedReason ? (
                      <span
                        className={`w-fit rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${
                          selectedReason.active
                            ? 'bg-lab-accent text-white dark:bg-neon-cyan dark:text-void-black'
                            : 'bg-[#c10201]/10 text-[#9a1f1e] dark:bg-[#c10201]/20 dark:text-[#ffb3b3]'
                        }`}
                      >
                        {selectedReason.active ? 'Active' : 'Blocked'}
                      </span>
                    ) : (
                      <span className="w-fit rounded-full bg-white px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-lab-text/45 dark:bg-void-black/45 dark:text-void-text/52">
                        Inspect
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-lab-text/62 dark:text-void-text/62">
                    {selectedReason
                      ? selectedReason.reason
                      : 'Click, hover, or focus any matrix cell to inspect why that query-key pair is active or blocked under the current mode.'}
                  </p>
                </div>
                <p className="mt-4 font-mono text-[10px] uppercase leading-5 tracking-[0.14em] text-lab-text/35 dark:text-void-text/38 sm:hidden">
                  Scroll sideways to inspect all query-key columns.
                </p>
                <div className="-mx-2 mt-6 max-w-full overflow-x-auto px-2 pb-2 sm:mx-0 sm:px-0">
                  <div
                    className="grid min-w-[680px] gap-1"
                    style={{ gridTemplateColumns: `132px repeat(${METHOD_DEMO_TOKENS.length}, minmax(32px, 1fr))` }}
                  >
                    <div />
                    {METHOD_DEMO_TOKENS.map((token) => (
                      <div key={token.id} className="pb-2 text-center font-mono text-[10px] uppercase text-lab-text/42 dark:text-void-text/42">
                        {token.patient}{token.step}
                      </div>
                    ))}
                    {METHOD_DEMO_TOKENS.map((queryToken) => (
                      <React.Fragment key={queryToken.id}>
                        <div className="truncate pr-3 font-mono text-[11px] leading-7 text-lab-text/58 dark:text-void-text/58">
                          {queryToken.patient} / {queryToken.label}
                        </div>
                        {METHOD_DEMO_TOKENS.map((keyToken) => {
                          const active = canAttendToken(queryToken, keyToken, attentionMode, windowSize);
                          const future = keyToken.order > queryToken.order;
                          const samePatient = queryToken.patient === keyToken.patient;
                          const staticContext = Boolean(keyToken.staticContext);
                          const selected = selectedPair?.queryId === queryToken.id && selectedPair?.keyId === keyToken.id;

                          return (
                            <div
                              key={`${queryToken.id}-${keyToken.id}`}
                              role="button"
                              tabIndex={0}
                              data-active={active ? 'true' : 'false'}
                              data-cross-patient={active && !samePatient ? 'true' : 'false'}
                              data-static-context={active && staticContext ? 'true' : 'false'}
                              data-selected-pair={selected ? 'true' : 'false'}
                              aria-label={`${queryToken.patient} ${queryToken.label} attends to ${keyToken.patient} ${keyToken.label}: ${active ? 'active' : 'blocked'}`}
                              title={`${queryToken.label} attends to ${keyToken.label}: ${active ? 'yes' : 'no'}`}
                              onClick={() => setSelectedPair({ queryId: queryToken.id, keyId: keyToken.id })}
                              onMouseEnter={() => setSelectedPair({ queryId: queryToken.id, keyId: keyToken.id })}
                              onFocus={() => setSelectedPair({ queryId: queryToken.id, keyId: keyToken.id })}
                              onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                  event.preventDefault();
                                  setSelectedPair({ queryId: queryToken.id, keyId: keyToken.id });
                                }
                              }}
                              style={
                                active && staticContext
                                  ? {
                                      backgroundImage:
                                        'repeating-linear-gradient(135deg, rgba(187, 122, 29, 0.28) 0, rgba(187, 122, 29, 0.28) 4px, transparent 4px, transparent 8px)',
                                    }
                                  : undefined
                              }
                              className={`h-8 rounded-md border transition-colors focus:outline-none focus:ring-2 focus:ring-lab-accent/50 dark:focus:ring-neon-cyan/60 ${
                                active
                                  ? staticContext
                                    ? 'border-[#bb7a1d]/55 bg-[#fff6df] dark:border-[#d8aa4a]/65 dark:bg-[#3d321d]/70'
                                    : samePatient
                                    ? 'border-lab-accent bg-lab-accent/82 dark:border-neon-cyan dark:bg-neon-cyan/70'
                                    : 'border-[#c10201]/35 bg-[#c10201]/24 dark:border-[#c10201]/50 dark:bg-[#c10201]/32'
                                  : future
                                    ? 'border-transparent bg-transparent'
                                    : 'border-lab-text/8 bg-lab-text/[0.035] dark:border-white/8 dark:bg-white/[0.035]'
                              } ${selected ? 'ring-2 ring-lab-text/55 dark:ring-neon-cyan/80' : ''}`}
                            />
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-lab-text/45 dark:text-void-text/45 sm:grid-cols-4">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm bg-lab-accent/82 dark:bg-neon-cyan/70" />
                    Same patient
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="h-4 w-4 rounded-sm border border-[#bb7a1d]/55 bg-[#fff6df]"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(135deg, rgba(187, 122, 29, 0.3) 0, rgba(187, 122, 29, 0.3) 2px, transparent 2px, transparent 4px)',
                      }}
                    />
                    Static context
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm bg-[#c10201]/24" />
                    Cross patient
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-3 rounded-sm bg-lab-text/[0.08] dark:bg-white/[0.08]" />
                    Masked
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      <section id="method-paper" className="scroll-mt-28 bg-lab-gray/30 py-20 dark:bg-void-gray/20 md:py-28">
        <div className="mx-auto grid max-w-[2360px] grid-cols-1 gap-10 px-6 md:px-12 xl:grid-cols-2 xl:px-20 2xl:px-28">
          <div className="rounded-3xl border border-lab-gray bg-lab-white p-8 dark:border-white/10 dark:bg-void-black/45 md:p-10">
            <div className="mb-8 flex items-center gap-3">
              <Newspaper className="h-5 w-5 text-lab-accent dark:text-neon-cyan" />
              <h2 className="font-serif text-3xl md:text-4xl">METHOD Paper</h2>
            </div>
            <div className="space-y-4">
              {methodPublications.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group block rounded-2xl border border-lab-gray bg-white p-5 transition-colors hover:border-lab-accent dark:border-white/10 dark:bg-void-gray/50 dark:hover:border-neon-cyan"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="font-serif text-xl leading-snug group-hover:text-lab-accent dark:group-hover:text-neon-cyan">{item.title}</h3>
                      <p className="mt-3 text-sm text-lab-text/65 dark:text-void-text/65">{item.authors.join(', ')}</p>
                      <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-lab-accent/60 dark:text-neon-cyan/70">
                        {[item.journal, item.year].filter(Boolean).join(' · ')}
                      </p>
                    </div>
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 opacity-45 transition-opacity group-hover:opacity-100" />
                  </div>
                </a>
              ))}
              {methodPublications.length === 0 && (
                <p className="text-sm text-lab-text/55 dark:text-void-text/55">Loading publication data…</p>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-lab-gray bg-lab-white p-8 dark:border-white/10 dark:bg-void-black/45 md:p-10">
            <div className="mb-8 flex items-center gap-3">
              <Presentation className="h-5 w-5 text-lab-accent dark:text-neon-cyan" />
              <h2 className="font-serif text-3xl md:text-4xl">
                Talks <span className="font-sans font-normal">&amp;</span> Updates
              </h2>
            </div>
            <div className="space-y-4">
              {talks.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group block rounded-2xl border border-lab-gray bg-white p-5 transition-colors hover:border-lab-accent dark:border-white/10 dark:bg-void-gray/50 dark:hover:border-neon-cyan"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="font-serif text-xl leading-snug group-hover:text-lab-accent dark:group-hover:text-neon-cyan">{item.title}</h3>
                      <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-lab-accent/60 dark:text-neon-cyan/70">{item.date}</p>
                    </div>
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 opacity-45 transition-opacity group-hover:opacity-100" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="method-citation" className="mx-auto max-w-[2360px] scroll-mt-28 px-6 py-20 md:px-12 md:py-28 xl:px-20 2xl:px-28">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.72fr]">
          <div className="rounded-3xl border border-lab-gray bg-white p-8 dark:border-white/10 dark:bg-void-gray/45 md:p-12">
            <div className="mb-7 flex items-center justify-between gap-4">
              <h2 className="font-serif text-4xl">Citation</h2>
              <button
                type="button"
                onClick={copyCitation}
                className="inline-flex items-center gap-2 rounded-full border border-lab-text/15 px-4 py-2 text-xs font-medium text-lab-text transition-colors hover:border-lab-accent hover:text-lab-accent dark:border-white/15 dark:text-void-text dark:hover:border-neon-cyan dark:hover:text-neon-cyan"
              >
                {copiedCitation ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                {copiedCitation ? 'Copied' : 'Copy'}
              </button>
            </div>
            <pre className="overflow-x-auto rounded-2xl bg-lab-gray/45 p-5 text-xs leading-6 text-lab-text/72 dark:bg-black/25 dark:text-void-text/72">
              <code>{citation}</code>
            </pre>
          </div>
          <div className="rounded-3xl border border-lab-gray bg-white p-8 dark:border-white/10 dark:bg-void-gray/45 md:p-12">
            <h2 className="font-serif text-4xl">Get involved</h2>
            <p className="mt-6 leading-8 text-lab-text/70 dark:text-void-text/70">
              To learn more about METHOD or discuss collaborations, contact the MAI Research team.
            </p>
            <div className="mt-8 space-y-4">
              <a
                href="mailto:zina.ibrahim@kcl.ac.uk"
                className="flex items-center gap-3 text-sm font-mono text-lab-accent transition-colors hover:text-lab-text dark:text-neon-cyan dark:hover:text-void-text"
              >
                <Mail className="h-4 w-4" />
                zina.ibrahim@kcl.ac.uk
              </a>
              <a
                href="mailto:linglong.qian@kcl.ac.uk"
                className="flex items-center gap-3 text-sm font-mono text-lab-accent transition-colors hover:text-lab-text dark:text-neon-cyan dark:hover:text-void-text"
              >
                <Mail className="h-4 w-4" />
                linglong.qian@kcl.ac.uk
              </a>
              <a
                href="https://github.com/LinglongQian/METHOD"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-sm font-mono text-lab-accent transition-colors hover:text-lab-text dark:text-neon-cyan dark:hover:text-void-text"
              >
                <Github className="h-4 w-4" />
                GitHub repository
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-lab-gray bg-lab-text px-6 py-10 text-lab-white dark:border-white/10 dark:bg-black md:px-12 xl:px-20">
        <div className="mx-auto flex max-w-[2360px] flex-col gap-4 text-xs font-mono opacity-60 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 MAI Research Group. All rights reserved.</p>
          <a href="#contact" className="transition-colors hover:text-neon-cyan">
            Contact MAI Research
          </a>
        </div>
      </footer>
    </motion.main>
  );
};

export default MethodPage;
