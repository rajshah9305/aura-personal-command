
import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Bell, Clock, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Badge } from '../ui/badge';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  category: 'work' | 'personal' | 'health' | 'other';
  reminder?: {
    enabled: boolean;
    minutesBefore: number;
  };
  description?: string;
}

interface Reminder {
  eventId: string;
  eventTitle: string;
  scheduledTime: Date;
  shown: boolean;
}

const sampleEvents: Event[] = [
  { 
    id: '1', 
    title: 'Team Meeting', 
    date: '2024-06-15', 
    time: '10:00', 
    category: 'work',
    reminder: { enabled: true, minutesBefore: 15 },
    description: 'Weekly team sync meeting'
  },
  { 
    id: '2', 
    title: 'Doctor Appointment', 
    date: '2024-06-16', 
    time: '14:30', 
    category: 'health',
    reminder: { enabled: true, minutesBefore: 30 },
    description: 'Annual checkup'
  },
  { 
    id: '3', 
    title: 'Dinner with Friends', 
    date: '2024-06-17', 
    time: '19:00', 
    category: 'personal',
    reminder: { enabled: false, minutesBefore: 15 }
  }
];

export const EnhancedCalendarWidget: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [events, setEvents] = useState<Event[]>(sampleEvents);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: '',
    time: '',
    category: 'personal',
    reminder: { enabled: true, minutesBefore: 15 },
    description: ''
  });
  const [activeReminders, setActiveReminders] = useState<Reminder[]>([]);

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Reminder system
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const newActiveReminders: Reminder[] = [];

      events.forEach(event => {
        if (event.reminder?.enabled) {
          const eventDateTime = new Date(`${event.date}T${event.time}`);
          const reminderTime = new Date(eventDateTime.getTime() - (event.reminder.minutesBefore * 60000));
          
          if (now >= reminderTime && now < eventDateTime) {
            const existingReminder = activeReminders.find(r => r.eventId === event.id);
            if (!existingReminder) {
              newActiveReminders.push({
                eventId: event.id,
                eventTitle: event.title,
                scheduledTime: reminderTime,
                shown: false
              });
            }
          }
        }
      });

      if (newActiveReminders.length > 0) {
        setActiveReminders(prev => [...prev, ...newActiveReminders]);
      }
    };

    const interval = setInterval(checkReminders, 60000); // Check every minute
    checkReminders(); // Check immediately

    return () => clearInterval(interval);
  }, [events, activeReminders]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getEventsForDate = (date: number) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return events.filter(event => event.date === dateString);
  };

  const handleDateClick = (date: number) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    setSelectedDate(dateString);
    setNewEvent(prev => ({ ...prev, date: dateString }));
    setShowEventForm(true);
  };

  const handleSaveEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      if (editingEvent) {
        setEvents(prev => prev.map(event => 
          event.id === editingEvent.id 
            ? { ...editingEvent, ...newEvent } as Event
            : event
        ));
      } else {
        const event: Event = {
          id: Date.now().toString(),
          title: newEvent.title!,
          date: newEvent.date!,
          time: newEvent.time!,
          category: newEvent.category!,
          reminder: newEvent.reminder,
          description: newEvent.description
        };
        setEvents(prev => [...prev, event]);
      }
      
      setShowEventForm(false);
      setEditingEvent(null);
      setNewEvent({
        title: '',
        time: '',
        category: 'personal',
        reminder: { enabled: true, minutesBefore: 15 },
        description: ''
      });
    }
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setNewEvent(event);
    setShowEventForm(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  const dismissReminder = (eventId: string) => {
    setActiveReminders(prev => prev.filter(r => r.eventId !== eventId));
  };

  const getCategoryColor = (category: Event['category']) => {
    switch (category) {
      case 'work': return 'bg-blue-500';
      case 'personal': return 'bg-green-500';
      case 'health': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const formatEventTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const isToday = (date: number) => {
    return today.getDate() === date &&
           today.getMonth() === currentMonth &&
           today.getFullYear() === currentYear;
  };

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="widget-card h-full flex flex-col">
      <div className="widget-header">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          <h3 className="font-semibold">Enhanced Calendar</h3>
          {activeReminders.length > 0 && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <Bell className="w-3 h-3" />
              {activeReminders.length}
            </Badge>
          )}
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setShowEventForm(true)}
            className="p-1 hover:bg-accent rounded transition-colors"
            title="Add Event"
          >
            <Plus className="w-4 h-4" />
          </button>
          {(['month', 'week', 'day'] as const).map((viewType) => (
            <button
              key={viewType}
              onClick={() => setView(viewType)}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                view === viewType
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent'
              }`}
            >
              {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="widget-content flex-1 flex flex-col">
        {/* Active Reminders */}
        {activeReminders.map(reminder => (
          <div key={reminder.eventId} className="mb-2 p-2 bg-yellow-100 border border-yellow-300 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium">Reminder: {reminder.eventTitle}</span>
            </div>
            <button
              onClick={() => dismissReminder(reminder.eventId)}
              className="text-yellow-600 hover:text-yellow-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Event Form */}
        {showEventForm && (
          <div className="mb-4 p-4 bg-muted rounded-lg border">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">{editingEvent ? 'Edit Event' : 'Add New Event'}</h4>
              <button
                onClick={() => {
                  setShowEventForm(false);
                  setEditingEvent(null);
                  setNewEvent({
                    title: '',
                    time: '',
                    category: 'personal',
                    reminder: { enabled: true, minutesBefore: 15 },
                    description: ''
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
                placeholder="Event title"
                value={newEvent.title || ''}
                onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={newEvent.date || selectedDate}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                  className="px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <input
                  type="time"
                  value={newEvent.time || ''}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                  className="px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <select
                value={newEvent.category || 'personal'}
                onChange={(e) => setNewEvent(prev => ({ ...prev, category: e.target.value as Event['category'] }))}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="health">Health</option>
                <option value="other">Other</option>
              </select>
              <textarea
                placeholder="Description (optional)"
                value={newEvent.description || ''}
                onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                rows={2}
              />
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newEvent.reminder?.enabled || false}
                    onChange={(e) => setNewEvent(prev => ({
                      ...prev,
                      reminder: { ...prev.reminder, enabled: e.target.checked, minutesBefore: prev.reminder?.minutesBefore || 15 }
                    }))}
                    className="rounded border-border focus:ring-ring"
                  />
                  <span className="text-sm">Enable reminder</span>
                </label>
                {newEvent.reminder?.enabled && (
                  <select
                    value={newEvent.reminder.minutesBefore}
                    onChange={(e) => setNewEvent(prev => ({
                      ...prev,
                      reminder: { ...prev.reminder, enabled: true, minutesBefore: parseInt(e.target.value) }
                    }))}
                    className="px-2 py-1 bg-background border border-border rounded text-sm"
                  >
                    <option value={5}>5 minutes</option>
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={1440}>1 day</option>
                  </select>
                )}
              </div>
              <button
                onClick={handleSaveEvent}
                className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editingEvent ? 'Update Event' : 'Add Event'}
              </button>
            </div>
          </div>
        )}

        {view === 'month' && (
          <>
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-1 hover:bg-accent rounded transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <h4 className="font-semibold">
                {monthNames[currentMonth]} {currentYear}
              </h4>
              <button
                onClick={() => navigateMonth('next')}
                className="p-1 hover:bg-accent rounded transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {weekDays.map(day => (
                <div key={day} className="text-center text-xs font-medium text-muted-foreground p-1">
                  {day}
                </div>
              ))}
              
              {Array.from({ length: firstDayOfMonth }, (_, i) => (
                <div key={`empty-${i}`} className="p-1"></div>
              ))}
              
              {Array.from({ length: daysInMonth }, (_, i) => {
                const date = i + 1;
                const dayEvents = getEventsForDate(date);
                
                return (
                  <div
                    key={date}
                    className={`p-1 text-center text-xs border rounded hover:bg-accent transition-colors cursor-pointer ${
                      isToday(date) ? 'bg-primary text-primary-foreground' : ''
                    }`}
                    onClick={() => handleDateClick(date)}
                  >
                    <div className="font-medium">{date}</div>
                    {dayEvents.length > 0 && (
                      <div className="flex gap-1 mt-1 justify-center flex-wrap">
                        {dayEvents.slice(0, 2).map((event, idx) => (
                          <div
                            key={idx}
                            className={`w-1 h-1 rounded-full ${getCategoryColor(event.category)}`}
                            title={event.title}
                          ></div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="w-1 h-1 rounded-full bg-muted-foreground" title={`+${dayEvents.length - 2} more`}></div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Upcoming Events */}
        <div className="flex-1">
          <h4 className="font-medium mb-3">Upcoming Events</h4>
          <div className="space-y-2">
            {upcomingEvents.length === 0 ? (
              <div className="text-center text-muted-foreground py-4">
                <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No upcoming events</p>
              </div>
            ) : (
              upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-background border border-border rounded-lg p-3 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full ${getCategoryColor(event.category)} mt-1`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium text-sm">{event.title}</h5>
                        <div className="flex items-center gap-1">
                          {event.reminder?.enabled && (
                            <Bell className="w-3 h-3 text-muted-foreground" title={`Reminder: ${event.reminder.minutesBefore} min before`} />
                          )}
                          <button
                            onClick={() => handleEditEvent(event)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.date).toLocaleDateString()} at {formatEventTime(event.time)}
                      </p>
                      {event.description && (
                        <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
