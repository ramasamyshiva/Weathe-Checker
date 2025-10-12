import React, { useState, useEffect, useCallback } from 'react';
import { WeatherData } from './types';
import { fetchWeatherData } from './services/geminiService';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import TodaysHighlights from './components/TodaysHighlights';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import ErrorModal from './components/ErrorModal';
import AlertsModal from './components/AlertsModal';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import AskGeminiModal from './components/AskGeminiModal';
import WeatherDashboard from './components/WeatherDashboard';
import ApiModal from './components/ApiModal';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default to true to show the app
  const [isLoginView, setIsLoginView] = useState(true);

  const [location, setLocation] = useState<string>('Tokyo, Japan');
  const [forecastDays, setForecastDays] = useState<number>(5);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState<boolean>(false);
  const [isAskGeminiModalOpen, setIsAskGeminiModalOpen] = useState<boolean>(false);
  const [isApiModalOpen, setIsApiModalOpen] = useState<boolean>(false);

  const getWeatherData = useCallback(async () => {
    if (!location) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(location, forecastDays);
      setWeatherData(data);
    } catch (err) {
      setError((err as Error).message || 'An unknown error occurred.');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }, [location, forecastDays]);

  useEffect(() => {
    getWeatherData();
  }, [getWeatherData]);

  const handleSearch = (newLocation: string) => {
    setLocation(newLocation);
  };

  const handleDaysChange = (days: number) => {
    setForecastDays(days);
  };

  const handleRetry = () => {
    getWeatherData();
  };
  
  // Fake auth handlers
  const handleLogin = () => setIsAuthenticated(true);
  const handleSignUp = () => setIsAuthenticated(true);


  if (!isAuthenticated) {
    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans flex items-center justify-center">
            {isLoginView ? 
                <LoginPage onLogin={handleLogin} onSwitchToSignUp={() => setIsLoginView(false)} /> :
                <SignUpPage onSignUp={handleSignUp} onSwitchToLogin={() => setIsLoginView(true)} />
            }
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <div 
        className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"
      >
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-400 rounded-full mix-blend-screen filter blur-2xl opacity-25 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-sky-400 rounded-full mix-blend-screen filter blur-2xl opacity-25 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-screen filter blur-2xl opacity-25 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <Header onSearch={handleSearch} onAlertsClick={() => setIsAlertsModalOpen(true)} location={location} />

        <main className="py-8">
          {isLoading && (
             <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#00aaff]"></div>
             </div>
          )}

          {error && <ErrorModal message={error} onRetry={handleRetry} />}

          {weatherData && !isLoading && !error && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <CurrentWeather data={weatherData} onApiClick={() => setIsApiModalOpen(true)} />
                <HourlyForecast data={weatherData.hourly} />
                <DailyForecast data={weatherData.daily} activeDays={forecastDays} onDaysChange={handleDaysChange} />
                <WeatherDashboard data={weatherData} />
              </div>
              <div className="lg:col-span-1">
                <TodaysHighlights data={weatherData} />
              </div>
            </div>
          )}
        </main>
      </div>

      <AlertsModal 
        isOpen={isAlertsModalOpen}
        onClose={() => setIsAlertsModalOpen(false)}
        location={weatherData?.location || location}
      />

      {weatherData && !isLoading && !error && (
        <>
            <button
                onClick={() => setIsAskGeminiModalOpen(true)}
                className="fixed bottom-8 right-8 bg-gradient-to-br from-sky-400 to-blue-600 text-white rounded-full p-4 shadow-lg shadow-sky-500/30 hover:scale-110 hover:shadow-xl hover:shadow-sky-400/40 focus:outline-none focus:ring-4 focus:ring-sky-400/50 transition-all duration-300 z-40 btn-glow"
                aria-label="Ask Gemini about the weather"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5a.75.75 0 01.75.75V6h-1.5V3.25A.75.75 0 0112 2.5zM7.757 7.757a.75.75 0 011.06 0l1.44 1.44a.75.75 0 01-1.06 1.06l-1.44-1.44a.75.75 0 010-1.06zm8.486 0a.75.75 0 010 1.06l-1.44 1.44a.75.75 0 01-1.06-1.06l1.44-1.44a.75.75 0 011.06 0zM12 11.25a.75.75 0 01.75.75v2.5h-1.5v-2.5a.75.75 0 01.75-.75zM18 12a.75.75 0 01.75.75v1.5h-2.5v-1.5A.75.75 0 0118 12zm-5.692-2.243a.75.75 0 011.06 0l1.94 1.94a.75.75 0 11-1.06 1.06l-1.94-1.94a.75.75 0 010-1.06zM6 12a.75.75 0 01.75-.75h1.5v2.5H6.75A.75.75 0 016 12zm3.308 3.707a.75.75 0 010 1.06l-1.94 1.94a.75.75 0 11-1.06-1.06l1.94-1.94a.75.75 0 011.06 0zM12 18a.75.75 0 01.75.75v2.25h-1.5V18.75A.75.75 0 0112 18zm3.75-2.25a.75.75 0 011.06 0l1.44 1.44a.75.75 0 01-1.06 1.06l-1.44-1.44a.75.75 0 010-1.06z" /></svg>
            </button>
            <AskGeminiModal
              isOpen={isAskGeminiModalOpen}
              onClose={() => setIsAskGeminiModalOpen(false)}
              weatherData={weatherData}
            />
            <ApiModal
              isOpen={isApiModalOpen}
              onClose={() => setIsApiModalOpen(false)}
              data={weatherData}
            />
        </>
      )}

    </div>
  );
};

export default App;