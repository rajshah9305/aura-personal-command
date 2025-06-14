
import React, { useState } from 'react';
import { list as List, chevron-down as ChevronDown, x as X } from 'lucide-react';
import { useDashboard, Task } from '../../context/DashboardContext';

export const TaskWidget: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask } = useDashboard();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
    category: 'general',
    dueDate: '',
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed);
  const completionRate = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      addTask({
        ...newTask,
        completed: false,
      });
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

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="widget-card h-full flex flex-col">
      <div className="widget-header">
        <div className="flex items-center gap-2">
          <List className="w-5 h-5" />
          <h3 className="font-semibold">Tasks</h3>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors"
        >
          Add Task
        </button>
      </div>

      <div className="widget-content flex-1 flex flex-col">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{tasks.length}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">{completedCount}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">{completionRate}%</div>
            <div className="text-xs text-muted-foreground">Progress</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>

        {/* Add Task Form */}
        {showAddForm && (
          <div className="bg-muted rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Add New Task</h4>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Task title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
                  className="px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <button
                onClick={handleAddTask}
                className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
              >
                Add Task
              </button>
            </div>
          </div>
        )}

        {/* Task List */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {pendingTasks.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <List className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No pending tasks</p>
              <p className="text-sm">Add a task to get started!</p>
            </div>
          ) : (
            pendingTasks.map((task) => (
              <div
                key={task.id}
                className="bg-background border border-border rounded-lg p-3 hover:shadow-sm transition-shadow"
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
                      <h5 className="font-medium truncate">{task.title}</h5>
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
                    </div>
                    {task.description && (
                      <p className="text-sm text-muted-foreground mb-1">{task.description}</p>
                    )}
                    {task.dueDate && (
                      <p className="text-xs text-muted-foreground">Due: {formatDate(task.dueDate)}</p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
