
import React, { useState } from 'react';
import { Plus, Check, Trash2, Clock, Calendar, Star, Filter, Search } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

export const EnhancedTaskWidgetStyled: React.FC = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useDashboard();
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask({
        id: Date.now().toString(),
        title: newTask,
        completed: false,
        priority: 'medium',
        dueDate: new Date().toISOString().split('T')[0],
        category: 'General'
      });
      setNewTask('');
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'completed' && task.completed) || 
                         (filter === 'pending' && !task.completed);
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const completionRate = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div className="h-full rounded-xl bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 text-white shadow-xl overflow-hidden relative hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10 p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-xl">Tasks</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-16 bg-white/20 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-white h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
              <span className="text-xs text-white/80">{Math.round(completionRate)}%</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{completedCount}</div>
            <div className="text-xs text-white/80">completed</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="space-y-3 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/15 backdrop-blur-sm rounded-lg text-white placeholder-white/60 border border-white/20 focus:border-white/40 focus:outline-none transition-colors"
            />
          </div>
          
          <div className="flex gap-2">
            {(['all', 'pending', 'completed'] as const).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  filter === filterType
                    ? 'bg-white/25 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/15'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Add Task */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            className="flex-1 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-lg text-white placeholder-white/60 border border-white/20 focus:border-white/40 focus:outline-none transition-colors"
          />
          <button
            onClick={handleAddTask}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors group"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* Tasks List */}
        <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8 text-white/60">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No tasks found</p>
            </div>
          ) : (
            filteredTasks.map((task, index) => (
              <div
                key={task.id}
                className={`group p-3 rounded-lg backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02] animate-fade-in ${
                  task.completed
                    ? 'bg-white/10 border-white/20 opacity-75'
                    : 'bg-white/15 border-white/25 hover:bg-white/20'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      task.completed
                        ? 'bg-white text-green-600 border-white'
                        : 'border-white/40 hover:border-white'
                    }`}
                  >
                    {task.completed && <Check className="w-3 h-3" />}
                  </button>
                  
                  <div className="flex-1">
                    <div className={`font-medium ${task.completed ? 'line-through opacity-75' : ''}`}>
                      {task.title}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-white/60">
                      <Calendar className="w-3 h-3" />
                      <span>{task.dueDate}</span>
                      <span className="px-2 py-0.5 bg-white/20 rounded text-white/80">
                        {task.category}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="flex-shrink-0 p-1 text-white/40 hover:text-red-300 hover:bg-red-500/20 rounded transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Stats */}
        {tasks.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex justify-between text-sm text-white/80">
              <span>{tasks.filter(t => !t.completed).length} pending</span>
              <span>{completedCount} completed</span>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};
