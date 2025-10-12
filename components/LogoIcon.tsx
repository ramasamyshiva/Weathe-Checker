import React from 'react';

interface LogoIconProps {
  className?: string;
}

const LogoIcon: React.FC<LogoIconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 64 64"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="gradSun" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="gradCloud" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#f3f7fe', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#deeafb', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <circle cx="32" cy="25" r="9" fill="url(#gradSun)" />
    <path
      fill="url(#gradCloud)"
      d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8.43A11.49 11.49 0 0022.5 49.5h24a9 9 0 000-18z"
    />
  </svg>
);

export default LogoIcon;
