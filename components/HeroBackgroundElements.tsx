import React from 'react';
import { MaiLogoPaths } from './MaiLogo';

interface Props {
  darkMode: boolean;
}

type HeroLayout = 'default' | 'ultrawide';

const sansFont = "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const HeroBackgroundElements: React.FC<Props> = ({ darkMode }) => {
  const pageBase = darkMode ? '#0c1420' : '#fbfaf7';
  const blueStart = darkMode ? 'rgba(77, 104, 154, 0.22)' : '#e4ebfe';
  const blueMid = darkMode ? 'rgba(88, 118, 172, 0.28)' : '#e4ebfe';
  const blueEnd = darkMode ? 'rgba(65, 92, 143, 0.2)' : '#e4ebfe';
  const creamStart = darkMode ? 'rgba(29, 34, 43, 0.34)' : '#F4F4F2';
  const creamEnd = darkMode ? 'rgba(24, 29, 38, 0.24)' : '#F4F4F2';
  const creamStrip = darkMode ? 'rgba(190, 203, 220, 0.08)' : '#F4F4F2';
  const topLeftFacet = darkMode ? 'rgba(255, 255, 255, 0.025)' : '#ffffff';
  const frameColor = darkMode ? 'rgba(150, 180, 210, 0.18)' : '#08223b';
  const formulaColor = darkMode ? '#b8c4d8' : '#4b5563';
  const logoRed = darkMode ? '#b80d0d' : '#c10201';
  const logoBlue = darkMode ? '#6d90cc' : '#1f3864';

  const renderHeroSvg = (layout: HeroLayout) => {
    const isUltrawide = layout === 'ultrawide';
    const artboardWidth = isUltrawide ? 2400 : 1600;
    const suffix = isUltrawide ? 'ultrawide' : 'default';
    const id = (name: string) => `mai-${name}-${suffix}`;
    const url = (name: string) => `url(#${id(name)})`;

    const creamPoints = isUltrawide
      ? '0,682 536,110 1632,1000 0,1000'
      : '0,682 536,110 1088,1000 0,1000';
    const blueBandPoints = isUltrawide
      ? '330,0 669,0 1900,1000 1632,1000 536,110 0,682 0,350'
      : '330,0 705,0 1310,1000 1088,1000 536,110 0,682 0,350';
    const creamStripPoints = isUltrawide
      ? '669,0 723,0 1954,1000 1900,1000'
      : '705,0 748,0 1348,1000 1310,1000';
    const turing = isUltrawide
      ? { x: 120, y: 228, width: 760, height: 980 }
      : { x: 80, y: 260, width: 720, height: 960 };
    const graphTransform = isUltrawide ? 'translate(220 330) rotate(-45)' : 'translate(158 392) rotate(-45)';
    const pathwayTransform = isUltrawide
      ? 'translate(-72 806) rotate(-35) scale(0.72)'
      : 'translate(-40 820) rotate(-35) scale(0.774)';
    const rnnFormula = isUltrawide
      ? { x: 1260, y: 740, width: 760, height: 84 }
      : { x: 832, y: 704, width: 592, height: 66 };
    const desktopLogoTransform = isUltrawide
      ? 'translate(1375 -24) scale(2.42)'
      : 'translate(738 24) scale(2.68)';

    return (
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${artboardWidth} 1000`}
        preserveAspectRatio="xMidYMid slice"
        className={`absolute inset-0 h-full w-full pointer-events-none ${
          isUltrawide ? 'mai-hero-svg-ultrawide' : 'mai-hero-svg-default'
        }`}
        style={{ zIndex: 0 }}
      >
        <defs>
          <linearGradient id={id('bg-base')} x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor={darkMode ? '#0b121d' : '#f7f1e9'} />
            <stop offset="58%" stopColor={darkMode ? '#111b2a' : '#fbfaf7'} />
            <stop offset="100%" stopColor={darkMode ? '#07101a' : '#ffffff'} />
          </linearGradient>
          <linearGradient id={id('bg-blue')} x1="34%" y1="0%" x2="82%" y2="100%">
            <stop offset="0%" stopColor={blueStart} />
            <stop offset="48%" stopColor={blueMid} />
            <stop offset="100%" stopColor={blueEnd} />
          </linearGradient>
          <linearGradient id={id('bg-cream')} x1="22%" y1="20%" x2="76%" y2="100%">
            <stop offset="0%" stopColor={creamStart} />
            <stop offset="100%" stopColor={creamEnd} />
          </linearGradient>
          <clipPath id={id('turing-clip')}>
            <polygon points={creamPoints} />
          </clipPath>
          <filter
            id={id('turing-soft')}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            colorInterpolationFilters="sRGB"
          >
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncR type="linear" slope={darkMode ? '0.34' : '0.55'} intercept={darkMode ? '0.24' : '0.38'} />
              <feFuncG type="linear" slope={darkMode ? '0.38' : '0.55'} intercept={darkMode ? '0.29' : '0.38'} />
              <feFuncB type="linear" slope={darkMode ? '0.48' : '0.55'} intercept={darkMode ? '0.36' : '0.38'} />
            </feComponentTransfer>
            <feGaussianBlur stdDeviation={darkMode ? '5.8' : '4.5'} />
          </filter>
          <radialGradient id={id('turing-fade')} cx="50%" cy="42%" r="64%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="52%" stopColor="white" stopOpacity="0.82" />
            <stop offset="76%" stopColor="white" stopOpacity="0.28" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask
            id={id('turing-mask')}
            maskUnits="userSpaceOnUse"
            x={turing.x}
            y={turing.y}
            width={turing.width}
            height={turing.height}
          >
            <rect
              x={turing.x}
              y={turing.y}
              width={turing.width}
              height={turing.height}
              fill={url('turing-fade')}
            />
          </mask>
          <linearGradient id={id('decoration-mask-gradient')} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="250">
            <stop offset="0%" stopColor="black" />
            <stop offset="36%" stopColor="black" />
            <stop offset="62%" stopColor="white" />
            <stop offset="100%" stopColor="white" />
          </linearGradient>
          <mask id={id('decoration-mask')} maskUnits="userSpaceOnUse" x="0" y="0" width={artboardWidth} height="1000">
            <rect width={artboardWidth} height="1000" fill={url('decoration-mask-gradient')} />
          </mask>
          <marker id={id('arrow-gray')} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={formulaColor} />
          </marker>
          <filter id={id('logo-shadow')} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="18"
              stdDeviation="14"
              floodColor={darkMode ? '#274668' : '#0f172a'}
              floodOpacity={darkMode ? '0.22' : '0.16'}
            />
          </filter>
        </defs>

        <rect width={artboardWidth} height="1000" fill={url('bg-base')} />
        <polygon points="0,0 330,0 0,350" fill={topLeftFacet} />
        <polygon
          className={darkMode ? 'mai-blue-band-dark' : undefined}
          points={blueBandPoints}
          fill={url('bg-blue')}
        />
        <polygon points={creamPoints} fill={url('bg-cream')} />
        <image
          href="/images/turing-1951.jpg"
          x={turing.x}
          y={turing.y}
          width={turing.width}
          height={turing.height}
          preserveAspectRatio="xMidYMin slice"
          clipPath={url('turing-clip')}
          filter={url('turing-soft')}
          mask={url('turing-mask')}
          opacity={darkMode ? 0.055 : 0.18}
          style={{ mixBlendMode: darkMode ? 'screen' : 'multiply' }}
        />
        <polygon
          className={darkMode ? 'mai-cream-strip-dark' : undefined}
          points={creamStripPoints}
          fill={creamStrip}
        />

        <g className="mai-decorations" style={{ mixBlendMode: darkMode ? 'screen' : 'multiply' }}>
          <g transform={graphTransform}>
            <image
              href="/images/graph-similarity-formula-latex.svg"
              x="0"
              y="-73.25"
              width={isUltrawide ? 390 : 380}
              height={isUltrawide ? 130 : 126.5}
              preserveAspectRatio="xMidYMid meet"
              opacity={darkMode ? 0.24 : 0.22}
              style={{ filter: darkMode ? 'invert(1)' : undefined }}
            />
          </g>
        </g>

        <g
          className="mai-decorations"
          mask={url('decoration-mask')}
          style={{ mixBlendMode: darkMode ? 'screen' : 'multiply' }}
        >
          <g
            transform={pathwayTransform}
            opacity={darkMode ? 0.12 : 0.08}
            stroke={formulaColor}
            fill={formulaColor}
            fontFamily={sansFont}
            fontWeight="700"
          >
            <g strokeWidth="3" fill="none">
              <line x1="120" y1="180" x2="330" y2="90" markerEnd={url('arrow-gray')} />
              <line x1="120" y1="200" x2="380" y2="245" markerEnd={url('arrow-gray')} />
              <line x1="355" y1="100" x2="395" y2="230" markerEnd={url('arrow-gray')} />
              <path d="M 335 75 Q 150 0 95 175" markerEnd={url('arrow-gray')} />
            </g>
            <g fill="#e8888a" stroke="none">
              <circle cx="100" cy="190" r="18" />
              <circle cx="350" cy="80" r="18" />
              <circle cx="400" cy="250" r="18" />
            </g>
            <text x="54" y="224" fontSize="15" transform="rotate(9.8 54 224)">Temp-Dec-Nor</text>
            <text x="365" y="48" fontSize="15" textAnchor="middle" transform="rotate(9.8 365 48)">Temp-Dec-Lo</text>
            <text x="382" y="286" fontSize="15" textAnchor="middle" transform="rotate(9.8 382 286)">Res-Rate-Inc-Hi</text>
            <text x="200" y="120" fontSize="12">p,1</text>
            <text x="250" y="210" fontSize="12">d,1</text>
            <text x="385" y="150" fontSize="12">d,2</text>
            <text x="130" y="40" fontSize="12">p,1</text>
          </g>

          <image
            href="/images/rnn-formula-latex.svg"
            x={rnnFormula.x}
            y={rnnFormula.y}
            width={rnnFormula.width}
            height={rnnFormula.height}
            preserveAspectRatio="xMidYMid meet"
            opacity={darkMode ? 0.24 : 0.2}
            style={{ filter: darkMode ? 'invert(1)' : undefined }}
          />
        </g>

        <g className="mai-desktop-logo" transform={desktopLogoTransform} filter={url('logo-shadow')}>
          <MaiLogoPaths variant="hero" mColor={logoRed} letterColor={logoBlue} />
        </g>

        <g className="mai-compact-logo-standard" transform="translate(618 210) scale(1.42)" filter={url('logo-shadow')}>
          <MaiLogoPaths variant="hero" mColor={logoRed} letterColor={logoBlue} />
        </g>

        <g className="mai-compact-logo-narrow" transform="translate(618 210) scale(1.32)" filter={url('logo-shadow')}>
          <MaiLogoPaths variant="hero" mColor={logoRed} letterColor={logoBlue} />
        </g>
      </svg>
    );
  };

  return (
    <div className="absolute inset-0 overflow-hidden select-none" style={{ zIndex: 0, background: pageBase }}>
      <style>
        {`
          .mai-hero-svg-default {
            display: block;
          }

          .mai-hero-svg-ultrawide {
            display: none;
          }

          .mai-decorations,
          .mai-desktop-logo {
            display: inline;
          }

          .mai-compact-logo-standard,
          .mai-compact-logo-narrow {
            display: none;
          }

          @media (max-width: 767px), (max-aspect-ratio: 4 / 3) {
            .mai-blue-band-dark {
              opacity: 0.62;
            }

            .mai-cream-strip-dark {
              opacity: 0.58;
            }

            .mai-decorations,
            .mai-desktop-logo {
              display: none;
            }

            .mai-compact-logo-standard {
              display: inline;
            }
          }

          @media (max-width: 360px) {
            .mai-compact-logo-standard {
              display: none;
            }

            .mai-compact-logo-narrow {
              display: inline;
            }
          }

          @media (min-width: 1200px) and (min-aspect-ratio: 21 / 10) {
            .mai-hero-svg-default {
              display: none;
            }

            .mai-hero-svg-ultrawide {
              display: block;
            }
          }
        `}
      </style>

      {renderHeroSvg('default')}
      {renderHeroSvg('ultrawide')}

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none border-[6px] md:border-[7px]"
        style={{ zIndex: 2, borderColor: frameColor }}
      />
    </div>
  );
};

export default HeroBackgroundElements;
