import React, { ReactElement, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { formatDate, isSameDay } from '../../utils/calendarUtils';
import eventsApi from '../../api/eventsApi';
import { Event } from '../../types/events';
import EventForm from '../../components/Forms/EventForm';
import { useUser } from '../../hooks/useUser';

interface CalendarViewMappingProps {
  date: Date;
  view: string;
}

export default function Dashboard(): ReactElement {
  const [events, setEvents] = useState<Event[]>([]);
  const { userId } = useUser();

  useEffect(() => {
    if (events.length === 0 && userId) {
      eventsApi.fetchEvents(userId).then((response) => setEvents(response));
    }
  }, [userId]);

  const mapEventsToCalendarView = ({ date, view }: CalendarViewMappingProps) => {
    if (view === 'month' && events.length > 0) {
      if (events.find((calendarEvent) => isSameDay(calendarEvent.eventDate, date))) {
        // todo add some icon or text?
        return <p>Event</p>;
      }
    } else {
      return null;
    }
  };

  const handleDayClick = (day: Date) => {
    const event = events.find((event) => formatDate(event.eventDate) === formatDate(day));

    if (event) {
      // todo add modal with event form
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
      <EventForm />
    </div>
  );
}
