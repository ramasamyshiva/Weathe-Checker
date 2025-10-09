import React from 'react';

// FIX: Allow passing DOM attributes like onClick to the underlying div by extending HTMLAttributes.
interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ children, className = '', ...rest }) => {
  return (
    <div
      {...rest}
      className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_15px_25px_rgba(0,0,0,0.3)] hover:bg-white/10 hover:-translate-y-2 hover:shadow-[0_20px_35px_rgba(0,0,0,0.35),0_0_25px_rgba(0,170,255,0.2)] transition-all duration-300 ease-in-out ${className}`}
    >
      {children}
    </div>
  );
};

export default React.memo(InfoCard);