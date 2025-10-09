import React, { useState, useEffect, useCallback } from 'react';
import InfoCard from './InfoCard';
import { fetchWeatherAlerts } from '../services/geminiService';
import { WeatherAlert } from '../types';

interface AlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: string;
}

type Subscription = {
  enabled: boolean;
  threshold?: number;
};

type Subscriptions = Record<string, Subscription>;

const alertConditions = [
  { key: 'Heavy Rain', label: 'Heavy Rain', configurable: false },
  { key: 'Strong Winds', label: 'Strong Winds', configurable: true, unit: 'km/h', default: 60 },
  { key: 'High UV Index', label: 'High UV Index', configurable: true, unit: 'index', default: 8 },
  { key: 'Snow', label: 'Snow', configurable: true, unit: '°C', default: 0 },
  { key: 'Thunderstorm', label: 'Thunderstorm', configurable: false },
  { key: 'Fog', label: 'Dense Fog', configurable: false },
];


const AlertsModal: React.FC<AlertsModalProps> = ({ isOpen, onClose, location }) => {
  const [activeTab, setActiveTab] = useState<'alerts' | 'settings'>('alerts');
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscriptions>({});

  const storageKey = `weather-alerts-${location}`;

  useEffect(() => {
    if (isOpen) {
      try {
        const storedSubs = localStorage.getItem(storageKey);
        if (storedSubs) {
          setSubscriptions(JSON.parse(storedSubs));
        } else {
          // Initialize with defaults if nothing is stored
          const defaultSubs: Subscriptions = {};
          alertConditions.forEach(cond => {
            defaultSubs[cond.key] = { enabled: false, threshold: cond.default };
          });
          setSubscriptions(defaultSubs);
        }
      } catch (e) {
        console.error("Failed to parse subscriptions from localStorage", e);
      }
    }
  }, [isOpen, location, storageKey]);

  const saveSubscriptions = useCallback((newSubs: Subscriptions) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(newSubs));
    } catch (e) {
      console.error("Failed to save subscriptions to localStorage", e);
    }
  }, [storageKey]);

  const handleSubscriptionChange = (key: string, enabled: boolean) => {
    const newSubs = { ...subscriptions, [key]: { ...subscriptions[key], enabled } };
    setSubscriptions(newSubs);
    saveSubscriptions(newSubs);
  };

  const handleThresholdChange = (key: string, threshold: number) => {
    if (!isNaN(threshold)) {
      const newSubs = { ...subscriptions, [key]: { ...subscriptions[key], threshold } };
      setSubscriptions(newSubs);
      saveSubscriptions(newSubs);
    }
  };

  useEffect(() => {
    if (isOpen && activeTab === 'alerts') {
      const getAlerts = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const data = await fetchWeatherAlerts(location);
          setAlerts(data);
        } catch (err) {
          setError((err as Error).message || 'An unknown error occurred.');
          setAlerts([]);
        } finally {
          setIsLoading(false);
        }
      };
      getAlerts();
    }
  }, [isOpen, location, activeTab]);

  if (!isOpen) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'low': return 'border-l-green-500';
      case 'moderate': return 'border-l-yellow-500';
      case 'high': return 'border-l-orange-500';
      case 'extreme': return 'border-l-red-500';
      default: return 'border-l-slate-500';
    }
  };

  const renderActiveAlerts = () => (
    <>
      {isLoading && <div className="text-center p-8">Loading alerts...</div>}
      {error && <div className="text-center p-8 text-red-400">{error}</div>}
      {!isLoading && !error && (
        <div className="max-h-[50vh] overflow-y-auto space-y-4 pr-2">
          {alerts.length > 0 ? (
            alerts.map((alert, index) => (
              <div key={index} className={`bg-white/5 p-4 rounded-lg border-l-4 ${getSeverityColor(alert.severity)}`}>
                <h3 className="font-bold text-lg text-white">{alert.title}</h3>
                <p className="text-slate-300 mt-1">{alert.description}</p>
                <p className="text-xs text-slate-500 mt-2 text-right">Source: {alert.source}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-400">No active weather alerts for this location.</p>
            </div>
          )}
        </div>
      )}
    </>
  );

  const renderSettings = () => (
    <div className="max-h-[50vh] overflow-y-auto space-y-4 pr-2">
      <p className="text-slate-400 text-sm pb-2">Get notified when specific weather conditions occur. Your preferences are saved per location.</p>
      {alertConditions.map(({ key, label, configurable, unit }) => {
        const sub = subscriptions[key] || { enabled: false };
        return (
        <div key={key} className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
          <label htmlFor={`toggle-${key}`} className="font-semibold text-white">{label}</label>
          <div className="flex items-center gap-4">
            {configurable && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={sub.threshold ?? ''}
                  onChange={(e) => handleThresholdChange(key, parseInt(e.target.value, 10))}
                  className="w-20 bg-black/30 border border-white/20 rounded-md py-1 px-2 text-right focus:outline-none focus:ring-2 focus:ring-[#00aaff]"
                  disabled={!sub.enabled}
                />
                <span className="text-slate-400 text-sm">{unit}</span>
              </div>
            )}
            <label htmlFor={`toggle-${key}`} className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id={`toggle-${key}`}
                className="sr-only peer"
                checked={sub.enabled}
                onChange={(e) => handleSubscriptionChange(key, e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-[#00aaff]/50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00aaff]"></div>
            </label>
          </div>
        </div>
      )})}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <InfoCard className="max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Notification Center</h2>
            <p className="text-slate-400">Location: <span className="text-[#00aaff] font-semibold">{location}</span></p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-white/10 mb-4">
          <button onClick={() => setActiveTab('alerts')} className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === 'alerts' ? 'text-[#00aaff] border-b-2 border-[#00aaff]' : 'text-slate-400 hover:text-white'}`}>Active Alerts</button>
          <button onClick={() => setActiveTab('settings')} className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === 'settings' ? 'text-[#00aaff] border-b-2 border-[#00aaff]' : 'text-slate-400 hover:text-white'}`}>Manage Subscriptions</button>
        </div>

        {activeTab === 'alerts' ? renderActiveAlerts() : renderSettings()}
      </InfoCard>
    </div>
  );
};

export default AlertsModal;