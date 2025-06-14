
import React from 'react';
import { 
  LayoutDashboard,
  Calendar,
  List,
  TrendingUp,
  CloudSun,
  FileText,
  Settings,
  User,
  Sparkles
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  collapsed: boolean;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, gradient: 'from-blue-500 to-purple-600' },
  { id: 'tasks', label: 'Tasks', icon: List, gradient: 'from-green-500 to-teal-600' },
  { id: 'calendar', label: 'Calendar', icon: Calendar, gradient: 'from-orange-500 to-red-600' },
  { id: 'weather', label: 'Weather', icon: CloudSun, gradient: 'from-cyan-500 to-blue-600' },
  { id: 'stocks', label: 'Stocks', icon: TrendingUp, gradient: 'from-emerald-500 to-green-600' },
  { id: 'news', label: 'News', icon: FileText, gradient: 'from-violet-500 to-purple-600' },
  { id: 'analytics', label: 'Analytics', icon: LayoutDashboard, gradient: 'from-pink-500 to-rose-600' },
  { id: 'profile', label: 'Profile', icon: User, gradient: 'from-indigo-500 to-blue-600' },
  { id: 'settings', label: 'Settings', icon: Settings, gradient: 'from-gray-500 to-slate-600' },
];

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, activeSection, onSectionChange }) => {
  const { darkMode } = useDashboard();

  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 }
  };

  const itemVariants = {
    expanded: { justifyContent: 'flex-start', paddingLeft: 16, paddingRight: 16 },
    collapsed: { justifyContent: 'center', paddingLeft: 8, paddingRight: 8 }
  };

  return (
    <motion.div
      variants={sidebarVariants}
      animate={collapsed ? 'collapsed' : 'expanded'}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="bg-sidebar-background border-r border-sidebar-border backdrop-blur-xl flex flex-col h-full relative overflow-hidden"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="p-6 border-b border-sidebar-border/50 relative z-10"
      >
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg"
          >
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </motion.div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="font-bold text-lg text-sidebar-foreground">AI Dashboard</h1>
                <p className="text-xs text-sidebar-foreground/60 font-medium">Premium Experience</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 p-4 relative z-10">
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-2"
        >
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
              >
                <motion.button
                  onClick={() => onSectionChange(item.id)}
                  variants={itemVariants}
                  animate={collapsed ? 'collapsed' : 'expanded'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    w-full flex items-center gap-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden group
                    ${isActive 
                      ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/20 shadow-lg shadow-primary/10' 
                      : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-white/5'
                    }
                  `}
                  title={collapsed ? item.label : undefined}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {/* Icon container with gradient background for active state */}
                  <div className={`
                    relative flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300
                    ${isActive ? `bg-gradient-to-br ${item.gradient} shadow-md` : 'group-hover:bg-white/10'}
                  `}>
                    <Icon className={`
                      w-5 h-5 transition-all duration-300
                      ${isActive ? 'text-white' : 'text-current'}
                    `} />
                  </div>
                  
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="font-medium text-sm"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </motion.li>
            );
          })}
        </motion.ul>
      </nav>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="p-4 border-t border-sidebar-border/50 relative z-10"
      >
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center border border-primary/20"
          >
            <User className="w-5 h-5 text-primary" />
          </motion.div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-semibold text-sidebar-foreground truncate">John Doe</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-pulse"></div>
                  <p className="text-xs text-sidebar-foreground/60 truncate">Premium User</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};
