
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
import { TrendingUp, CheckCircle, Clock, Activity, Sparkles, Star, Zap, Target } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex w-full overflow-hidden">
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
        <main className="flex-1 p-8 overflow-y-auto">
          {activeSection === 'dashboard' && (
            <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
              {/* Welcome Section */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 mb-4">
                  <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
                  <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                    {getGreeting()}, {userSettings.name.split(' ')[0]}!
                  </h1>
                  <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
                </div>
                <p className="text-xl text-slate-600 font-medium">
                  Ready to conquer today? Your productivity dashboard awaits.
                </p>
                
                {/* Progress indicator */}
                <div className="mt-6 flex items-center justify-center gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-600">Daily Progress</span>
                    <div className="w-32 bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-1000 ease-out shadow-sm"
                        style={{ width: `${completionRate}%` }}
                      ></div>
                    </div>
                    <span className="text-lg font-bold text-slate-700">{completionRate}%</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Quick Stats - Symmetrical Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
                  <div className="relative z-10 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-blue-100 text-sm font-medium">Active Widgets</p>
                        <p className="text-3xl font-bold">{visibleWidgets.length}</p>
                      </div>
                      <Activity className="w-8 h-8 text-blue-200 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="text-xs text-blue-100 flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      All systems running smoothly
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
                  <div className="relative z-10 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-green-100 text-sm font-medium">Completed Tasks</p>
                        <p className="text-3xl font-bold">{completedTasks}</p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-green-200 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="text-xs text-green-100 flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      +{Math.floor(Math.random() * 3) + 1} from yesterday
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-amber-600 to-yellow-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
                  <div className="relative z-10 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-orange-100 text-sm font-medium">Pending Tasks</p>
                        <p className="text-3xl font-bold">{pendingTasks}</p>
                      </div>
                      <Clock className="w-8 h-8 text-orange-200 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="text-xs text-orange-100 flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      {pendingTasks > 0 ? 'Focus time!' : 'All caught up! 🎉'}
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
                  <div className="relative z-10 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-purple-100 text-sm font-medium">Productivity</p>
                        <p className="text-3xl font-bold">{Math.min(100, 75 + completionRate * 0.25).toFixed(0)}%</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-purple-200 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="text-xs text-purple-100 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Above average performance
                    </div>
                  </div>
                </div>
              </div>

              {/* Widgets Grid - Symmetrical Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {visibleWidgets.map((widget, index) => (
                  <div
                    key={widget.id}
                    className="min-h-[500px] animate-fade-in hover:scale-[1.02] transition-all duration-300"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    {getWidgetComponent(widget.type)}
                  </div>
                ))}
              </div>

              {/* Enhanced Motivational Footer */}
              <div className="mt-16 relative">
                <div className="text-center p-8 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl border border-indigo-200/50 backdrop-blur-sm hover:border-indigo-300/70 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-50"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Sparkles className="w-6 h-6 text-indigo-500 animate-pulse" />
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Keep up the great work!
                      </h3>
                      <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
                    </div>
                    <p className="text-lg text-slate-600 transition-all duration-1000 ease-in-out max-w-2xl mx-auto leading-relaxed">
                      {motivationalMessages[currentMotivationIndex]}
                    </p>
                    <div className="mt-6 flex justify-center gap-2">
                      {motivationalMessages.map((_, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full transition-all duration-500 ${
                            index === currentMotivationIndex 
                              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 scale-125 shadow-lg' 
                              : 'bg-slate-300 hover:bg-slate-400'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
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
