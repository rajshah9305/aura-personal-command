
import React from 'react';
import { 
  layout-dashboard as LayoutDashboard,
  calendar as Calendar,
  list as List,
  trending-up as TrendingUp,
  cloud-sun as CloudSun,
  file-text as FileText,
  settings as Settings,
  user as User
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

interface SidebarProps {
  collapsed: boolean;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'tasks', label: 'Tasks', icon: List },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'weather', label: 'Weather', icon: CloudSun },
  { id: 'stocks', label: 'Stocks', icon: TrendingUp },
  { id: 'news', label: 'News', icon: FileText },
  { id: 'analytics', label: 'Analytics', icon: LayoutDashboard },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, activeSection, onSectionChange }) => {
  const { darkMode } = useDashboard();

  return (
    <div className={`
      ${collapsed ? 'w-16' : 'w-64'} 
      bg-sidebar-background border-r border-sidebar-border 
      transition-all duration-300 ease-in-out
      flex flex-col h-full
    `}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-bold text-sidebar-foreground">AI Dashboard</h1>
              <p className="text-xs text-sidebar-foreground/60">Personal Assistant</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`
                    w-full sidebar-item
                    ${activeSection === item.id ? 'active' : ''}
                    ${collapsed ? 'justify-center px-2' : ''}
                  `}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">Premium User</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
