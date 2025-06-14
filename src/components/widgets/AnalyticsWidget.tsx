
import React, { useMemo } from 'react';
import { trending-up as TrendingUp } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

export const AnalyticsWidget: React.FC = () => {
  const { tasks } = useDashboard();

  const analytics = useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Priority distribution
    const priorityStats = {
      high: tasks.filter(task => task.priority === 'high').length,
      medium: tasks.filter(task => task.priority === 'medium').length,
      low: tasks.filter(task => task.priority === 'low').length,
    };

    // Tasks created this week (mock data for demo)
    const thisWeekTasks = Math.floor(Math.random() * 10) + 5;
    const lastWeekTasks = Math.floor(Math.random() * 10) + 5;
    const weeklyChange = ((thisWeekTasks - lastWeekTasks) / lastWeekTasks) * 100;

    // Productivity score (mock calculation)
    const productivityScore = Math.min(100, Math.round(
      (completionRate * 0.4) + 
      (thisWeekTasks * 2) + 
      (priorityStats.high * 1.5) + 
      Math.random() * 20
    ));

    return {
      totalTasks,
      completedTasks,
      pendingTasks,
      completionRate,
      priorityStats,
      thisWeekTasks,
      lastWeekTasks,
      weeklyChange,
      productivityScore
    };
  }, [tasks]);

  const StatCard: React.FC<{ title: string; value: string | number; subtitle?: string; trend?: number }> = ({ 
    title, 
    value, 
    subtitle, 
    trend 
  }) => (
    <div className="bg-background border border-border rounded-lg p-3">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-xs font-medium text-muted-foreground">{title}</h4>
        {trend !== undefined && (
          <span className={`text-xs flex items-center gap-1 ${
            trend >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            <TrendingUp className={`w-3 h-3 ${trend < 0 ? 'rotate-180' : ''}`} />
            {Math.abs(trend).toFixed(1)}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold">{value}</div>
      {subtitle && (
        <div className="text-xs text-muted-foreground">{subtitle}</div>
      )}
    </div>
  );

  const ProgressBar: React.FC<{ label: string; value: number; max: number; color: string }> = ({ 
    label, 
    value, 
    max, 
    color 
  }) => (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${color} transition-all duration-300`}
          style={{ width: `${max > 0 ? (value / max) * 100 : 0}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <div className="widget-card h-full flex flex-col">
      <div className="widget-header">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          <h3 className="font-semibold">Analytics</h3>
        </div>
        <span className="text-sm text-muted-foreground">Personal Metrics</span>
      </div>

      <div className="widget-content flex-1">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <StatCard 
            title="Productivity Score" 
            value={analytics.productivityScore}
            subtitle="This week"
          />
          <StatCard 
            title="Completion Rate" 
            value={`${analytics.completionRate}%`}
            subtitle="All time"
          />
          <StatCard 
            title="Tasks This Week" 
            value={analytics.thisWeekTasks}
            trend={analytics.weeklyChange}
          />
          <StatCard 
            title="Pending Tasks" 
            value={analytics.pendingTasks}
            subtitle="Remaining"
          />
        </div>

        {/* Task Distribution */}
        <div className="space-y-4">
          <h4 className="font-medium">Task Distribution</h4>
          
          <div className="space-y-3">
            <ProgressBar 
              label="High Priority" 
              value={analytics.priorityStats.high} 
              max={analytics.totalTasks} 
              color="bg-red-500" 
            />
            <ProgressBar 
              label="Medium Priority" 
              value={analytics.priorityStats.medium} 
              max={analytics.totalTasks} 
              color="bg-yellow-500" 
            />
            <ProgressBar 
              label="Low Priority" 
              value={analytics.priorityStats.low} 
              max={analytics.totalTasks} 
              color="bg-green-500" 
            />
          </div>
        </div>

        {/* Weekly Summary */}
        <div className="mt-6 p-3 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">Weekly Summary</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• {analytics.completedTasks} tasks completed</p>
            <p>• {analytics.thisWeekTasks} new tasks created</p>
            <p>• {analytics.productivityScore}/100 productivity score</p>
            <p className={analytics.weeklyChange >= 0 ? 'text-green-600' : 'text-red-600'}>
              • {Math.abs(analytics.weeklyChange).toFixed(1)}% {analytics.weeklyChange >= 0 ? 'increase' : 'decrease'} from last week
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
