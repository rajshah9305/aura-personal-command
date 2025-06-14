
import React, { useState, useEffect } from 'react';
import { List, Plus, Search, Filter, Calendar, Clock, Star, CheckCircle, X, Edit3, Trash2, Tag } from 'lucide-react';
import { useDashboard, Task } from '../../context/DashboardContext';
import { Badge } from '../ui/badge';

interface TaskFilter {
  status: 'all' | 'pending' | 'completed';
  priority: 'all' | 'high' | 'medium' | 'low';
  category: string;
  dueDate: 'all' | 'today' | 'week' | 'overdue';
}

export const EnhancedTaskWidget: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask } = useDashboard();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<TaskFilter>({
    status: 'all',
    priority: 'all',
    category: 'all',
    dueDate: 'all'
  });
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'medium',
    category: 'general',
    dueDate: '',
  });

  const categories = ['general', 'work', 'personal', 'shopping', 'health', 'finance'];
  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.filter(task => !task.completed).length;
  const completionRate = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  // Filter tasks based on current filters and search
  const filteredTasks = tasks.filter(task => {
    // Search filter
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !task.description?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Status filter
    if (filters.status === 'pending' && task.completed) return false;
    if (filters.status === 'completed' && !task.completed) return false;

    // Priority filter
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false;

    // Category filter
    if (filters.category !== 'all' && task.category !== filters.category) return false;

    // Due date filter
    if (filters.dueDate !== 'all' && task.dueDate) {
      const taskDate = new Date(task.dueDate);
      const today = new Date();
      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      
      switch (filters.dueDate) {
        case 'today':
          if (taskDate.toDateString() !== today.toDateString()) return false;
          break;
        case 'week':
          if (taskDate > weekFromNow) return false;
          break;
        case 'overdue':
          if (taskDate >= today || task.completed) return false;
          break;
      }
    }

    return true;
  });

  // Sort tasks by priority and due date
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const aPriority = priorityOrder[a.priority];
    const bPriority = priorityOrder[b.priority];
    
    if (aPriority !== bPriority) {
      return bPriority - aPriority;
    }
    
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    
    return 0;
  });

  const handleAddTask = () => {
    if (newTask.title?.trim()) {
      if (editingTask) {
        updateTask(editingTask.id, { ...newTask });
        setEditingTask(null);
      } else {
        addTask({
          ...newTask,
          completed: false,
        } as Omit<Task, 'id' | 'createdAt'>);
      }
      
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        category: 'general',
        dueDate: '',
      });
      setShowAddForm(false);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      category: task.category,
      dueDate: task.dueDate,
    });
    setShowAddForm(true);
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityBadge = (priority: Task['priority']) => {
    const colors = {
      high: 'destructive',
      medium: 'secondary',
      low: 'outline'
    };
    return colors[priority] as any;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      work: 'bg-blue-500',
      personal: 'bg-purple-500',
      shopping: 'bg-pink-500',
      health: 'bg-red-500',
      finance: 'bg-green-500',
      general: 'bg-gray-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const isPast = date < today;
    
    if (isToday) return 'Today';
    if (isPast) return `Overdue (${date.toLocaleDateString()})`;
    return date.toLocaleDateString();
  };

  const getTaskStats = () => {
    const today = new Date();
    const todayTasks = tasks.filter(task => 
      task.dueDate && new Date(task.dueDate).toDateString() === today.toDateString()
    );
    const overdueTasks = tasks.filter(task => 
      task.dueDate && new Date(task.dueDate) < today && !task.completed
    );
    const highPriorityTasks = tasks.filter(task => 
      task.priority === 'high' && !task.completed
    );

    return {
      todayCount: todayTasks.length,
      overdueCount: overdueTasks.length,
      highPriorityCount: highPriorityTasks.length
    };
  };

  const stats = getTaskStats();

  return (
    <div className="widget-card h-full flex flex-col">
      <div className="widget-header">
        <div className="flex items-center gap-2">
          <List className="w-5 h-5" />
          <h3 className="font-semibold">Enhanced Tasks</h3>
          <div className="flex gap-1">
            {stats.overdueCount > 0 && (
              <Badge variant="destructive">{stats.overdueCount} overdue</Badge>
            )}
            {stats.highPriorityCount > 0 && (
              <Badge variant="secondary">{stats.highPriorityCount} high</Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            title="Filter tasks"
          >
            <Filter className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        </div>
      </div>

      <div className="widget-content flex-1 flex flex-col">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="text-center p-2 bg-background rounded-lg border">
            <div className="text-lg font-bold text-primary">{tasks.length}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="text-center p-2 bg-background rounded-lg border">
            <div className="text-lg font-bold text-green-500">{completedCount}</div>
            <div className="text-xs text-muted-foreground">Done</div>
          </div>
          <div className="text-center p-2 bg-background rounded-lg border">
            <div className="text-lg font-bold text-orange-500">{pendingCount}</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
          <div className="text-center p-2 bg-background rounded-lg border">
            <div className="text-lg font-bold text-blue-500">{completionRate}%</div>
            <div className="text-xs text-muted-foreground">Progress</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
          />
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mb-4 p-3 bg-muted rounded-lg">
            <h4 className="text-sm font-medium mb-3">Filters</h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as any }))}
                  className="w-full mt-1 px-2 py-1 bg-background border border-border rounded text-sm"
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Priority</label>
                <select
                  value={filters.priority}
                  onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value as any }))}
                  className="w-full mt-1 px-2 py-1 bg-background border border-border rounded text-sm"
                >
                  <option value="all">All</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full mt-1 px-2 py-1 bg-background border border-border rounded text-sm"
                >
                  <option value="all">All</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Due Date</label>
                <select
                  value={filters.dueDate}
                  onChange={(e) => setFilters(prev => ({ ...prev, dueDate: e.target.value as any }))}
                  className="w-full mt-1 px-2 py-1 bg-background border border-border rounded text-sm"
                >
                  <option value="all">All</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Task Form */}
        {showAddForm && (
          <div className="bg-muted rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">{editingTask ? 'Edit Task' : 'Add New Task'}</h4>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingTask(null);
                  setNewTask({
                    title: '',
                    description: '',
                    priority: 'medium',
                    category: 'general',
                    dueDate: '',
                  });
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Task title"
                value={newTask.title || ''}
                onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <textarea
                placeholder="Description (optional)"
                value={newTask.description || ''}
                onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                rows={3}
              />
              <div className="grid grid-cols-3 gap-2">
                <select
                  value={newTask.priority || 'medium'}
                  onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as Task['priority'] }))}
                  className="px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <select
                  value={newTask.category || 'general'}
                  onChange={(e) => setNewTask(prev => ({ ...prev, category: e.target.value }))}
                  className="px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
                <input
                  type="date"
                  value={newTask.dueDate || ''}
                  onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button
                onClick={handleAddTask}
                className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                {editingTask ? 'Update Task' : 'Add Task'}
              </button>
            </div>
          </div>
        )}

        {/* Task List */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {sortedTasks.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <List className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No tasks found</p>
              <p className="text-sm">Add a task or adjust your filters</p>
            </div>
          ) : (
            sortedTasks.map((task) => (
              <div
                key={task.id}
                className={`bg-background border rounded-lg p-3 hover:shadow-sm transition-all ${
                  task.completed ? 'opacity-60 border-border' : 'border-border hover:border-primary/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={(e) => updateTask(task.id, { completed: e.target.checked })}
                    className="mt-1 rounded border-border focus:ring-ring"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className={`font-medium truncate ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {task.title}
                      </h5>
                      <div className="flex items-center gap-1">
                        <Badge variant={getPriorityBadge(task.priority)} className="text-xs">
                          {task.priority}
                        </Badge>
                        <div className={`w-2 h-2 rounded-full ${getCategoryColor(task.category)}`} title={task.category}></div>
                      </div>
                    </div>
                    {task.description && (
                      <p className="text-sm text-muted-foreground mb-1 line-clamp-2">{task.description}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {task.dueDate && (
                          <div className={`flex items-center gap-1 ${
                            new Date(task.dueDate) < new Date() && !task.completed ? 'text-destructive' : ''
                          }`}>
                            <Calendar className="w-3 h-3" />
                            {formatDate(task.dueDate)}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {task.category}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEditTask(task)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
