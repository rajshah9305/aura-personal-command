
import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay, addMonths, subMonths } from 'date-fns';

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: 'meeting' | 'personal' | 'work' | 'other';
  location?: string;
  attendees?: number;
}

export const EnhancedCalendarWidget: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Team Meeting',
      date: new Date(),
      time: '10:00 AM',
      type: 'meeting',
      location: 'Conference Room A',
      attendees: 5
    },
    {
      id: '2',
      title: 'Project Review',
      date: new Date(Date.now() + 86400000),
      time: '2:00 PM',
      type: 'work',
      attendees: 3
    }
  ]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500';
      case 'personal': return 'bg-green-500';
      case 'work': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="widget-card p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold">Calendar</h3>
        </div>
        <button
          onClick={() => setShowEventForm(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Event
        </button>
      </div>

      <div className="flex-1 space-y-4">
        {/* Calendar Header */}
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-medium">
            {format(currentDate, 'MMMM yyyy')}
          </h4>
          <div className="flex gap-1">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {monthDays.map(day => {
            const dayEvents = getEventsForDate(day);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            
            return (
              <button
                key={day.toISOString()}
                onClick={() => setSelectedDate(day)}
                className={`
                  p-2 min-h-[60px] text-left rounded-lg transition-colors relative
                  ${!isSameMonth(day, currentDate) ? 'text-muted-foreground/50' : ''}
                  ${isToday(day) ? 'bg-primary text-primary-foreground' : ''}
                  ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}
                  ${!isToday(day) && !isSelected ? 'hover:bg-accent' : ''}
                `}
              >
                <span className="text-sm font-medium">{format(day, 'd')}</span>
                {dayEvents.length > 0 && (
                  <div className="mt-1 space-y-1">
                    {dayEvents.slice(0, 2).map(event => (
                      <div
                        key={event.id}
                        className={`w-full h-1.5 rounded-full ${getEventTypeColor(event.type)}`}
                      />
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{dayEvents.length - 2} more
                      </div>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Date Events */}
        {selectedDate && (
          <div className="mt-6 p-4 bg-accent rounded-lg">
            <h5 className="font-medium mb-3">
              Events for {format(selectedDate, 'MMMM d, yyyy')}
            </h5>
            <div className="space-y-2">
              {getEventsForDate(selectedDate).map(event => (
                <div key={event.id} className="flex items-center gap-3 p-2 bg-background rounded">
                  <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)}`} />
                  <div className="flex-1">
                    <p className="font-medium">{event.title}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </span>
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </span>
                      )}
                      {event.attendees && (
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {event.attendees}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {getEventsForDate(selectedDate).length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  No events scheduled for this day
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Event Form Modal */}
      {showEventForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border border-border rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Event</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Event Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Enter event title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Time</label>
                <input
                  type="time"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <select className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="meeting">Meeting</option>
                  <option value="personal">Personal</option>
                  <option value="work">Work</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEventForm(false)}
                  className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
