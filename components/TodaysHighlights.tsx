
import React from 'react';
import InfoCard from './InfoCard';
import { WeatherData } from '../types';

interface TodaysHighlightsProps {
  data: WeatherData;
}

const HighlightItem: React.FC<{ label: string; value: string | number; unit?: string }> = ({ label, value, unit }) => (
  <div className="flex justify-between items-center text-slate-400">
    <span>{label}</span>
    <span className="text-white font-semibold text-lg">{value} {unit}</span>
  </div>
);

const TodaysHighlights: React.FC<TodaysHighlightsProps> = ({ data }) => {
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
        <HighlightItem label="UV Index" value={`${data.current.uvIndex.value} ${data.current.uvIndex.description}`} />
      </div>
    </InfoCard>
  );
};

export default TodaysHighlights;