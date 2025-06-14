
import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  Activity, 
  Settings,
  Camera,
  Award,
  TrendingUp,
  Clock
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { useToast } from '@/hooks/use-toast';

export const ProfilePage: React.FC = () => {
  const { userSettings, updateUserSettings, tasks } = useDashboard();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedSettings, setEditedSettings] = useState(userSettings);

  const handleSave = () => {
    updateUserSettings(editedSettings);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleCancel = () => {
    setEditedSettings(userSettings);
    setIsEditing(false);
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const recentActivities = [
    { action: "Completed task", item: "Review quarterly reports", time: "2 hours ago" },
    { action: "Updated profile", item: "Changed location settings", time: "1 day ago" },
    { action: "Added widget", item: "Stock market tracker", time: "3 days ago" },
    { action: "Completed task", item: "Team meeting preparation", time: "1 week ago" },
  ];

  const achievements = [
    { title: "Early Bird", description: "Completed 10 morning tasks", icon: "🌅" },
    { title: "Productivity Master", description: "90% task completion rate", icon: "⚡" },
    { title: "Streak Champion", description: "7-day task completion streak", icon: "🔥" },
    { title: "Widget Explorer", description: "Used all available widgets", icon: "🎯" },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <Avatar className="w-24 h-24">
            <AvatarImage src="" alt={userSettings.name} />
            <AvatarFallback className="text-2xl">
              {userSettings.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <Button
            size="sm"
            variant="secondary"
            className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
          >
            <Camera className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{userSettings.name}</h1>
            <Badge variant="secondary">Premium User</Badge>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {userSettings.email}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {userSettings.location}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Member since Jan 2024
            </div>
          </div>
        </div>
        
        <Button 
          variant={isEditing ? "destructive" : "outline"}
          onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
        >
          <Settings className="w-4 h-4 mr-2" />
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <h3 className="font-semibold">Productivity</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Task Completion</span>
                  <span className="font-medium">{completionRate}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {completedTasks} of {totalTasks} tasks completed
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="w-5 h-5 text-blue-500" />
                <h3 className="font-semibold">This Week</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Tasks Completed</span>
                  <span className="font-medium">{completedTasks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Widgets Used</span>
                  <span className="font-medium">6</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Login Streak</span>
                  <span className="font-medium">7 days</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-5 h-5 text-yellow-500" />
                <h3 className="font-semibold">Achievements</h3>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold">{achievements.length}</p>
                <p className="text-sm text-muted-foreground">Badges earned</p>
                <div className="flex gap-1 mt-2">
                  {achievements.slice(0, 3).map((achievement, index) => (
                    <span key={index} className="text-lg">{achievement.icon}</span>
                  ))}
                  {achievements.length > 3 && (
                    <span className="text-xs text-muted-foreground">+{achievements.length - 3}</span>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-5 h-5" />
              <h2 className="text-xl font-semibold">Recent Activity</h2>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.item}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{achievement.icon}</div>
                  <div>
                    <h3 className="font-semibold mb-1">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
            
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="editName">Full Name</Label>
                    <Input
                      id="editName"
                      value={editedSettings.name}
                      onChange={(e) => setEditedSettings({...editedSettings, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editEmail">Email Address</Label>
                    <Input
                      id="editEmail"
                      type="email"
                      value={editedSettings.email}
                      onChange={(e) => setEditedSettings({...editedSettings, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="editLocation">Location</Label>
                  <Input
                    id="editLocation"
                    value={editedSettings.location}
                    onChange={(e) => setEditedSettings({...editedSettings, location: e.target.value})}
                  />
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSave}>Save Changes</Button>
                  <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <p className="text-sm mt-1 p-2 bg-muted rounded">{userSettings.name}</p>
                  </div>
                  <div>
                    <Label>Email Address</Label>
                    <p className="text-sm mt-1 p-2 bg-muted rounded">{userSettings.email}</p>
                  </div>
                </div>
                
                <div>
                  <Label>Location</Label>
                  <p className="text-sm mt-1 p-2 bg-muted rounded">{userSettings.location}</p>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
