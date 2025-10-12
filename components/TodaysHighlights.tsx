import React from 'react';
import InfoCard from './InfoCard';
import { WeatherData } from '../types';

interface TodaysHighlightsProps {
  data: WeatherData;
}

const HighlightItem: React.FC<{ label: string; value: string | number; unit?: string }> = React.memo(({ label, value, unit }) => (
  <div className="flex justify-between items-center text-slate-400">
    <span>{label}</span>
    <span className="text-white font-semibold text-lg">{value}{unit ? ` ${unit}` : ''}</span>
  </div>
));

const TodaysHighlights: React.FC<TodaysHighlightsProps> = ({ data }) => {
  const { uvIndex, aqi } = data.current;

  const uvLevels = [
    { name: 'Low', color: 'bg-green-500' },
    { name: 'Moderate', color: 'bg-yellow-500' },
    { name: 'High', color: 'bg-orange-500' },
    { name: 'Very High', color: 'bg-red-500' },
    { name: 'Extreme', color: 'bg-purple-500' },
  ];

  const aqiLevels = [
    { name: 'Good', color: 'bg-green-500' },
    { name: 'Moderate', color: 'bg-yellow-500' },
    { name: 'Unhealthy for Sensitive Groups', color: 'bg-orange-500' },
    { name: 'Unhealthy', color: 'bg-red-500' },
    { name: 'Very Unhealthy', color: 'bg-purple-500' },
    { name: 'Hazardous', color: 'bg-red-800' },
  ];

  const currentUvLevel = uvLevels.find(level => 
    uvIndex.description.toLowerCase().replace(/ /g, '') === level.name.toLowerCase().replace(/ /g, '')
  ) || null;

  const uvProgressPercentage = Math.min((uvIndex.value / 11) * 100, 100); // UV Index typically peaks around 11+

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
        
        {/* Sunrise & Sunset */}
        <div className="pt-2">
            <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.364-12.364l-.707.707M5.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M21 12h-1M4 12H3m14 4h-4a8 8 0 01-8-8V8" /></svg>
                    <div>
                        <p className="text-slate-400 text-sm">Sunrise</p>
                        <p className="text-white font-semibold text-lg">{data.current.sunrise}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.364-12.364l-.707.707M5.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M21 12h-1M4 12H3m4 8h8a2 2 0 002-2v-2a2 2 0 00-2-2H9a2 2 0 00-2 2v2a2 2 0 002 2z" /></svg>
                    <div>
                        <p className="text-slate-400 text-sm">Sunset</p>
                        <p className="text-white font-semibold text-lg">{data.current.sunset}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Enhanced UV Index Section */}
        <div className="pt-2">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">UV Index</span>
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold text-lg">{uvIndex.value}</span>
              <span className={`text-sm font-semibold px-2 py-0.5 rounded-full text-white ${currentUvLevel?.color || 'bg-slate-700'}`}>
                {uvIndex.description}
              </span>
            </div>
          </div>
          <div className="relative w-full h-2 rounded-full mt-3">
            <div className="absolute w-full h-full rounded-full bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 to-red-500"></div>
            <div 
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-slate-900 shadow-lg ring-2 ring-white/50"
              style={{ left: `${uvProgressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Detailed AQI Section */}
        <div className="pt-2">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Air Quality</span>
            <span className="text-white font-semibold text-lg">{aqi.value}</span>
          </div>
          <div className="w-full h-2.5 rounded-full flex gap-1 mt-2 p-0.5 bg-black/20">
            {aqiLevels.map((level) => (
              <div 
                key={level.name} 
                className={`w-1/6 h-full rounded-full transition-all duration-300 ${
                  aqi.description.toLowerCase().includes(level.name.toLowerCase().split(' ')[0]) ? level.color : 'bg-white/10'
                }`}
              />
            ))}
          </div>
          <p className="text-right text-white font-semibold text-lg mt-1">{aqi.description}</p>
        </div>

      </div>
    </InfoCard>
  );
};

export default React.memo(TodaysHighlights);