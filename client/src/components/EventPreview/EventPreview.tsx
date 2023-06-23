import React, { Dispatch, FC, Fragment, SetStateAction, useState } from 'react';
import { formatDate, isSameDay } from '../../utils/calendarUtils';
import EventForm from '../forms/EventForm';
import Modal from '../../ui/Modal/Modal';
import { Event, EventFormData } from '../../types/events';
import { showToast } from '../../utils/showToast';
import eventsApi from '../../api/eventsApi';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { red, blue } from '@mui/material/colors';
import Button from '@mui/material/Button';

interface Props {
  activeEvent: Event;
  setActiveEvent: Dispatch<SetStateAction<Event | null>>;
  events: Event[];
  setEvents: (events: Event[]) => void;
}

const EventPreview: FC<Props> = ({ activeEvent, setActiveEvent, setEvents, events }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const modalTitle = isEditing ? 'Edit' : 'Are you sure to delete event?';
  const isEventDateAfterToday =
    isSameDay(activeEvent.eventDate, new Date()) || new Date(activeEvent.eventDate) > new Date();

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleUpdateEvent = async (activeEventId: number, updatedData: EventFormData) => {
    try {
      setIsLoading(true);
      const updatedEventData = { ...activeEvent, ...updatedData };
      const updatedEvent = await eventsApi.updateEvent(updatedEventData);
      setActiveEvent(updatedEventData);
      const updatedEvents = events.map((event) =>
        event.id === activeEventId ? { ...event, ...updatedEvent } : event
      );
      setEvents(updatedEvents);
      showToast('success', 'Event updated successfully');
    } catch (e) {
      showToast('error', 'Failed to update event');
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
      setIsEditing(false);
    }
  };

  const handleDeleteEvent = async (eventId: number) => {
    try {
      await eventsApi.deleteEvent(eventId);
      setEvents(events.filter((event) => event.id !== eventId));
      showToast('success', 'Event deleted successfully');
      setActiveEvent(null);
    } catch (e) {
      showToast('error', 'Failed to delete event');
    }
  };

  return (
    <Fragment>
      <Card sx={{ maxWidth: 345, width: 1 }}>
        <CardHeader
          action={
            <Box>
              {isEventDateAfterToday && (
                <IconButton
                  aria-label="edit"
                  onClick={() => {
                    setIsEditing(true);
                    handleEdit();
                  }}
                >
                  <EditIcon sx={{ color: blue[700] }} />
                </IconButton>
              )}
              <IconButton
                aria-label="delete"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                <DeleteIcon sx={{ color: red[500] }} />
              </IconButton>
            </Box>
          }
          title={activeEvent.eventName}
          subheader={formatDate(activeEvent.eventDate)}
        />
        <CardContent style={{ display: activeEvent.description ? 'block' : 'none' }}>
          <Typography variant="body2">{activeEvent.description}</Typography>
        </CardContent>
      </Card>
      <Modal
        open={isModalOpen}
        title={modalTitle}
        onClose={() => {
          setIsModalOpen(false);
          setIsEditing(false);
        }}
      >
        {isEditing ? (
          <EventForm
            onSuccess={(values) => handleUpdateEvent(activeEvent.id, values)}
            submitText="Update"
            isLoading={isLoading}
            initialValues={activeEvent}
          />
        ) : (
          <Fragment>
            <Button
              sx={{ mx: 2 }}
              variant="contained"
              onClick={() => handleDeleteEvent(activeEvent.id)}
            >
              YES
            </Button>
            <Button
              sx={{ mx: 2 }}
              variant="contained"
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              NO
            </Button>
          </Fragment>
        )}
      </Modal>
    </Fragment>
  );
};

export default EventPreview;
