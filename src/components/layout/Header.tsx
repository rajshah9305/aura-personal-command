
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
  Bell,
  Command
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ sidebarCollapsed, onToggleSidebar }) => {
  const { darkMode, toggleDarkMode, userSettings } = useDashboard();
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-card/50 backdrop-blur-xl border-b border-border/50 px-6 py-4 relative"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      
      <div className="flex items-center justify-between relative z-10">
        {/* Left section */}
        <div className="flex items-center gap-6">
          <motion.button
            onClick={onToggleSidebar}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 hover:bg-accent/50 rounded-xl transition-all duration-300 group"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <motion.div
              animate={{ rotate: sidebarCollapsed ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-5 h-5 group-hover:text-primary transition-colors" />
              ) : (
                <ChevronLeft className="w-5 h-5 group-hover:text-primary transition-colors" />
              )}
            </motion.div>
          </motion.button>
          
          <div className="hidden md:block">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Personal Dashboard
              </h1>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <motion.span
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block w-2 h-2 bg-green-500 rounded-full"
                />
                {getCurrentGreeting()}, {userSettings.name}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Center section - Enhanced Search */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex-1 max-w-2xl mx-8"
        >
          <div className="relative group">
            <div className={`
              relative flex items-center bg-background/50 backdrop-blur-sm border rounded-2xl
              transition-all duration-300 overflow-hidden
              ${searchFocused 
                ? 'border-primary/50 shadow-lg shadow-primary/10 scale-[1.02]' 
                : 'border-border/50 hover:border-border'
              }
            `}>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <Search className={`
                ml-4 w-5 h-5 transition-all duration-300 relative z-10
                ${searchFocused ? 'text-primary' : 'text-muted-foreground'}
              `} />
              
              <input
                type="text"
                placeholder="Search widgets, tasks, or use ⌘K for quick actions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full px-4 py-3 bg-transparent focus:outline-none text-sm placeholder:text-muted-foreground/60 relative z-10"
              />
              
              <div className="flex items-center gap-1 mr-4 relative z-10">
                <kbd className="px-2 py-1 text-xs bg-muted/50 border border-border/50 rounded-md font-mono">
                  <Command className="w-3 h-3 inline mr-1" />K
                </kbd>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-center gap-2"
        >
          {/* Theme toggle */}
          <motion.button
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 hover:bg-accent/50 rounded-xl transition-all duration-300 group relative overflow-hidden"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div
              animate={{ rotate: darkMode ? 180 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500 relative z-10" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600 relative z-10" />
              )}
            </motion.div>
          </motion.button>

          {/* Settings */}
          <motion.button
            whileHover={{ scale: 1.05, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="p-3 hover:bg-accent/50 rounded-xl transition-all duration-300 group"
            title="Settings"
          >
            <Settings className="w-5 h-5 group-hover:text-primary transition-colors" />
          </motion.button>

          {/* Notifications */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <button className="p-3 hover:bg-accent/50 rounded-xl transition-all duration-300 relative group">
              <Bell className="w-5 h-5 group-hover:text-primary transition-colors" />
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs flex items-center justify-center"
              >
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              </motion.span>
            </button>
          </motion.div>

          {/* Profile menu */}
          <div className="relative">
            <motion.button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 p-2 hover:bg-accent/50 rounded-xl transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="hidden lg:inline text-sm font-medium group-hover:text-primary transition-colors">
                {userSettings.name}
              </span>
            </motion.button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-3 w-64 bg-popover/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl py-2 z-50 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="px-4 py-3 border-b border-border/50 relative z-10">
                    <p className="font-semibold text-foreground">{userSettings.name}</p>
                    <p className="text-sm text-muted-foreground">{userSettings.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full"></div>
                      <span className="text-xs text-emerald-600 font-medium">Premium Active</span>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    {[
                      { label: 'Profile Settings', icon: User },
                      { label: 'Preferences', icon: Settings },
                      { label: 'Dashboard', icon: LayoutDashboard }
                    ].map((item, index) => (
                      <motion.button
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.2 }}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-accent/50 transition-all duration-200 flex items-center gap-3 group"
                      >
                        <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="group-hover:text-primary transition-colors">{item.label}</span>
                      </motion.button>
                    ))}
                    
                    <div className="h-px bg-border/50 my-2" />
                    
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15, duration: 0.2 }}
                      className="w-full text-left px-4 py-3 text-sm text-destructive hover:bg-destructive/10 transition-all duration-200 flex items-center gap-3"
                    >
                      <User className="w-4 h-4" />
                      Sign Out
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};
