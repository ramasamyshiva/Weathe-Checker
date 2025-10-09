import React from 'react';
import InfoCard from './InfoCard';
import WeatherIcon from './WeatherIcon';
import { HourlyForecast } from '../types';

interface HourlyForecastProps {
  data: HourlyForecast[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ data }) => {
  return (
    <InfoCard>
      <h3 className="text-xl font-semibold text-[#00aaff] mb-4">Hourly Forecast</h3>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {data.map((hour, index) => (
          <div key={index} className={`flex flex-col items-center justify-between flex-shrink-0 p-4 rounded-lg w-28 text-center transition-colors duration-300 ${index === 0 ? 'bg-[#00aaff]/20' : 'bg-white/5 hover:bg-white/10'}`}>
            <span className="text-slate-400 text-sm">{hour.time}</span>
            <div className="w-16 h-16 my-2">
                <WeatherIcon condition={hour.condition} />
            </div>
            <span className="text-white font-bold text-lg">{hour.temp}°C</span>
          </div>
        ))}
      </div>
    </InfoCard>
  );
};

export default HourlyForecast;