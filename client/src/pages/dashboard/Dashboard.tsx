import React, { ReactElement, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { formatDate, isSameDay } from '../../utils/calendarUtils';

interface CalendarViewMappingProps {
  date: Date;
  view: string;
}

interface Event {
  description: string;
  eventDate: string;
  eventName: string;
  id: number;
  userID: number;
}

export default function Dashboard(): ReactElement {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // todo add axios or react query + move fetch logic to services
    // todo think about storing data in redux or component?
    async function fetchEvents() {
      const response = await fetch('http://localhost:3001/v1/events');
      const events = await response.json();
      console.log(events);
      setEvents(events);
    }

    if (events.length === 0) {
      fetchEvents();
    }
  }, []);

  const mapEventsToCalendarView = ({ date, view }: CalendarViewMappingProps) => {
    if (view === 'month') {
      if (events.find((calendarEvent) => isSameDay(calendarEvent.eventDate, date))) {
        // todo add some icon or text?
        return <p>Event</p>;
      }
    } else {
      return null;
    }
  };

  const handleDayClick = (value: Date) => {
    const event = events.find((event) => formatDate(event.eventDate) === formatDate(value));

    if (event) {
      console.log(event);
    }
  };

  return (
    <div>
      <div>Dashboard</div>

      <Calendar
        tileContent={mapEventsToCalendarView}
        onClickDay={(value) => handleDayClick(value)}
      />
    </div>
  );
}
