import React, { ReactElement, useEffect, useState } from 'react';
import Modal from '../../ui/Modal/Modal';
import EventPreview from '../../components/EventPreview/EventPreview';
// import { formatDate, isDateInFuture, isSameDay } from '../../utils/calendarUtils';
import eventsApi from '../../api/eventsApi';
import { Event, EventFormData } from '../../types/events';
import EventForm from '../../components/forms/EventForm';
import { useUser } from '../../hooks/useUser';
import getAuthErrorMessage from '../../utils/getAuthErrorMessage';
import { showToast } from '../../utils/showToast';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as styles from './Dashboard.styles';
import MiniCalendar from '../../components/MiniCalendar/MiniCalendar';

export default function Dashboard(): ReactElement {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);
  // const [activeDay, setActiveDay] = useState<string>();
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

  // const mapEventsToCalendarView = ({ date, view }: { date: Date; view: string }) => {
  //   if (view === 'month' && events.length > 0) {
  //     if (events.find((calendarEvent) => isSameDay(calendarEvent.eventDate, date))) {
  //       // todo add some icon or text?
  //       // return <p className="test">Event</p>;
  //     }
  //   } else {
  //     return null;
  //   }
  // };

  // const handleDayClick = (day: Date) => {
  //   // todo add logic for returning all events for that day
  //   const event = events.find((event) => formatDate(event.eventDate) === formatDate(day));
  //
  //   if (event) {
  //     // todo: if there is a event, show event preview with options to delete or edit event
  //     setActiveDay(undefined);
  //     setActiveEvent(event);
  //   } else {
  //     const isDayAfterToday = isDateInFuture(day);
  //     setActiveEvent(null);
  //     setActiveDay(formatDate(day));
  //     setIsModalOpen(isDayAfterToday);
  //   }
  // };

  const handleAddEvent = async (values: EventFormData) => {
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
    <Box>
      <Typography variant="h4" align="center" style={{ marginTop: '20px' }} gutterBottom>
        Dashboard
      </Typography>
      <div css={styles.emotionStyles}>
        <MiniCalendar />
      </div>

      <Modal open={isModalOpen} title={modalTitle} onClose={() => setIsModalOpen(false)}>
        <EventForm
          onSuccess={handleAddEvent}
          submitText="Submit"
          isLoading={isLoading}
          initialValues={activeEvent || undefined}
          // day={activeDay}
        />
      </Modal>
      {activeEvent && (
        <Box style={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
          <EventPreview
            activeEvent={activeEvent}
            setActiveEvent={setActiveEvent}
            setEvents={setEvents}
            events={events}
          />
        </Box>
      )}
    </Box>
  );
}
