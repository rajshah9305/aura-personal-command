
import React, { useState } from 'react';
import { Header } from './layout/Header';
import { Sidebar } from './layout/Sidebar';
import { WeatherWidget } from './widgets/WeatherWidget';
import { TaskWidget } from './widgets/TaskWidget';
import { NewsWidget } from './widgets/NewsWidget';
import { StockWidget } from './widgets/StockWidget';
import { CalendarWidget } from './widgets/CalendarWidget';
import { AnalyticsWidget } from './widgets/AnalyticsWidget';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { useDashboard } from '../context/DashboardContext';

export const Dashboard: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const { widgets } = useDashboard();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'settings':
        return <SettingsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'tasks':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Task Management</h2>
            <TaskWidget />
          </div>
        );
      case 'calendar':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Calendar</h2>
            <CalendarWidget />
          </div>
        );
      case 'weather':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Weather Forecast</h2>
            <WeatherWidget />
          </div>
        );
      case 'stocks':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Stock Market</h2>
            <StockWidget />
          </div>
        );
      case 'news':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Latest News</h2>
            <NewsWidget />
          </div>
        );
      case 'analytics':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>
            <AnalyticsWidget />
          </div>
        );
      default:
        return (
          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Welcome to Your Dashboard</h2>
              <p className="text-muted-foreground">Here's an overview of your personal information and widgets.</p>
            </div>
            
            <div className="grid-layout">
              {widgets.filter(widget => widget.visible).map((widget) => {
                switch (widget.type) {
                  case 'weather':
                    return <WeatherWidget key={widget.id} />;
                  case 'tasks':
                    return <TaskWidget key={widget.id} />;
                  case 'news':
                    return <NewsWidget key={widget.id} />;
                  case 'stocks':
                    return <StockWidget key={widget.id} />;
                  case 'calendar':
                    return <CalendarWidget key={widget.id} />;
                  case 'analytics':
                    return <AnalyticsWidget key={widget.id} />;
                  default:
                    return null;
                }
              })}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <div className="flex-1 flex flex-col">
        <Header
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={toggleSidebar}
        />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};
