import React from 'react';

interface WeatherIconProps {
  condition: string;
  className?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, className }) => {
  const getIcon = () => {
    const lowerCaseCondition = condition.toLowerCase();

    if (lowerCaseCondition.includes('rain') || lowerCaseCondition.includes('drizzle')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className={className}>
          <path d="M4.3,43.3a14,14,0,0,1,12.7-8.1,16,16,0,0,1,18.8,1.2,12,12,0,0,1,11.2-5.4,12.2,12.2,0,0,1,11.4,9.1,10,10,0,0,1,0,19.8" fill="none" stroke="#e0effc" strokeMiterlimit="10" strokeWidth="3" transform="translate(-4 -1) scale(1.1)" className="animate-pulse-subtle"/>
          <path d="M43.9,43.3a12,12,0,0,0-12,12" fill="none" stroke="#e0effc" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" className="animate-pulse-subtle"/>
          <line x1="31.9" y1="58.3" x2="31.9" y2="61.3" fill="none" stroke="#00aaff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" className="animate-rain-1"/>
          <line x1="39.9" y1="58.3" x2="39.9" y2="61.3" fill="none" stroke="#00aaff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" strokeDasharray="0 3 2" className="animate-rain-2"/>
          <line x1="23.9" y1="58.3" x2="23.9" y2="61.3" fill="none" stroke="#00aaff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" strokeDasharray="0 3 2" className="animate-rain-3"/>
        </svg>
      );
    }
    if (lowerCaseCondition.includes('cloud')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className={className}>
          <path d="M43.9,43.3a12,12,0,0,0-12,12" fill="none" stroke="#e0effc" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" className="animate-pulse-subtle"/>
          <path d="M4.3,43.3a14,14,0,0,1,12.7-8.1,16,16,0,0,1,18.8,1.2,12,12,0,0,1,11.2-5.4,12.2,12.2,0,0,1,11.4,9.1,10,10,0,0,1,0,19.8" fill="none" stroke="#e0effc" strokeMiterlimit="10" strokeWidth="3" transform="translate(-4 -1) scale(1.1)" className="animate-pulse-subtle"/>
        </svg>
      );
    }
    if (lowerCaseCondition.includes('sun') || lowerCaseCondition.includes('clear')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className={className}>
          <g className="animate-spin-slow">
            <circle cx="32" cy="32" r="12" fill="none" stroke="#00aaff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/>
            <line x1="32" y1="4" x2="32" y2="10" fill="none" stroke="#00aaff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/>
            <line x1="32" y1="54" x2="32" y2="60" fill="none" stroke="#00aaff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/>
            <line x1="12.2" y1="12.2" x2="16.4" y2="16.4" fill="none" stroke="#00aaff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/>
            <line x1="47.6" y1="47.6" x2="51.8" y2="51.8" fill="none" stroke="#00aaff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/>
            <line x1="4" y1="32" x2="10" y2="32" fill="none" stroke="#00aaff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/>
            <line x1="54" y1="32" x2="60" y2="32" fill="none" stroke="#00aaff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/>
            <line x1="12.2" y1="51.8" x2="16.4" y2="47.6" fill="none" stroke="#00aaff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/>
            <line x1="47.6" y1="16.4" x2="51.8" y2="12.2" fill="none" stroke="#00aaff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3"/>
          </g>
        </svg>
      );
    }
    return ( // Default icon
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className={className}>
         <path d="M43.9,43.3a12,12,0,0,0-12,12" fill="none" stroke="#e0effc" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" className="animate-pulse-subtle"/>
          <path d="M4.3,43.3a14,14,0,0,1,12.7-8.1,16,16,0,0,1,18.8,1.2,12,12,0,0,1,11.2-5.4,12.2,12.2,0,0,1,11.4,9.1,10,10,0,0,1,0,19.8" fill="none" stroke="#e0effc" strokeMiterlimit="10" strokeWidth="3" transform="translate(-4 -1) scale(1.1)" className="animate-pulse-subtle"/>
      </svg>
    );
  };
  return getIcon();
};

export default WeatherIcon;