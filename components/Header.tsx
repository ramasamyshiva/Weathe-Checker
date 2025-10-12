import React, { useState } from 'react';
import LogoIcon from './LogoIcon';
import UserMenu from './UserMenu';

interface HeaderProps {
  onSearch: (location: string) => void;
  onAlertsClick: () => void;
  location: string;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onAlertsClick, location }) => {
  const [searchInput, setSearchInput] = useState(location);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 px-4 md:px-8">
      <div className="flex items-center gap-2">
        <LogoIcon className="w-10 h-10" />
        <h1 className="text-2xl font-bold text-white">WEATHER CHECKER</h1>
      </div>
      <form onSubmit={handleSearch} className="flex-grow max-w-xl w-full">
        <div className="relative">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for a city..."
            className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00aaff] transition-all"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#00aaff] hover:bg-sky-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>
      <div className="flex items-center gap-4">
        <button onClick={onAlertsClick} className="relative p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Show notifications">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        </button>
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;