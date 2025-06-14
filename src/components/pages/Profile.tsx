
import React, { useState } from 'react';
import { User, Camera, Save, MapPin, Calendar, Phone, Mail, Globe, Briefcase, Heart, Star } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

export const Profile: React.FC = () => {
  const { userSettings, updateUserSettings } = useDashboard();
  const [tempProfile, setTempProfile] = useState({
    ...userSettings,
    bio: 'Passionate developer and productivity enthusiast. Love building applications that make people\'s lives easier.',
    phone: '+1 (555) 123-4567',
    website: 'https://johndoe.dev',
    company: 'Tech Solutions Inc.',
    interests: ['Technology', 'Design', 'Photography', 'Travel', 'Music', 'Fitness'],
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'UI/UX Design', 'Project Management'],
    achievements: [
      { title: 'Employee of the Month', date: 'March 2024', organization: 'Tech Solutions Inc.' },
      { title: 'React Certification', date: 'January 2024', organization: 'React Academy' },
      { title: 'UI/UX Design Award', date: 'December 2023', organization: 'Design Conference' }
    ]
  });

  const handleSaveProfile = () => {
    updateUserSettings(tempProfile);
    // Show success message
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-2">
          My Profile
        </h2>
        <p className="text-muted-foreground">
          Manage your personal information, interests, and professional details.
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="widget-card p-6 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-3xl font-bold">
                {userSettings.name.charAt(0)}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-secondary rounded-full flex items-center justify-center hover:bg-accent transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            <h3 className="text-xl font-semibold mb-1">{userSettings.name}</h3>
            <p className="text-muted-foreground mb-4">{tempProfile.company}</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{userSettings.location}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>Joined March 2023</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold">127</div>
                  <div className="text-xs text-muted-foreground">Tasks Done</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">89%</div>
                  <div className="text-xs text-muted-foreground">Completion</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">24</div>
                  <div className="text-xs text-muted-foreground">Projects</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <div className="widget-card p-6">
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      value={tempProfile.name}
                      onChange={(e) => setTempProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={tempProfile.email}
                      onChange={(e) => setTempProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      value={tempProfile.phone}
                      onChange={(e) => setTempProfile(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                      type="text"
                      value={tempProfile.location}
                      onChange={(e) => setTempProfile(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Website</label>
                    <input
                      type="url"
                      value={tempProfile.website}
                      onChange={(e) => setTempProfile(prev => ({ ...prev, website: e.target.value }))}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <input
                      type="text"
                      value={tempProfile.company}
                      onChange={(e) => setTempProfile(prev => ({ ...prev, company: e.target.value }))}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <textarea
                    rows={3}
                    value={tempProfile.bio}
                    onChange={(e) => setTempProfile(prev => ({ ...prev, bio: e.target.value }))}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>

              {/* Interests */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Interests & Hobbies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tempProfile.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/20"
                    >
                      {interest}
                    </span>
                  ))}
                  <button className="px-3 py-1 bg-secondary rounded-full text-sm hover:bg-accent transition-colors">
                    + Add Interest
                  </button>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tempProfile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-sm border border-blue-500/20"
                    >
                      {skill}
                    </span>
                  ))}
                  <button className="px-3 py-1 bg-secondary rounded-full text-sm hover:bg-accent transition-colors">
                    + Add Skill
                  </button>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Achievements & Certifications
                </h3>
                <div className="space-y-3">
                  {tempProfile.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <Star className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {achievement.organization} • {achievement.date}
                        </p>
                      </div>
                    </div>
                  ))}
                  <button className="w-full p-3 bg-secondary rounded-lg hover:bg-accent transition-colors text-center">
                    + Add Achievement
                  </button>
                </div>
              </div>

              <button
                onClick={handleSaveProfile}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
