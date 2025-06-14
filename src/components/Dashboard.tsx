
import React, { useState } from 'react';
import { Sidebar } from './layout/Sidebar';
import { Header } from './layout/Header';
import { WeatherWidget } from './widgets/WeatherWidget';
import { TaskWidget } from './widgets/TaskWidget';
import { NewsWidget } from './widgets/NewsWidget';
import { StockWidget } from './widgets/StockWidget';
import { CalendarWidget } from './widgets/CalendarWidget';
import { AnalyticsWidget } from './widgets/AnalyticsWidget';
import { useDashboard } from '../context/DashboardContext';

export const Dashboard: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const { widgets } = useDashboard();

  const getWidgetComponent = (type: string) => {
    switch (type) {
      case 'weather':
        return <WeatherWidget />;
      case 'tasks':
        return <TaskWidget />;
      case 'news':
        return <NewsWidget />;
      case 'stocks':
        return <StockWidget />;
      case 'calendar':
        return <CalendarWidget />;
      case 'analytics':
        return <AnalyticsWidget />;
      default:
        return null;
    }
  };

  const getGridSpan = (size: { width: number; height: number }) => {
    return `col-span-1 md:col-span-${Math.min(size.width, 2)} lg:col-span-${Math.min(size.width, 3)} xl:col-span-${Math.min(size.width, 4)}`;
  };

  const visibleWidgets = widgets.filter(widget => widget.visible);

  return (
    <div className="min-h-screen bg-background flex w-full">
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
        <main className="flex-1 p-6">
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              {/* Welcome Section */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
                <p className="text-muted-foreground">
                  Here's what's happening with your personal dashboard today.
                </p>
              </div>

              {/* Widgets Grid */}
              <div className="grid-layout">
                {visibleWidgets.map((widget) => (
                  <div
                    key={widget.id}
                    className={`${getGridSpan(widget.size)} min-h-[400px]`}
                  >
                    {getWidgetComponent(widget.type)}
                  </div>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-card rounded-lg p-6 border border-border">
                  <h3 className="text-sm font-medium text-muted-foreground">Total Widgets</h3>
                  <p className="text-2xl font-bold">{visibleWidgets.length}</p>
                </div>
                <div className="bg-card rounded-lg p-6 border border-border">
                  <h3 className="text-sm font-medium text-muted-foreground">Active Today</h3>
                  <p className="text-2xl font-bold text-green-600">6</p>
                </div>
                <div className="bg-card rounded-lg p-6 border border-border">
                  <h3 className="text-sm font-medium text-muted-foreground">Data Sources</h3>
                  <p className="text-2xl font-bold text-blue-600">4</p>
                </div>
                <div className="bg-card rounded-lg p-6 border border-border">
                  <h3 className="text-sm font-medium text-muted-foreground">Last Updated</h3>
                  <p className="text-2xl font-bold text-orange-600">2m</p>
                </div>
              </div>
            </div>
          )}

          {/* Individual Widget Views */}
          {activeSection !== 'dashboard' && (
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2 capitalize">{activeSection}</h2>
                <p className="text-muted-foreground">
                  Detailed view of your {activeSection} data.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {visibleWidgets
                  .filter(widget => widget.type === activeSection || activeSection === 'dashboard')
                  .map((widget) => (
                    <div key={widget.id} className="min-h-[400px]">
                      {getWidgetComponent(widget.type)}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
