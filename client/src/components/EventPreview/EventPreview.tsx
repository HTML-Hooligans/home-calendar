import React, { FC, Fragment, useState } from 'react';
import { isAfter, isToday, parseISO } from 'date-fns';
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
import { red } from '@mui/material/colors';
import Button from '@mui/material/Button';

interface Props {
  activeEvent: Event;
  updateActiveEvent: React.Dispatch<React.SetStateAction<Event | null>>;
  events: Event[];
  updateEvents: (updatedEvents: Event[]) => void;
}

const EventPreview: FC<Props> = ({ activeEvent, updateActiveEvent, updateEvents, events }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const modalTitle = isEditing ? 'Edit' : 'Are you sure to delete event?';
  const isEventDateAfterToday =
    isAfter(parseISO(activeEvent.eventDate), new Date()) ||
    isToday(parseISO(activeEvent.eventDate));

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleUpdateEvent = async (eventId: number, updatedData: EventForm) => {
    if (activeEvent) {
      try {
        setIsLoading(true);
        const updateCurrentEditedEvent = { ...activeEvent, ...updatedData };
        updateActiveEvent(updateCurrentEditedEvent);
        const [updatedEvent] = await Promise.all([eventsApi.updateEvent(eventId, updatedData)]);
        const updatedEvents = events.map((event) =>
          event.id === eventId ? { ...event, ...updatedEvent } : event
        );
        updateEvents(updatedEvents);
        showToast('success', 'Event updated successfully');
      } catch (e) {
        showToast('error', 'Failed to update event');
      } finally {
        setIsLoading(false);
        setIsModalOpen(false);
        setIsEditing(false);
      }
    }
  };

  const handleDeleteEvent = async (eventId: number) => {
    if (activeEvent) {
      try {
        await eventsApi.deleteEvent(eventId);
        updateEvents(events.filter((event) => event.id !== eventId));
        showToast('success', 'Event deleted successfully');
        updateActiveEvent(null);
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
                  <EditIcon sx={{ color: '#1976d2' }} />
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
          subheader={activeEvent.eventDate}
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
            onSuccess={(values) => handleUpdateEvent(activeEvent.id || 0, values)}
            submitText="Update"
            isLoading={isLoading}
            initialValues={activeEvent}
          />
        ) : (
          <Fragment>
            <Button
              sx={{ mx: 2 }}
              variant="contained"
              onClick={() => activeEvent && handleDeleteEvent(activeEvent.id)}
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
