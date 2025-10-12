import React, { useState, useRef, useEffect } from 'react';

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#00aaff] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-[#00aaff]">
        <img src="https://i.pravatar.cc/40?u=a042581f4e29026704d" alt="User avatar" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-white/10 rounded-lg shadow-lg py-1 z-50">
          <div className="px-4 py-2 border-b border-white/10">
            <p className="text-sm text-white font-semibold">Jane Doe</p>
            <p className="text-xs text-slate-400">jane.doe@example.com</p>
          </div>
          <a href="#profile" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700">Profile</a>
          <a href="#settings" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700">Settings</a>
          <a href="#logout" className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700">Sign Out</a>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
