import React from 'react';
import InfoCard from './InfoCard';
import { WeatherData } from '../types';

interface TodaysHighlightsProps {
  data: WeatherData;
}

const HighlightItem: React.FC<{ label: string; value: string | number; unit?: string }> = React.memo(({ label, value, unit }) => (
  <div className="flex justify-between items-center text-slate-400">
    <span>{label}</span>
    <span className="text-white font-semibold text-lg">{value} {unit}</span>
  </div>
));

const TodaysHighlights: React.FC<TodaysHighlightsProps> = ({ data }) => {
  const { uvIndex } = data.current;
  const uvLevels = ['Low', 'Moderate', 'High', 'Very High', 'Extreme'];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-green-500';
      case 'Moderate': return 'bg-yellow-500';
      case 'High': return 'bg-orange-500';
      case 'Very High': return 'bg-red-500';
      case 'Extreme': return 'bg-purple-500';
      default: return 'bg-white/10';
    }
  };

  const currentLevel = uvLevels.find(level => 
    uvIndex.description.toLowerCase().includes(level.toLowerCase().replace(' ', ''))
  ) || '';

  return (
    <InfoCard>
      <h3 className="text-xl font-semibold text-[#00aaff] mb-4">Today's Highlights</h3>
      <div className="space-y-4">
        <HighlightItem label="Humidity" value={data.current.humidity} unit="%" />
        {data.current.wind.gust && (
          <HighlightItem label="Wind Gusts" value={data.current.wind.gust} unit="km/h" />
        )}
        <HighlightItem label="Pressure" value={data.current.pressure} unit="hPa" />
        <HighlightItem label="Visibility" value={data.current.visibility} unit="km" />
        
        {/* Detailed UV Index Section */}
        <div className="pt-2">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">UV Index</span>
            <span className="text-white font-semibold text-lg">{uvIndex.value}</span>
          </div>
          <div className="w-full h-2.5 rounded-full flex gap-1 mt-2 p-0.5 bg-black/20">
            {uvLevels.map((level) => (
              <div 
                key={level} 
                className={`w-1/5 h-full rounded-full transition-all duration-300 ${
                  level === currentLevel ? getLevelColor(level) : 'bg-white/10'
                }`}
              />
            ))}
          </div>
          <p className="text-right text-white font-semibold text-lg mt-1">{uvIndex.description}</p>
        </div>
      </div>
    </InfoCard>
  );
};

export default React.memo(TodaysHighlights);