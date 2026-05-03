import React from 'react';

type MaiLogoVariant = 'hero' | 'nav';

interface MaiLogoProps {
  className?: string;
  variant?: MaiLogoVariant;
  title?: string;
  mColor?: string;
  letterColor?: string;
}

export const MAI_LOGO_VIEWBOX = '0 0 276 276';
const MAI_NAV_LOGO_VIEWBOX = '0 0 80 40';

export const MaiLogoPaths: React.FC<{ variant?: MaiLogoVariant; mColor?: string; letterColor?: string }> = ({
  variant = 'hero',
  mColor = '#c10201',
  letterColor = '#1f3864',
}) => {
  if (variant === 'nav') {
    return (
      <g fill={mColor} stroke="none">
        <path d="M0 40 V0 L15 20 L30 0 V40 H22 V15 L15 25 L8 15 V40 H0Z" />
        <path d="M35 40 L45 10 L55 40 H35Z" />
        <rect x="62" y="18" width="6" height="22" />
        <circle cx="65" cy="8" r="4" />
      </g>
    );
  }

  return (
    <>
      <path
        d="
          M 4,224
          L 36,13
          L 94,13
          L 138,122
          L 182,13
          L 240,13
          L 272,224
          L 216,224
          L 195.223,87
          L 144,224
          L 132,224
          L 80.777,87
          L 60,224
          Z
        "
        fill={mColor}
        stroke={mColor}
        strokeWidth={1.9}
        strokeLinejoin="miter"
      />
      <path
        d="
          M 65,224
          L 88,164
          L 101,164
          L 124,224
          L 109,224
          L 103.25,209
          L 85.75,209
          L 80,224
          Z

          M 87.6,198
          L 101.4,198
          L 94.5,180
          Z
        "
        fillRule="evenodd"
        clipRule="evenodd"
        fill={letterColor}
        stroke={letterColor}
        strokeWidth={1.6}
        strokeLinejoin="miter"
      />
      <path
        d="
          M 176,224
          L 176,164
          L 191,164
          L 191,224
          Z
        "
        fill={letterColor}
        stroke={letterColor}
        strokeWidth={1.6}
        strokeLinejoin="miter"
      />
    </>
  );
};

const MaiLogo: React.FC<MaiLogoProps> = ({
  className = '',
  variant = 'hero',
  title = 'MAI',
  mColor,
  letterColor,
}) => {
  return (
    <svg
      viewBox={variant === 'nav' ? MAI_NAV_LOGO_VIEWBOX : MAI_LOGO_VIEWBOX}
      className={`overflow-visible ${className}`}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <MaiLogoPaths variant={variant} mColor={mColor} letterColor={letterColor} />
    </svg>
  );
};

export default MaiLogo;
