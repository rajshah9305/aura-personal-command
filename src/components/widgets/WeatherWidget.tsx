
import React, { useEffect, useState } from 'react';
import { CloudSun, CloudRain, Sun, RefreshCw } from 'lucide-react';
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
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'rainy':
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      default:
        return <CloudSun className="w-8 h-8 text-blue-400" />;
    }
  };

  const handleRefresh = () => {
    setWeather(null);
    fetchWeather();
  };

  if (loading) {
    return (
      <div className="widget-card h-full">
        <div className="widget-header">
          <h3 className="font-semibold">Weather</h3>
          <RefreshCw className="w-4 h-4 animate-spin text-muted-foreground" />
        </div>
        <div className="widget-content">
          <div className="animate-pulse">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-muted rounded-full"></div>
              <div className="flex-1">
                <div className="h-8 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="text-center">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="w-8 h-8 bg-muted rounded-full mx-auto mb-2"></div>
                  <div className="h-3 bg-muted rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="widget-card h-full">
        <div className="widget-header">
          <h3 className="font-semibold">Weather</h3>
          <button 
            onClick={handleRefresh}
            className="p-1 hover:bg-accent rounded transition-colors"
            title="Retry"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
        <div className="widget-content flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">{error}</p>
            <button 
              onClick={handleRefresh}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="widget-card h-full">
        <div className="widget-header">
          <h3 className="font-semibold">Weather</h3>
        </div>
        <div className="widget-content flex items-center justify-center">
          <p className="text-muted-foreground">No weather data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="widget-card h-full">
      <div className="widget-header">
        <h3 className="font-semibold">Weather</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{weather.current.location}</span>
          <button 
            onClick={handleRefresh}
            className="p-1 hover:bg-accent rounded transition-colors"
            title="Refresh weather"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="widget-content">
        {/* Current Weather */}
        <div className="flex items-center gap-4 mb-6">
          {getWeatherIcon(weather.current.condition)}
          <div className="flex-1">
            <div className="text-3xl font-bold">{weather.current.temp}°F</div>
            <div className="text-muted-foreground">{weather.current.condition}</div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground">Humidity</div>
            <div className="font-semibold">{weather.current.humidity}%</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground">Wind</div>
            <div className="font-semibold">{weather.current.windSpeed} mph</div>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div>
          <h4 className="font-medium mb-3">5-Day Forecast</h4>
          <div className="grid grid-cols-5 gap-2">
            {weather.forecast.map((day, index) => (
              <div key={index} className="text-center p-2 rounded-lg hover:bg-muted/30 transition-colors">
                <div className="text-xs text-muted-foreground mb-2">
                  {day.date}
                </div>
                <div className="flex justify-center mb-2">
                  {getWeatherIcon(day.condition)}
                </div>
                <div className="text-xs">
                  <div className="font-medium">{day.high}°</div>
                  <div className="text-muted-foreground">{day.low}°</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
