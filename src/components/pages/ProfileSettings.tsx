
import React, { useState } from 'react';
import { User, Settings, Bell, Lock, Palette, Download, Upload, Save, Camera } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';

export const ProfileSettings: React.FC = () => {
  const { userSettings, updateUserSettings, darkMode, toggleDarkMode } = useDashboard();
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'notifications' | 'security' | 'data'>('profile');
  const [tempSettings, setTempSettings] = useState(userSettings);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    taskReminders: true,
    weeklyReports: false,
    marketAlerts: true,
    newsUpdates: false
  });

  const handleSaveProfile = () => {
    updateUserSettings(tempSettings);
    // Show success message
  };

  const handleExportData = () => {
    const data = {
      profile: userSettings,
      settings: { darkMode, notifications },
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dashboard-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'data', label: 'Data & Privacy', icon: Download }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-2">
          Settings & Profile
        </h2>
        <p className="text-muted-foreground">
          Manage your account, preferences, and personal settings.
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="widget-card p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="widget-card p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
                  
                  {/* Profile Picture */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
                      {userSettings.name.charAt(0)}
                    </div>
                    <div>
                      <button className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg hover:bg-accent transition-colors">
                        <Camera className="w-4 h-4" />
                        Change Photo
                      </button>
                      <p className="text-xs text-muted-foreground mt-1">
                        JPG, PNG or GIF. Max size 2MB.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        value={tempSettings.name}
                        onChange={(e) => setTempSettings(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={tempSettings.email}
                        onChange={(e) => setTempSettings(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Location</label>
                      <input
                        type="text"
                        value={tempSettings.location}
                        onChange={(e) => setTempSettings(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Time Zone</label>
                      <select className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
                        <option>Eastern Time (ET)</option>
                        <option>Central Time (CT)</option>
                        <option>Mountain Time (MT)</option>
                        <option>Pacific Time (PT)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Bio</label>
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>

                <button
                  onClick={handleSaveProfile}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Appearance & Behavior</h3>
                  
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
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">Auto-refresh Data</h4>
                        <p className="text-sm text-muted-foreground">Automatically update widgets every 5 minutes</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="p-4 bg-background border border-border rounded-lg">
                      <h4 className="font-medium mb-2">Default Dashboard View</h4>
                      <select className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
                        <option>Dashboard Overview</option>
                        <option>Tasks</option>
                        <option>Calendar</option>
                        <option>Analytics</option>
                      </select>
                    </div>

                    <div className="p-4 bg-background border border-border rounded-lg">
                      <h4 className="font-medium mb-2">Language</h4>
                      <select className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
                        <option>English (US)</option>
                        <option>English (UK)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Notification Settings</h3>
                  
                  <div className="space-y-4">
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
                        <h4 className="font-medium">Weekly Reports</h4>
                        <p className="text-sm text-muted-foreground">Weekly productivity summary</p>
                      </div>
                      <Switch 
                        checked={notifications.weeklyReports}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, weeklyReports: checked }))}
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
                        <h4 className="font-medium">News Updates</h4>
                        <p className="text-sm text-muted-foreground">Breaking news notifications</p>
                      </div>
                      <Switch 
                        checked={notifications.newsUpdates}
                        onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, newsUpdates: checked }))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Security & Privacy</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-background border border-border rounded-lg">
                      <h4 className="font-medium mb-2">Change Password</h4>
                      <div className="space-y-3">
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
                        <input
                          type="password"
                          placeholder="Confirm new password"
                          className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                          Update Password
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">Two-Factor Authentication</h4>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                      </div>
                      <button className="px-3 py-1 bg-secondary rounded-lg hover:bg-accent transition-colors">
                        Enable
                      </button>
                    </div>

                    <div className="p-4 bg-background border border-border rounded-lg">
                      <h4 className="font-medium mb-2">Active Sessions</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-muted rounded">
                          <div>
                            <p className="text-sm font-medium">Current Session</p>
                            <p className="text-xs text-muted-foreground">Chrome on macOS • New York, NY</p>
                          </div>
                          <span className="text-xs text-green-600">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'data' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Data & Privacy</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-background border border-border rounded-lg">
                      <h4 className="font-medium mb-2">Export Data</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Download a copy of your personal data including tasks, settings, and analytics.
                      </p>
                      <button
                        onClick={handleExportData}
                        className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-accent transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Export Data
                      </button>
                    </div>

                    <div className="p-4 bg-background border border-border rounded-lg">
                      <h4 className="font-medium mb-2">Import Data</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Import your data from a previous export or another service.
                      </p>
                      <button className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-accent transition-colors">
                        <Upload className="w-4 h-4" />
                        Import Data
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-background border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">Analytics Tracking</h4>
                        <p className="text-sm text-muted-foreground">Help improve the service with anonymous usage data</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <Separator />

                    <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                      <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Danger Zone</h4>
                      <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
