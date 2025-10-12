import React from 'react';
import InfoCard from './InfoCard';
import { WeatherData } from '../types';

interface WeatherDashboardProps {
  data: WeatherData;
}

const MetricCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white/5 p-4 rounded-xl flex flex-col items-center justify-center text-center h-48 hover:bg-white/10 transition-colors duration-300">
    <h4 className="text-sm font-medium text-slate-400 mb-2">{title}</h4>
    {children}
  </div>
);

const WeatherDashboard: React.FC<WeatherDashboardProps> = ({ data }) => {
  const { wind, humidity, visibility, pressure } = data.current;

  const getWindDirectionAngle = (direction: string) => {
    const directions: { [key: string]: number } = {
      'North': 0, 'NNE': 22.5, 'NE': 45, 'ENE': 67.5,
      'East': 90, 'ESE': 112.5, 'SE': 135, 'SSE': 157.5,
      'South': 180, 'SSW': 202.5, 'SW': 225, 'WSW': 247.5,
      'West': 270, 'WNW': 292.5, 'NW': 315, 'NNW': 337.5
    };
    return directions[direction] || 0;
  };

  const humidityCircumference = 2 * Math.PI * 30; // 2 * pi * radius
  const humidityStrokeDashoffset = humidityCircumference - (humidity / 100) * humidityCircumference;

  const pressureRange = [950, 1050]; // A typical range for atmospheric pressure in hPa
  const pressureAngleRange = [-120, 120]; // The sweep of the gauge in degrees
  const pressureValue = Math.max(pressureRange[0], Math.min(pressureRange[1], pressure));
  const pressurePercentage = (pressureValue - pressureRange[0]) / (pressureRange[1] - pressureRange[0]);
  const pressureAngle = pressureAngleRange[0] + pressurePercentage * (pressureAngleRange[1] - pressureAngleRange[0]);

  return (
    <InfoCard>
      <h3 className="text-xl font-semibold text-white mb-4">Weather Dashboard</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Wind Status */}
        <MetricCard title="Wind Status">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <div className="absolute inset-0 border-2 border-slate-700 rounded-full"></div>
            <div className="absolute text-slate-500 text-xs" style={{ top: '2px' }}>N</div>
            <div className="absolute text-slate-500 text-xs" style={{ bottom: '2px' }}>S</div>
            <div className="absolute text-slate-500 text-xs" style={{ left: '4px' }}>W</div>
            <div className="absolute text-slate-500 text-xs" style={{ right: '4px' }}>E</div>
            <div className="z-10 text-center">
              <span className="text-2xl font-bold text-white">{wind.speed}</span>
              <span className="text-xs text-slate-400 block">km/h</span>
            </div>
            <div 
              className="absolute w-full h-full flex justify-center" 
              style={{ transform: `rotate(${getWindDirectionAngle(wind.direction)}deg)` }}
            >
              <div className="w-1 h-8 bg-[#00aaff] rounded-full" style={{ transform: 'translateY(8px)' }}></div>
            </div>
          </div>
        </MetricCard>

        {/* Humidity */}
        <MetricCard title="Humidity">
          <svg className="w-24 h-24" viewBox="0 0 70 70">
            <circle cx="35" cy="35" r="30" className="stroke-slate-700" strokeWidth="6" fill="transparent" />
            <circle
              cx="35"
              cy="35"
              r="30"
              className="stroke-[#00aaff]"
              strokeWidth="6"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={humidityCircumference}
              strokeDashoffset={humidityStrokeDashoffset}
              transform="rotate(-90 35 35)"
            />
            <text x="50%" y="50%" textAnchor="middle" dy=".3em" className="text-2xl font-bold fill-white">
              {humidity}<tspan className="text-base" dy="-0.5em">%</tspan>
            </text>
          </svg>
        </MetricCard>

        {/* Visibility */}
        <MetricCard title="Visibility">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#00aaff] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <p className="text-3xl font-bold text-white">{visibility} <span className="text-lg text-slate-400">km</span></p>
        </MetricCard>

        {/* Air Pressure */}
        <MetricCard title="Air Pressure">
            <div className="relative w-28 h-20">
                <svg viewBox="0 0 100 50" className="w-full h-full absolute -top-4">
                    <path d="M10 50 A 40 40 0 0 1 90 50" stroke="#475569" strokeWidth="8" fill="none" strokeLinecap="round" />
                </svg>
                <div 
                    className="absolute bottom-4 left-1/2 w-1 h-12 bg-red-500 rounded-full origin-bottom"
                    style={{ transform: `translateX(-50%) rotate(${pressureAngle}deg)` }}
                ></div>
                <div className="absolute w-4 h-4 bg-white rounded-full bottom-2 left-1/2 transform -translate-x-1/2"></div>
            </div>
            <p className="text-2xl font-bold text-white">{pressure} <span className="text-base text-slate-400">hPa</span></p>
        </MetricCard>

      </div>
    </InfoCard>
  );
};

export default WeatherDashboard;
