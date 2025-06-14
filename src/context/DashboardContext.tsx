
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  completed: boolean;
  dueDate?: string;
  createdAt: string;
}

export interface Widget {
  id: string;
  name: string;
  type: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  visible: boolean;
  settings?: Record<string, any>;
}

export interface WeatherData {
  current: {
    temp: number;
    condition: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    location: string;
  };
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
  }>;
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  category: string;
  publishedAt: string;
  imageUrl?: string;
}

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
}

interface DashboardContextType {
  // Theme
  darkMode: boolean;
  toggleDarkMode: () => void;
  
  // Widgets
  widgets: Widget[];
  updateWidget: (id: string, updates: Partial<Widget>) => void;
  
  // Tasks
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  
  // Weather
  weather: WeatherData | null;
  setWeather: (weather: WeatherData) => void;
  
  // News
  news: NewsItem[];
  setNews: (news: NewsItem[]) => void;
  selectedNewsCategory: string;
  setSelectedNewsCategory: (category: string) => void;
  
  // Stocks
  watchlist: string[];
  stockData: Record<string, StockData>;
  addToWatchlist: (symbol: string) => void;
  removeFromWatchlist: (symbol: string) => void;
  updateStockData: (symbol: string, data: StockData) => void;
  
  // Settings
  userSettings: {
    name: string;
    email: string;
    location: string;
    notifications: boolean;
  };
  updateUserSettings: (settings: Partial<DashboardContextType['userSettings']>) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [widgets, setWidgets] = useState<Widget[]>([
    { id: 'weather', name: 'Weather', type: 'weather', position: { x: 0, y: 0 }, size: { width: 2, height: 1 }, visible: true },
    { id: 'tasks', name: 'Tasks', type: 'tasks', position: { x: 2, y: 0 }, size: { width: 2, height: 1 }, visible: true },
    { id: 'news', name: 'News', type: 'news', position: { x: 0, y: 1 }, size: { width: 3, height: 1 }, visible: true },
    { id: 'stocks', name: 'Stocks', type: 'stocks', position: { x: 3, y: 1 }, size: { width: 1, height: 1 }, visible: true },
    { id: 'calendar', name: 'Calendar', type: 'calendar', position: { x: 0, y: 2 }, size: { width: 2, height: 1 }, visible: true },
    { id: 'analytics', name: 'Analytics', type: 'analytics', position: { x: 2, y: 2 }, size: { width: 2, height: 1 }, visible: true },
  ]);
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [selectedNewsCategory, setSelectedNewsCategory] = useState('general');
  const [watchlist, setWatchlist] = useState<string[]>(['AAPL', 'GOOGL', 'MSFT', 'TSLA']);
  const [stockData, setStockData] = useState<Record<string, StockData>>({});
  const [userSettings, setUserSettings] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    location: 'New York, NY',
    notifications: true,
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    const savedTasks = localStorage.getItem('tasks');
    const savedUserSettings = localStorage.getItem('userSettings');
    const savedWatchlist = localStorage.getItem('watchlist');
    
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    if (savedUserSettings) {
      setUserSettings(JSON.parse(savedUserSettings));
    }
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Save user settings to localStorage
  useEffect(() => {
    localStorage.setItem('userSettings', JSON.stringify(userSettings));
  }, [userSettings]);

  // Save watchlist to localStorage
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const updateWidget = (id: string, updates: Partial<Widget>) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === id ? { ...widget, ...updates } : widget
    ));
  };

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const addToWatchlist = (symbol: string) => {
    if (!watchlist.includes(symbol)) {
      setWatchlist(prev => [...prev, symbol]);
    }
  };

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(prev => prev.filter(s => s !== symbol));
  };

  const updateStockData = (symbol: string, data: StockData) => {
    setStockData(prev => ({ ...prev, [symbol]: data }));
  };

  const updateUserSettings = (settings: Partial<DashboardContextType['userSettings']>) => {
    setUserSettings(prev => ({ ...prev, ...settings }));
  };

  const value: DashboardContextType = {
    darkMode,
    toggleDarkMode,
    widgets,
    updateWidget,
    tasks,
    addTask,
    updateTask,
    deleteTask,
    weather,
    setWeather,
    news,
    setNews,
    selectedNewsCategory,
    setSelectedNewsCategory,
    watchlist,
    stockData,
    addToWatchlist,
    removeFromWatchlist,
    updateStockData,
    userSettings,
    updateUserSettings,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
