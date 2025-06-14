
import React, { useState } from 'react';
import { 
  search as Search,
  settings as Settings,
  user as User,
  sun as Sun,
  layout-dashboard as LayoutDashboard,
  chevron-left as ChevronLeft,
  chevron-right as ChevronRight
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

interface HeaderProps {
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ sidebarCollapsed, onToggleSidebar }) => {
  const { darkMode, toggleDarkMode, userSettings } = useDashboard();
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
          
          <div className="hidden md:block">
            <h1 className="text-2xl font-bold text-foreground">Personal Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back, {userSettings.name}
            </p>
          </div>
        </div>

        {/* Center section - Search */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search widgets, tasks, or commands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <Sun className="w-5 h-5" />
          </button>

          {/* Settings */}
          <button
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button className="p-2 hover:bg-accent rounded-lg transition-colors relative">
              <LayoutDashboard className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs"></span>
            </button>
          </div>

          {/* Profile menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="hidden md:inline text-sm font-medium">{userSettings.name}</span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-border">
                  <p className="font-medium">{userSettings.name}</p>
                  <p className="text-sm text-muted-foreground">{userSettings.email}</p>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors">
                  Profile Settings
                </button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors">
                  Preferences
                </button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors text-destructive">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
