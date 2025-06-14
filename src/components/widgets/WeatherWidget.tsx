
import React, { useEffect, useState } from 'react';
import { CloudSun, CloudRain, Sun, RefreshCw, Droplets, Wind } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

export const WeatherWidget: React.FC = () => {
  const { weather, setWeather } = useDashboard();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const sampleWeather = {
        current: {
          temp: 72,
          condition: 'Partly Cloudy',
          icon: 'partly-cloudy',
          humidity: 65,
          windSpeed: 8,
          location: 'New York, NY'
        },
        forecast: [
          { date: 'Today', high: 75, low: 65, condition: 'Partly Cloudy', icon: 'partly-cloudy' },
          { date: 'Tomorrow', high: 78, low: 68, condition: 'Sunny', icon: 'sunny' },
          { date: 'Wednesday', high: 73, low: 63, condition: 'Rainy', icon: 'rainy' },
          { date: 'Thursday', high: 70, low: 60, condition: 'Cloudy', icon: 'cloudy' },
          { date: 'Friday', high: 76, low: 66, condition: 'Sunny', icon: 'sunny' },
        ]
      };
      
      setWeather(sampleWeather);
    } catch (err) {
      setError('Failed to load weather data');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!weather) {
      fetchWeather();
    } else {
      setLoading(false);
    }
  }, [weather, setWeather]);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="w-8 h-8 text-yellow-400" />;
      case 'rainy':
        return <CloudRain className="w-8 h-8 text-blue-400" />;
      default:
        return <CloudSun className="w-8 h-8 text-blue-300" />;
    }
  };

  const handleRefresh = () => {
    setWeather(null);
    fetchWeather();
  };

  if (loading) {
    return (
      <div className="h-full rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white shadow-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl">Weather</h3>
            <RefreshCw className="w-5 h-5 animate-spin text-white/80" />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-pulse text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4"></div>
              <div className="h-6 bg-white/20 rounded mb-2 w-24 mx-auto"></div>
              <div className="h-4 bg-white/20 rounded w-16 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full rounded-xl bg-gradient-to-br from-red-500 via-red-600 to-pink-700 text-white shadow-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl">Weather</h3>
            <button 
              onClick={handleRefresh}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              title="Retry"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-white/90 mb-4">{error}</p>
              <button 
                onClick={handleRefresh}
                className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="h-full rounded-xl bg-gradient-to-br from-gray-500 via-gray-600 to-slate-700 text-white shadow-xl overflow-hidden relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl">Weather</h3>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-white/80">No weather data available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white shadow-xl overflow-hidden relative hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl">Weather</h3>
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/80">{weather.current.location}</span>
            <button 
              onClick={handleRefresh}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors group"
              title="Refresh weather"
            >
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>
        </div>

        {/* Current Weather */}
        <div className="flex items-center gap-6 mb-8">
          <div className="flex-shrink-0">
            {getWeatherIcon(weather.current.condition)}
          </div>
          <div className="flex-1">
            <div className="text-4xl font-bold mb-1">{weather.current.temp}°F</div>
            <div className="text-white/90 text-lg">{weather.current.condition}</div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/15 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-colors">
            <Droplets className="w-5 h-5 mx-auto mb-2 text-blue-200" />
            <div className="text-sm text-white/80">Humidity</div>
            <div className="font-bold text-lg">{weather.current.humidity}%</div>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-colors">
            <Wind className="w-5 h-5 mx-auto mb-2 text-blue-200" />
            <div className="text-sm text-white/80">Wind</div>
            <div className="font-bold text-lg">{weather.current.windSpeed} mph</div>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="flex-1">
          <h4 className="font-semibold mb-4 text-white/90">5-Day Forecast</h4>
          <div className="grid grid-cols-5 gap-2">
            {weather.forecast.map((day, index) => (
              <div 
                key={index} 
                className="text-center p-3 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="text-xs text-white/80 mb-2 font-medium">
                  {day.date}
                </div>
                <div className="flex justify-center mb-3 scale-75">
                  {getWeatherIcon(day.condition)}
                </div>
                <div className="text-xs">
                  <div className="font-bold text-white">{day.high}°</div>
                  <div className="text-white/70">{day.low}°</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
