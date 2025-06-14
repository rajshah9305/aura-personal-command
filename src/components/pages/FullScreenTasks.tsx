
import React from 'react';
import { EnhancedTaskWidget } from '../widgets/EnhancedTaskWidget';

export const FullScreenTasks: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-2">
          Task Management Hub
        </h2>
        <p className="text-muted-foreground">
          Organize, prioritize, and track your tasks with advanced filtering and management capabilities.
        </p>
      </div>
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <EnhancedTaskWidget />
        </div>
        <div className="space-y-4">
          <div className="widget-card p-4">
            <h3 className="font-semibold mb-3">Productivity Tips</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded">
                <strong className="text-blue-600 dark:text-blue-400">Tip:</strong> Use high priority for urgent tasks
              </div>
              <div className="p-2 bg-green-50 dark:bg-green-950 rounded">
                <strong className="text-green-600 dark:text-green-400">Tip:</strong> Set due dates to stay on track
              </div>
              <div className="p-2 bg-purple-50 dark:bg-purple-950 rounded">
                <strong className="text-purple-600 dark:text-purple-400">Tip:</strong> Use categories to organize tasks
              </div>
            </div>
          </div>
          
          <div className="widget-card p-4">
            <h3 className="font-semibold mb-3">Task Templates</h3>
            <div className="space-y-2">
              <button className="w-full p-2 text-left bg-secondary rounded-md hover:bg-secondary/90 transition-colors text-sm">
                📧 Email Follow-up
              </button>
              <button className="w-full p-2 text-left bg-secondary rounded-md hover:bg-secondary/90 transition-colors text-sm">
                🛒 Shopping List
              </button>
              <button className="w-full p-2 text-left bg-secondary rounded-md hover:bg-secondary/90 transition-colors text-sm">
                💻 Code Review
              </button>
              <button className="w-full p-2 text-left bg-secondary rounded-md hover:bg-secondary/90 transition-colors text-sm">
                📞 Meeting Prep
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
