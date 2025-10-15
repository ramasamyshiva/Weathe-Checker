import React from 'react';

interface WeatherIconProps {
  condition: string;
  className?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, className }) => {
  const getIcon = () => {
    const lowerCaseCondition = condition.toLowerCase();

    if (lowerCaseCondition.includes('rain') || lowerCaseCondition.includes('drizzle') || lowerCaseCondition.includes('thunder')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 10.5l.445.445a3 3 0 014.11 0l.445-.445m-4.954 3.053a3 3 0 004.11 0" />
        </svg>
      );
    }
    if (lowerCaseCondition.includes('partly') && lowerCaseCondition.includes('cloud')) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-2.666-5.012 5.25 5.25 0 00-9.663 2.083A4.5 4.5 0 002.25 15z" />
            </svg>
        );
    }
    if (lowerCaseCondition.includes('cloud')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-2.666-5.012 5.25 5.25 0 00-9.663 2.083A4.5 4.5 0 002.25 15z" />
        </svg>
      );
    }
    if (lowerCaseCondition.includes('sun') || lowerCaseCondition.includes('clear')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.364l-1.591 1.591M21 12h-2.25m-.364 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      );
    }
    if (lowerCaseCondition.includes('snow')) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-2.25m0 0a3 3 0 00-3-3m3 3a3 3 0 01-3-3m3 3v-2.25m0 0a3 3 0 00-3-3m3 3a3 3 0 01-3-3M12 9a3 3 0 013-3h1.5a3 3 0 013 3v1.5a3 3 0 01-3 3H3a3 3 0 01-3-3V9a3 3 0 013-3h1.5a3 3 0 013 3m-3-3v2.25m0 0a3 3 0 003 3m-3-3a3 3 0 013-3m0 0h1.5m-1.5 0v2.25" />
        </svg>
      );
    }
    return ( // Default icon - a simple moon for night/misc
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
    );
  };
  return getIcon();
};

export default React.memo(WeatherIcon);