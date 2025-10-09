import React, { useState, useEffect } from 'react';
import InfoCard from './InfoCard';

interface AlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: string;
}

const ALERT_CONDITIONS = ['Heavy Rain', 'Strong Winds', 'Thunderstorms', 'High UV Index', 'Fog', 'Snow'];

const AlertsModal: React.FC<AlertsModalProps> = ({ isOpen, onClose, location }) => {
  const [preferences, setPreferences] = useState<string[]>([]);

  useEffect(() => {
    if (location) {
      const storedAlerts = localStorage.getItem('weatherAlerts');
      if (storedAlerts) {
        const alerts = JSON.parse(storedAlerts);
        setPreferences(alerts[location.toLowerCase()] || []);
      }
    }
  }, [location]);

  if (!isOpen) return null;

  const handleCheckboxChange = (condition: string) => {
    setPreferences(prev => 
      prev.includes(condition) 
        ? prev.filter(item => item !== condition)
        : [...prev, condition]
    );
  };

  const handleSave = () => {
    const storedAlerts = localStorage.getItem('weatherAlerts');
    const alerts = storedAlerts ? JSON.parse(storedAlerts) : {};
    alerts[location.toLowerCase()] = preferences;
    localStorage.setItem('weatherAlerts', JSON.stringify(alerts));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div onClick={e => e.stopPropagation()}>
        <InfoCard className="max-w-lg w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-white">Weather Alerts</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-slate-400 mb-2">Get notified for <span className="font-semibold text-[#00aaff]">{location}</span></p>
          <div className="grid grid-cols-2 gap-4 my-6">
            {ALERT_CONDITIONS.map(condition => (
              <label key={condition} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.includes(condition)}
                  onChange={() => handleCheckboxChange(condition)}
                  className="h-5 w-5 rounded bg-white/10 border-white/20 text-[#00aaff] focus:ring-2 focus:ring-[#00aaff]/50"
                />
                <span className="text-slate-200">{condition}</span>
              </label>
            ))}
          </div>
          <div className="mt-8">
            <button
              onClick={handleSave}
              className="w-full bg-[#00aaff] text-white font-semibold rounded-full px-6 py-3 transition-all duration-300 btn-glow"
            >
              Save Preferences
            </button>
          </div>
        </InfoCard>
      </div>
    </div>
  );
};

export default AlertsModal;