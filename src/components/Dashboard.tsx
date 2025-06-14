
import React, { useState, useEffect } from 'react';
import { Sidebar } from './layout/Sidebar';
import { Header } from './layout/Header';
import { WeatherWidget } from './widgets/WeatherWidget';
import { EnhancedTaskWidget } from './widgets/EnhancedTaskWidget';
import { NewsWidget } from './widgets/NewsWidget';
import { StockWidget } from './widgets/StockWidget';
import { EnhancedCalendarWidget } from './widgets/EnhancedCalendarWidget';
import { AnalyticsWidget } from './widgets/AnalyticsWidget';
import { FullScreenCalendar } from './pages/FullScreenCalendar';
import { FullScreenTasks } from './pages/FullScreenTasks';
import { FullScreenNews } from './pages/FullScreenNews';
import { FullScreenStocks } from './pages/FullScreenStocks';
import { FullScreenAnalytics } from './pages/FullScreenAnalytics';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { useDashboard } from '../context/DashboardContext';
import { TrendingUp, CheckCircle, Clock, Activity, Sparkles } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [currentMotivationIndex, setCurrentMotivationIndex] = useState(0);
  const { widgets, tasks, userSettings } = useDashboard();

  const motivationalMessages = [
    "You're doing amazing! Every small step counts towards your bigger goals.",
    "Keep up the fantastic work! Your productivity is inspiring.",
    "Today is full of possibilities. Let's make it count!",
    "Your dedication is paying off. Stay focused and keep going!",
    "Progress, not perfection. You're on the right track!",
    "Success is the sum of small efforts repeated day in and day out.",
    "Believe in yourself and all that you are capable of achieving.",
    "Great things never come from comfort zones. Keep pushing forward!"
  ];

  // Handle navigation events from header and sidebar
  useEffect(() => {
    const handleProfileNavigation = () => setActiveSection('profile');
    const handleSettingsNavigation = () => setActiveSection('settings');
    const handleDashboardNavigation = () => setActiveSection('dashboard');
    const handleSectionNavigation = (event: CustomEvent) => {
      setActiveSection(event.detail);
    };

    window.addEventListener('navigate-to-profile', handleProfileNavigation);
    window.addEventListener('navigate-to-settings', handleSettingsNavigation);
    window.addEventListener('navigate-to-dashboard', handleDashboardNavigation);
    window.addEventListener('navigate-to-section', handleSectionNavigation as EventListener);

    return () => {
      window.removeEventListener('navigate-to-profile', handleProfileNavigation);
      window.removeEventListener('navigate-to-settings', handleSettingsNavigation);
      window.removeEventListener('navigate-to-dashboard', handleDashboardNavigation);
      window.removeEventListener('navigate-to-section', handleSectionNavigation as EventListener);
    };
  }, []);

  // Slower rotation of motivational messages (every 8 seconds instead of random)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMotivationIndex(prev => (prev + 1) % motivationalMessages.length);
    }, 8000); // Changed from random to 8 seconds

    return () => clearInterval(interval);
  }, [motivationalMessages.length]);

  const getWidgetComponent = (type: string) => {
    switch (type) {
      case 'weather':
        return <WeatherWidget />;
      case 'tasks':
        return <EnhancedTaskWidget />;
      case 'news':
        return <NewsWidget />;
      case 'stocks':
        return <StockWidget />;
      case 'calendar':
        return <EnhancedCalendarWidget />;
      case 'analytics':
        return <AnalyticsWidget />;
      default:
        return null;
    }
  };

  const getFullScreenComponent = () => {
    switch (activeSection) {
      case 'calendar':
        return <FullScreenCalendar />;
      case 'tasks':
        return <FullScreenTasks />;
      case 'news':
        return <FullScreenNews />;
      case 'stocks':
        return <FullScreenStocks />;
      case 'analytics':
        return <FullScreenAnalytics />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      default:
        return null;
    }
  };

  const getGridSpan = (size: { width: number; height: number }) => {
    return `col-span-1 md:col-span-${Math.min(size.width, 2)} lg:col-span-${Math.min(size.width, 3)} xl:col-span-${Math.min(size.width, 4)}`;
  };

  const visibleWidgets = widgets.filter(widget => widget.visible);
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-background flex w-full overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        collapsed={sidebarCollapsed}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header 
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {activeSection === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              {/* Welcome Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
                      {getGreeting()}, {userSettings.name.split(' ')[0]}! 
                      <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                    </h2>
                    <p className="text-muted-foreground mt-1 text-lg">
                      Ready to make today productive? Here's your dashboard overview.
                    </p>
                  </div>
                  <div className="hidden md:flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Today's Progress</div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-muted rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${completionRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{completionRate}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Active Widgets</p>
                      <p className="text-2xl font-bold">{visibleWidgets.length}</p>
                    </div>
                    <Activity className="w-8 h-8 text-blue-200" />
                  </div>
                  <div className="mt-2 text-xs text-blue-100">
                    All systems running smoothly
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Completed Tasks</p>
                      <p className="text-2xl font-bold">{completedTasks}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-200" />
                  </div>
                  <div className="mt-2 text-xs text-green-100">
                    +{Math.floor(Math.random() * 3) + 1} from yesterday
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Pending Tasks</p>
                      <p className="text-2xl font-bold">{pendingTasks}</p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-200" />
                  </div>
                  <div className="mt-2 text-xs text-orange-100">
                    {pendingTasks > 0 ? 'Focus time!' : 'All caught up! 🎉'}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Productivity</p>
                      <p className="text-2xl font-bold">{Math.min(100, 75 + completionRate * 0.25).toFixed(0)}%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-purple-200" />
                  </div>
                  <div className="mt-2 text-xs text-purple-100">
                    Above average performance
                  </div>
                </div>
              </div>

              {/* Widgets Grid */}
              <div className="grid-layout">
                {visibleWidgets.map((widget, index) => (
                  <div
                    key={widget.id}
                    className={`${getGridSpan(widget.size)} min-h-[400px] animate-fade-in hover:scale-[1.02] transition-all duration-300 hover:shadow-lg`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {getWidgetComponent(widget.type)}
                  </div>
                ))}
              </div>

              {/* Enhanced Motivational Footer with slower rotation */}
              <div className="mt-8 text-center p-6 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300">
                <h3 className="text-lg font-semibold mb-2 flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Keep up the great work!
                  <Sparkles className="w-5 h-5 text-primary" />
                </h3>
                <p className="text-muted-foreground transition-all duration-1000 ease-in-out">
                  {motivationalMessages[currentMotivationIndex]}
                </p>
                <div className="mt-3 flex justify-center gap-1">
                  {motivationalMessages.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentMotivationIndex ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Full Screen Views */}
          {activeSection !== 'dashboard' && (
            <div className="h-full animate-fade-in">
              {getFullScreenComponent()}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
