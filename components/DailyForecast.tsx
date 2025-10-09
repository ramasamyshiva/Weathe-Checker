import React from 'react';
import InfoCard from './InfoCard';
import WeatherIcon from './WeatherIcon';
import { DailyForecast as DailyForecastData } from '../types';

interface DailyForecastProps {
  data: DailyForecastData[];
  activeDays: number;
  onDaysChange: (days: number) => void;
}

const DailyForecast: React.FC<DailyForecastProps> = ({ data, activeDays, onDaysChange }) => {
  return (
    <InfoCard>
      <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">The Next Days Forecast</h3>
          <div className="flex bg-white/10 rounded-full p-1">
              {[5, 7, 14].map((days) => (
                <button 
                    key={days}
                    onClick={() => onDaysChange(days)} 
                    className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors ${activeDays === days ? 'bg-[#00aaff] text-white' : 'text-slate-400 hover:bg-white/10'}`}>
                    {days} days
                </button>
              ))}
          </div>
      </div>

      <div className="space-y-2">
          {data.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-4">
                      <div className="w-10 h-10">
                          <WeatherIcon condition={day.condition} />
                      </div>
                      <div>
                          <p className="font-semibold text-white">{day.day}</p>
                          <p className="text-sm text-slate-400">{day.condition}</p>
                      </div>
                  </div>
                  <div className="text-right">
                      <p className="font-semibold text-white">{day.low}° <span className="text-slate-400">/ {day.high}°</span></p>
                  </div>
              </div>
          ))}
      </div>
    </InfoCard>
  );
};
  
export default React.memo(DailyForecast);