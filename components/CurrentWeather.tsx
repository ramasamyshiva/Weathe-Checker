import React from 'react';
import InfoCard from './InfoCard';
import WeatherIcon from './WeatherIcon';
import { WeatherData } from '../types';

interface CurrentWeatherProps {
  data: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  return (
    <InfoCard className="flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="text-center md:text-left">
        <div className="flex items-center gap-2 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span>{data.date}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span>{data.location}</span>
        </div>

        <div className="mt-8">
            <h2 className="text-5xl font-bold text-white">{data.current.condition}</h2>
            <p className="text-8xl font-thin text-[#00aaff] mt-2">{data.current.temp}°C</p>
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400 mt-4">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" transform="rotate(45)"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 12h14" /></svg>
                 <span>{data.current.wind.direction}, {data.current.wind.speed} km/h</span>
            </div>
        </div>
      </div>
      <div className="w-64 h-64">
        <WeatherIcon condition={data.current.condition} />
      </div>
    </InfoCard>
  );
};

export default React.memo(CurrentWeather);