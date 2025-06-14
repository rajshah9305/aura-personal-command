
import React, { useState } from 'react';
import { 
  Search,
  Settings,
  User,
  Sun,
  Moon,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  LogOut,
  UserCircle
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface HeaderProps {
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ sidebarCollapsed, onToggleSidebar }) => {
  const { darkMode, toggleDarkMode, userSettings } = useDashboard();
  const [searchQuery, setSearchQuery] = useState('');

  const handleProfileClick = () => {
    // Navigate to profile page - will be handled by the Dashboard component
    window.dispatchEvent(new CustomEvent('navigate-to-profile'));
  };

  const handleSettingsClick = () => {
    // Navigate to settings page - will be handled by the Dashboard component
    window.dispatchEvent(new CustomEvent('navigate-to-settings'));
  };

  const handleDashboardClick = () => {
    // Navigate back to dashboard
    window.dispatchEvent(new CustomEvent('navigate-to-dashboard'));
  };

  return (
    <header className="bg-card border-b border-border px-6 py-4 sticky top-0 z-40 backdrop-blur-md">
      <div className="flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-accent rounded-lg transition-colors hover:scale-105 duration-200"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
          
          <div className="hidden md:block">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Personal Dashboard
            </h1>
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
              className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 hover:border-primary/50"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {/* Dashboard quick access */}
          <button
            onClick={handleDashboardClick}
            className="p-2 hover:bg-accent rounded-lg transition-all duration-200 hover:scale-105 relative"
            title="Dashboard Overview"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
          </button>

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium">{userSettings.name}</div>
                  <div className="text-xs text-muted-foreground">{userSettings.email}</div>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-popover border border-border shadow-lg">
              <div className="px-3 py-2 border-b border-border">
                <p className="font-medium">{userSettings.name}</p>
                <p className="text-sm text-muted-foreground">{userSettings.email}</p>
              </div>
              
              <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer hover:bg-accent transition-colors">
                <UserCircle className="w-4 h-4 mr-2" />
                My Profile
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={handleSettingsClick} className="cursor-pointer hover:bg-accent transition-colors">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={toggleDarkMode} className="cursor-pointer hover:bg-accent transition-colors">
                {darkMode ? (
                  <>
                    <Sun className="w-4 h-4 mr-2" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 mr-2" />
                    Dark Mode
                  </>
                )}
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem className="cursor-pointer hover:bg-accent transition-colors text-destructive focus:text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
