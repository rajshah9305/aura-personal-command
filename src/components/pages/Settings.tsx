
import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Lock, Download, Upload, Palette, Monitor, Smartphone, Globe, Shield, Database, Trash2 } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';

export const Settings: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDashboard();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    taskReminders: true,
    weeklyReports: false,
    marketAlerts: true,
    newsUpdates: false,
    systemAlerts: true,
    promotions: false
  });

  const [preferences, setPreferences] = useState({
    compactView: false,
    autoRefresh: true,
    showWelcomeMessage: true,
    enableAnimations: true,
    defaultView: 'dashboard',
    language: 'en-US',
    timeFormat: '12h',
    dateFormat: 'MM/DD/YYYY',
    timezone: 'America/New_York'
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    activityTracking: true,
    dataCollection: true,
    marketingEmails: false,
    analyticsSharing: true
  });

  const handleExportData = () => {
    const data = {
      preferences,
      notifications,
      privacy,
      settings: { darkMode },
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard-settings.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-2">
          Application Settings
        </h2>
        <p className="text-muted-foreground">
          Configure your application preferences, notifications, and privacy settings.
        </p>
      </div>

      <div className="flex-1 space-y-6">
        {/* Appearance Settings */}
        <div className="widget-card p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Appearance & Display
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
              <div>
                <h4 className="font-medium">Dark Mode</h4>
                <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
            </div>

            <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
              <div>
                <h4 className="font-medium">Compact View</h4>
                <p className="text-sm text-muted-foreground">Show more content in less space</p>
              </div>
              <Switch 
                checked={preferences.compactView}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, compactView: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
              <div>
                <h4 className="font-medium">Enable Animations</h4>
                <p className="text-sm text-muted-foreground">Smooth transitions and effects</p>
              </div>
              <Switch 
                checked={preferences.enableAnimations}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, enableAnimations: checked }))}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-background border border-border rounded-lg">
                <h4 className="font-medium mb-2">Default Dashboard View</h4>
                <select 
                  value={preferences.defaultView}
                  onChange={(e) => setPreferences(prev => ({ ...prev, defaultView: e.target.value }))}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="dashboard">Dashboard Overview</option>
                  <option value="tasks">Tasks</option>
                  <option value="calendar">Calendar</option>
                  <option value="analytics">Analytics</option>
                </select>
              </div>

              <div className="p-4 bg-background border border-border rounded-lg">
                <h4 className="font-medium mb-2">Language</h4>
                <select 
                  value={preferences.language}
                  onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="en-US">English (US)</option>
                  <option value="en-UK">English (UK)</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="widget-card p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications & Alerts
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch 
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
              <div>
                <h4 className="font-medium">Push Notifications</h4>
                <p className="text-sm text-muted-foreground">Browser push notifications</p>
              </div>
              <Switch 
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
              <div>
                <h4 className="font-medium">Task Reminders</h4>
                <p className="text-sm text-muted-foreground">Get reminded about upcoming tasks</p>
              </div>
              <Switch 
                checked={notifications.taskReminders}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, taskReminders: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
              <div>
                <h4 className="font-medium">System Alerts</h4>
                <p className="text-sm text-muted-foreground">Important system notifications</p>
              </div>
              <Switch 
                checked={notifications.systemAlerts}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, systemAlerts: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
              <div>
                <h4 className="font-medium">Market Alerts</h4>
                <p className="text-sm text-muted-foreground">Stock market updates and alerts</p>
              </div>
              <Switch 
                checked={notifications.marketAlerts}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, marketAlerts: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
              <div>
                <h4 className="font-medium">Weekly Reports</h4>
                <p className="text-sm text-muted-foreground">Weekly productivity summary</p>
              </div>
              <Switch 
                checked={notifications.weeklyReports}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, weeklyReports: checked }))}
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="widget-card p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Security & Privacy
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-background border border-border rounded-lg">
              <h4 className="font-medium mb-2">Change Password</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="password"
                  placeholder="Current password"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  type="password"
                  placeholder="New password"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button className="mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Update Password
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">Add extra security</p>
                </div>
                <button className="px-3 py-1 bg-secondary rounded-lg hover:bg-accent transition-colors">
                  Enable
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
                <div>
                  <h4 className="font-medium">Activity Tracking</h4>
                  <p className="text-sm text-muted-foreground">Track usage patterns</p>
                </div>
                <Switch 
                  checked={privacy.activityTracking}
                  onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, activityTracking: checked }))}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="widget-card p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Database className="w-5 h-5" />
            Data Management
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-background border border-border rounded-lg">
              <h4 className="font-medium mb-2">Export Data</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Download your settings and preferences
              </p>
              <button
                onClick={handleExportData}
                className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-accent transition-colors"
              >
                <Download className="w-4 h-4" />
                Export Settings
              </button>
            </div>

            <div className="p-4 bg-background border border-border rounded-lg">
              <h4 className="font-medium mb-2">Import Settings</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Import settings from a backup file
              </p>
              <button className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-accent transition-colors">
                <Upload className="w-4 h-4" />
                Import Settings
              </button>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
            <h4 className="font-medium text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Reset Settings
            </h4>
            <p className="text-sm text-red-700 dark:text-red-300 mb-3">
              Reset all settings to their default values. This action cannot be undone.
            </p>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Reset All Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
