
import React from 'react';
import { EnhancedCalendarWidget } from '../widgets/EnhancedCalendarWidget';

export const FullScreenCalendar: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-2">
          Calendar Management
        </h2>
        <p className="text-muted-foreground">
          Manage your events, set reminders, and stay organized with your schedule.
        </p>
      </div>
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EnhancedCalendarWidget />
        </div>
        <div className="space-y-4">
          <div className="widget-card p-4">
            <h3 className="font-semibold mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full p-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Add Event
              </button>
              <button className="w-full p-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors">
                View Today's Schedule
              </button>
              <button className="w-full p-2 bg-outline rounded-md hover:bg-accent transition-colors">
                Export Calendar
              </button>
            </div>
          </div>
          
          <div className="widget-card p-4">
            <h3 className="font-semibold mb-3">Calendar Settings</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">Enable notifications</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm">Show weekends</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">24-hour format</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
