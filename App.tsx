import React, { useState, useEffect, useCallback } from 'react';
import { WeatherData } from './types';
import { fetchWeatherData } from './services/geminiService';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import TodaysHighlights from './components/TodaysHighlights';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import ErrorModal from './components/ErrorModal';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<string>('New York, NY');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [forecastDays, setForecastDays] = useState<number>(5);

  const backgroundImageUrl = 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?q=80&w=1935&auto=format&fit=crop';

  const getWeatherData = useCallback(async (searchLocation: string, days: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(searchLocation, days);
      setWeatherData(data);
    } catch (err) {
      setError((err as Error).message || 'An unknown error occurred.');
      setWeatherData(null); // Clear old data on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getWeatherData(location, forecastDays);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only on initial mount

  const handleSearch = (newLocation: string) => {
    setLocation(newLocation);
    setForecastDays(5); // Reset to 5 days on new search
    getWeatherData(newLocation, 5);
  };

  const handleRetry = () => {
    getWeatherData(location, forecastDays);
  };

  const handleDaysChange = (days: number) => {
    if (days !== forecastDays) {
      setForecastDays(days);
      if (location && weatherData) {
        getWeatherData(location, days);
      }
    }
  };

  const LoadingSpinner: React.FC = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="flex flex-col items-center justify-center text-white">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-[#00aaff]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-lg">Fetching fresh forecast from Gemini...</p>
      </div>
    </div>
  );

  return (
    <div 
      className="min-h-screen text-slate-200 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `linear-gradient(rgba(10, 15, 30, 0.7), rgba(10, 15, 30, 0.7)), url(${backgroundImageUrl})` }}
    >
        <Header onSearch={handleSearch} currentLocation={location} />
        <main className="p-4 md:p-8">
          {weatherData && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <CurrentWeather data={weatherData} />
                <HourlyForecast data={weatherData.hourly} />
              </div>
              <div className="lg:col-span-1 space-y-6">
                <TodaysHighlights data={weatherData} />
                <DailyForecast 
                  data={weatherData.daily} 
                  activeDays={forecastDays}
                  onDaysChange={handleDaysChange}
                />
              </div>
            </div>
          )}

          {/* Overlays */}
          {isLoading && <LoadingSpinner />}
          {error && <ErrorModal message={error} onRetry={handleRetry} />}
        </main>
    </div>
  );
};

export default App;