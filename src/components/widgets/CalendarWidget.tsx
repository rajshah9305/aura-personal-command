import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  category: 'work' | 'personal' | 'health' | 'other';
}

const sampleEvents: Event[] = [
  { id: '1', title: 'Team Meeting', date: '2024-06-15', time: '10:00', category: 'work' },
  { id: '2', title: 'Doctor Appointment', date: '2024-06-16', time: '14:30', category: 'health' },
  { id: '3', title: 'Dinner with Friends', date: '2024-06-17', time: '19:00', category: 'personal' },
  { id: '4', title: 'Project Deadline', date: '2024-06-18', time: '17:00', category: 'work' },
  { id: '5', title: 'Gym Workout', date: '2024-06-19', time: '07:00', category: 'health' },
];

export const CalendarWidget: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [events] = useState<Event[]>(sampleEvents);

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

  const getUpcomingEvents = () => {
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return events
      .filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= now && eventDate <= nextWeek;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3);
  };

  const getCategoryColor = (category: Event['category']) => {
    switch (category) {
      case 'work':
        return 'bg-blue-500';
      case 'personal':
        return 'bg-green-500';
      case 'health':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
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

  const upcomingEvents = getUpcomingEvents();

  return (
    <div className="widget-card h-full flex flex-col">
      <div className="widget-header">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          <h3 className="font-semibold">Calendar</h3>
        </div>
        <div className="flex gap-1">
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
              
              {/* Empty cells for days before month starts */}
              {Array.from({ length: firstDayOfMonth }, (_, i) => (
                <div key={`empty-${i}`} className="p-1"></div>
              ))}
              
              {/* Calendar days */}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const date = i + 1;
                const dayEvents = getEventsForDate(date);
                
                return (
                  <div
                    key={date}
                    className={`p-1 text-center text-xs border rounded hover:bg-accent transition-colors cursor-pointer ${
                      isToday(date) ? 'bg-primary text-primary-foreground' : ''
                    }`}
                  >
                    <div className="font-medium">{date}</div>
                    {dayEvents.length > 0 && (
                      <div className="flex gap-1 mt-1 justify-center">
                        {dayEvents.slice(0, 2).map((event, idx) => (
                          <div
                            key={idx}
                            className={`w-1 h-1 rounded-full ${getCategoryColor(event.category)}`}
                          ></div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
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
                      <h5 className="font-medium text-sm">{event.title}</h5>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.date).toLocaleDateString()} at {formatEventTime(event.time)}
                      </p>
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
