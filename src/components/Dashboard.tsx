
import React, { useState, useEffect } from 'react';
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
import { motion, AnimatePresence } from 'framer-motion';

export const Dashboard: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isLoaded, setIsLoaded] = useState(false);
  const { widgets } = useDashboard();

  useEffect(() => {
    // Add a subtle loading delay for better perceived performance
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const renderContent = () => {
    const contentMap = {
      'settings': <SettingsPage />,
      'profile': <ProfilePage />,
      'tasks': (
        <div className="p-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between"
          >
            <div>
              <h2 className="text-4xl font-bold text-gradient mb-2">Task Management</h2>
              <p className="text-muted-foreground text-lg">Organize and track your productivity</p>
            </div>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
            >
              <div className="w-6 h-6 rounded-full bg-primary/20"></div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <TaskWidget />
          </motion.div>
        </div>
      ),
      'calendar': (
        <div className="p-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between"
          >
            <div>
              <h2 className="text-4xl font-bold text-gradient mb-2">Calendar</h2>
              <p className="text-muted-foreground text-lg">Plan your schedule and events</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <CalendarWidget />
          </motion.div>
        </div>
      ),
      'weather': (
        <div className="p-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gradient mb-2">Weather Forecast</h2>
            <p className="text-muted-foreground text-lg">Stay updated with weather conditions</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <WeatherWidget />
          </motion.div>
        </div>
      ),
      'stocks': (
        <div className="p-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gradient mb-2">Stock Market</h2>
            <p className="text-muted-foreground text-lg">Track your investments and market trends</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <StockWidget />
          </motion.div>
        </div>
      ),
      'news': (
        <div className="p-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gradient mb-2">Latest News</h2>
            <p className="text-muted-foreground text-lg">Stay informed with current events</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <NewsWidget />
          </motion.div>
        </div>
      ),
      'analytics': (
        <div className="p-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gradient mb-2">Analytics Dashboard</h2>
            <p className="text-muted-foreground text-lg">Insights and performance metrics</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <AnalyticsWidget />
          </motion.div>
        </div>
      ),
      'dashboard': (
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12 text-center"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl font-bold text-gradient mb-4"
            >
              Welcome to Your Dashboard
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Your personalized command center for productivity, insights, and seamless workflow management.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8 flex justify-center space-x-4"
            >
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-medium">All systems operational</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-secondary/50 border border-border">
                <span className="text-sm font-medium">{widgets.filter(w => w.visible).length} active widgets</span>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid-layout"
          >
            {widgets.filter(widget => widget.visible).map((widget, index) => {
              const WidgetComponent = {
                'weather': WeatherWidget,
                'tasks': TaskWidget,
                'news': NewsWidget,
                'stocks': StockWidget,
                'calendar': CalendarWidget,
                'analytics': AnalyticsWidget,
              }[widget.type];

              return WidgetComponent ? (
                <motion.div
                  key={widget.id}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  className="h-full"
                >
                  <WidgetComponent />
                </motion.div>
              ) : null;
            })}
          </motion.div>
        </div>
      )
    };

    return contentMap[activeSection] || contentMap['dashboard'];
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full mx-auto"
          />
          <p className="text-muted-foreground font-medium">Loading your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-background to-muted/20">
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
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
