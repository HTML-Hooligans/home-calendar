import React, { ReactElement, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import Modal from '../../ui/Modal/Modal';
import EventPreview from '../../components/EventPreview/EventPreview';
import { formatDate, isSameDay } from '../../utils/calendarUtils';
import eventsApi from '../../api/eventsApi';
import { Event, EventForm } from '../../types/events';
import AddEventForm from '../../components/forms/AddEventForm';
import { useUser } from '../../hooks/useUser';
import getAuthErrorMessage from '../../utils/getAuthErrorMessage';
import { showToast } from '../../utils/showToast';
import Box from '@mui/material/Box';

export default function Dashboard(): ReactElement {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);
  const [activeDay, setActiveDay] = useState<string>();
  const { userId } = useUser();
  const modalTitle = activeEvent ? 'Event Preview' : 'Add Event';

  useEffect(() => {
    if (events.length === 0 && userId) {
      eventsApi
        .fetchEvents(userId)
        .then((response) => setEvents(response))
        .catch((e) => {
          showToast('error', getAuthErrorMessage(e));
        });
    }
  }, [userId]);

  const mapEventsToCalendarView = ({ date, view }: { date: Date; view: string }) => {
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
    // todo add logic for returning all events for that day
    const event = events.find((event) => formatDate(event.eventDate) === formatDate(day));

    if (event) {
      // todo: if there is a event, show event preview with options to delete or edit event
      setActiveDay(undefined);
      setActiveEvent(event);
      console.log(activeEvent);
    } else {
      setActiveEvent(null);
      setActiveDay(formatDate(day));
      setIsModalOpen(true);
    }
  };

  const handleAddEvent = async (values: EventForm) => {
    if (activeEvent) return;

    try {
      setIsLoading(true);
      const payload = {
        ...values,
        userID: userId!,
      };
      const newEvent: Event = await eventsApi.addEvent(payload);
      setEvents(() => [...events, newEvent]);
    } catch (e) {
      showToast('error', getAuthErrorMessage(e));
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <div>Dashboard</div>

      <Calendar
        tileContent={mapEventsToCalendarView}
        onClickDay={(value) => handleDayClick(value)}
      />

      <Modal open={isModalOpen} title={modalTitle} onClose={() => setIsModalOpen(false)}>
        <AddEventForm
          onSuccess={handleAddEvent}
          submitText="Submit"
          isLoading={isLoading}
          initialValues={activeEvent || undefined}
          day={activeDay}
        />
      </Modal>
      {activeEvent && (
        <Box style={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
          <EventPreview
            activeEvent={activeEvent}
            updateActiveEvent={setActiveEvent}
            updateEvents={setEvents}
            events={events}
          />
        </Box>
      )}
    </div>
  );
}
