
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, Calendar, Target, Activity, Users, DollarSign, Clock, Award } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

export const FullScreenAnalytics: React.FC = () => {
  const { tasks } = useDashboard();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [activeMetric, setActiveMetric] = useState<'productivity' | 'tasks' | 'goals' | 'time'>('productivity');

  // Sample data for charts
  const productivityData = [
    { date: '2024-06-01', productivity: 85, tasks: 12, goals: 3 },
    { date: '2024-06-02', productivity: 92, tasks: 15, goals: 4 },
    { date: '2024-06-03', productivity: 78, tasks: 9, goals: 2 },
    { date: '2024-06-04', productivity: 96, tasks: 18, goals: 5 },
    { date: '2024-06-05', productivity: 88, tasks: 14, goals: 3 },
    { date: '2024-06-06', productivity: 82, tasks: 11, goals: 2 },
    { date: '2024-06-07', productivity: 91, tasks: 16, goals: 4 },
  ];

  const taskDistribution = [
    { name: 'Work', value: 45, color: '#3B82F6' },
    { name: 'Personal', value: 30, color: '#10B981' },
    { name: 'Health', value: 15, color: '#EF4444' },
    { name: 'Other', value: 10, color: '#F59E0B' },
  ];

  const timeTrackingData = [
    { activity: 'Deep Work', hours: 4.5, efficiency: 95 },
    { activity: 'Meetings', hours: 2.0, efficiency: 70 },
    { activity: 'Email', hours: 1.5, efficiency: 60 },
    { activity: 'Planning', hours: 1.0, efficiency: 85 },
    { activity: 'Break', hours: 1.0, efficiency: 100 },
  ];

  const weeklyGoals = [
    { week: 'Week 1', completed: 8, total: 10, percentage: 80 },
    { week: 'Week 2', completed: 12, total: 15, percentage: 80 },
    { week: 'Week 3', completed: 9, total: 10, percentage: 90 },
    { week: 'Week 4', completed: 14, total: 16, percentage: 87.5 },
  ];

  const getTaskAnalytics = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const completionRate = total > 0 ? (completed / total) * 100 : 0;
    
    const priorityBreakdown = {
      high: tasks.filter(t => t.priority === 'high').length,
      medium: tasks.filter(t => t.priority === 'medium').length,
      low: tasks.filter(t => t.priority === 'low').length,
    };

    const categoryBreakdown = tasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total,
      completed,
      pending,
      completionRate,
      priorityBreakdown,
      categoryBreakdown
    };
  };

  const analytics = getTaskAnalytics();

  const kpiCards = [
    {
      title: 'Productivity Score',
      value: '89%',
      change: '+5.2%',
      icon: TrendingUp,
      color: 'bg-blue-500',
      trend: 'up'
    },
    {
      title: 'Tasks Completed',
      value: analytics.completed.toString(),
      change: '+12',
      icon: Target,
      color: 'bg-green-500',
      trend: 'up'
    },
    {
      title: 'Avg. Daily Hours',
      value: '7.5h',
      change: '+0.5h',
      icon: Clock,
      color: 'bg-purple-500',
      trend: 'up'
    },
    {
      title: 'Weekly Goals',
      value: '87%',
      change: '+7%',
      icon: Award,
      color: 'bg-orange-500',
      trend: 'up'
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-2">
          Analytics Dashboard
        </h2>
        <p className="text-muted-foreground">
          Comprehensive insights into your productivity, performance, and progress tracking.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex gap-2">
          {(['productivity', 'tasks', 'goals', 'time'] as const).map((metric) => (
            <button
              key={metric}
              onClick={() => setActiveMetric(metric)}
              className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                activeMetric === metric
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-accent'
              }`}
            >
              {metric}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
          {(['7d', '30d', '90d', '1y'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                timeRange === range
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-accent'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {kpiCards.map((kpi, index) => (
          <div key={index} className="widget-card p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${kpi.color} text-white`}>
                <kpi.icon className="w-5 h-5" />
              </div>
              <span className={`text-sm font-medium ${
                kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {kpi.change}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold">{kpi.value}</p>
              <p className="text-sm text-muted-foreground">{kpi.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Primary Chart */}
        <div className="lg:col-span-2 widget-card p-4">
          <div className="widget-header mb-4">
            <h3 className="font-semibold">
              {activeMetric === 'productivity' && 'Productivity Trends'}
              {activeMetric === 'tasks' && 'Task Completion Trends'}
              {activeMetric === 'goals' && 'Goal Achievement'}
              {activeMetric === 'time' && 'Time Distribution'}
            </h3>
          </div>
          
          <div className="h-80">
            {(activeMetric === 'productivity' || activeMetric === 'tasks') && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={productivityData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey={activeMetric === 'productivity' ? 'productivity' : 'tasks'} 
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
            
            {activeMetric === 'goals' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyGoals}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="percentage" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
            
            {activeMetric === 'time' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeTrackingData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis dataKey="activity" type="category" tick={{ fontSize: 12 }} width={80} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="hours" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Sidebar Charts */}
        <div className="space-y-6">
          {/* Task Distribution */}
          <div className="widget-card p-4">
            <div className="widget-header mb-4">
              <h3 className="font-semibold">Task Categories</h3>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {taskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Priority Breakdown */}
          <div className="widget-card p-4">
            <div className="widget-header mb-4">
              <h3 className="font-semibold">Priority Breakdown</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm">High Priority</span>
                </div>
                <span className="font-medium">{analytics.priorityBreakdown.high}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Medium Priority</span>
                </div>
                <span className="font-medium">{analytics.priorityBreakdown.medium}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Low Priority</span>
                </div>
                <span className="font-medium">{analytics.priorityBreakdown.low}</span>
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="widget-card p-4">
            <div className="widget-header mb-4">
              <h3 className="font-semibold">Insights</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="text-blue-600 dark:text-blue-400 font-medium">Peak Productivity</p>
                <p className="text-blue-700 dark:text-blue-300">You're most productive on Thursdays</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <p className="text-green-600 dark:text-green-400 font-medium">Completion Rate</p>
                <p className="text-green-700 dark:text-green-300">Above average by 23%</p>
              </div>
              <div className="p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                <p className="text-purple-600 dark:text-purple-400 font-medium">Focus Time</p>
                <p className="text-purple-700 dark:text-purple-300">Best between 9-11 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
