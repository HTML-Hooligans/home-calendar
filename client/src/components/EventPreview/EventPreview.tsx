import React, { FC, Fragment, useState } from 'react';
import { formatDate, isSameDay } from '../../utils/calendarUtils';
import AddEventForm from '../forms/AddEventForm';
import Modal from '../../ui/Modal/Modal';
import { Event, EventForm } from '../../types/events';
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
  setActiveEvent: React.Dispatch<React.SetStateAction<Event | null>>;
  events: Event[];
  setEvents: (updatedEvents: Event[]) => void;
}

const EventPreview: FC<Props> = ({ activeEvent, setActiveEvent, setEvents, events }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const modalTitle = isEditing ? 'Edit' : 'Are you sure to delete event?';
  const isEventDateAfterToday =
    isSameDay(activeEvent.eventDate, new Date()) || new Date(activeEvent.eventDate) > new Date();

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleUpdateEvent = async (eventId: number, updatedData: EventForm) => {
    try {
      setIsLoading(true);
      const updateCurrentEditedEvent = { ...activeEvent, ...updatedData };
      const updatedEvent = await eventsApi.updateEvent(updateCurrentEditedEvent);
      setActiveEvent(updateCurrentEditedEvent);
      const updatedEvents = events.map((event) =>
        event.id === eventId ? { ...event, ...updatedEvent } : event
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
    if (activeEvent) {
      try {
        await eventsApi.deleteEvent(eventId);
        setEvents(events.filter((event) => event.id !== eventId));
        showToast('success', 'Event deleted successfully');
        setActiveEvent(null);
      } catch (e) {
        showToast('error', 'Failed to delete event');
      }
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
          <AddEventForm
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
