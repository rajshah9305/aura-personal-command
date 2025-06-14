
import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe,
  Moon,
  Sun
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { useToast } from '@/hooks/use-toast';

export const SettingsPage: React.FC = () => {
  const { 
    darkMode, 
    toggleDarkMode, 
    userSettings, 
    updateUserSettings,
    widgets,
    updateWidget
  } = useDashboard();
  
  const { toast } = useToast();
  const [settings, setSettings] = useState(userSettings);
  const [widgetSettings, setWidgetSettings] = useState(widgets);

  const handleSaveProfile = () => {
    updateUserSettings(settings);
    toast({
      title: "Settings saved",
      description: "Your profile settings have been updated successfully.",
    });
  };

  const handleToggleWidget = (widgetId: string, visible: boolean) => {
    updateWidget(widgetId, { visible });
    setWidgetSettings(prev => 
      prev.map(widget => 
        widget.id === widgetId ? { ...widget, visible } : widget
      )
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <SettingsIcon className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="widgets">Widgets</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Profile Information</h2>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={settings.name}
                    onChange={(e) => setSettings({...settings, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({...settings, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={settings.location}
                  onChange={(e) => setSettings({...settings, location: e.target.value})}
                  placeholder="e.g., New York, NY"
                />
              </div>
              
              <Button onClick={handleSaveProfile} className="w-full">
                Save Profile Changes
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Appearance</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                  <div>
                    <Label>Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Toggle between light and dark themes
                    </p>
                  </div>
                </div>
                <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
              </div>
              
              <Separator />
              
              <div>
                <Label>Theme Color</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  Choose your preferred accent color
                </p>
                <Select defaultValue="blue">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Notification Preferences</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch 
                  checked={settings.notifications} 
                  onCheckedChange={(checked) => 
                    setSettings({...settings, notifications: checked})
                  } 
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Task Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Get reminded about upcoming tasks
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Weather Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive severe weather notifications
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Stock Price Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified of significant price changes
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="widgets">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Widget Management</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Choose which widgets to display on your dashboard
              </p>
              
              {widgetSettings.map((widget) => (
                <div key={widget.id} className="flex items-center justify-between">
                  <div>
                    <Label>{widget.name}</Label>
                    <p className="text-sm text-muted-foreground">
                      {widget.type} widget
                    </p>
                  </div>
                  <Switch 
                    checked={widget.visible} 
                    onCheckedChange={(checked) => handleToggleWidget(widget.id, checked)}
                  />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Privacy & Security</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Data Collection</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow anonymous usage analytics
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Location Services</Label>
                  <p className="text-sm text-muted-foreground">
                    Use location for weather and local news
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <Label>Data Management</Label>
                <div className="flex gap-2">
                  <Button variant="outline">Export Data</Button>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
