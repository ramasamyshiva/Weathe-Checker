
export interface HourlyForecast {
  time: string;
  temp: number;
  condition: string;
}

export interface DailyForecast {
  day: string;
  condition: string;
  low: number;
  high: number;
}

// FIX: Add WeatherAlert interface for the new alerts functionality.
export interface WeatherAlert {
  title: string;
  description: string;
  severity: 'Low' | 'Moderate' | 'High' | 'Extreme';
  source: string;
}

export interface WeatherData {
  location: string;
  date: string;
  current: {
    temp: number;
    condition: string;
    wind: {
      speed: number;
      direction: string;
      gust?: number;
    };
    humidity: number;
    pressure: number;
    visibility: number;
    uvIndex: {
      value: number;
      description: string;
    };
  };
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}