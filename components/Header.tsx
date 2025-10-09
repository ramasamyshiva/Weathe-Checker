import React, { useState, Suspense } from 'react';

const AlertsModal = React.lazy(() => import('./AlertsModal'));

interface HeaderProps {
  onSearch: (location: string) => void;
  currentLocation: string;
}

const Header: React.FC<HeaderProps> = ({ onSearch, currentLocation }) => {
  const [locationInput, setLocationInput] = useState('New York, NY');
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (locationInput.trim()) {
      onSearch(locationInput.trim());
    }
  };

  return (
    <>
      <header className="flex items-center justify-between p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#00aaff]/20 border border-[#00aaff] rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-[#00aaff] rounded-full"></div>
          </div>
          <h1 className="text-xl font-bold tracking-wider text-white">WEATHER CHECKER</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <input
              type="text"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              placeholder="Search location..."
              className="w-full bg-white/5 border border-white/20 rounded-full py-2 px-6 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00aaff]"
            />
            <button type="submit" className="absolute right-0 top-0 h-full bg-[#00aaff] text-white font-semibold rounded-full px-6 transition-all duration-300 btn-glow">
              Search
            </button>
          </div>
        </form>
        <div className="flex items-center gap-4">
          <button onClick={() => setIsAlertsModalOpen(true)} className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a1 1 0 00-2 0v.083A6 6 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00aaff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#00aaff] items-center justify-center text-xs">!</span>
            </span>
          </button>
          <button className="bg-[#00aaff] text-white font-semibold rounded-full px-6 py-2 transition-all duration-300 btn-glow">
            Sign In
          </button>
        </div>
      </header>
      {isAlertsModalOpen && (
        <Suspense fallback={<div />}>
          <AlertsModal 
            isOpen={isAlertsModalOpen}
            onClose={() => setIsAlertsModalOpen(false)}
            location={currentLocation}
          />
        </Suspense>
      )}
    </>
  );
};

export default React.memo(Header);