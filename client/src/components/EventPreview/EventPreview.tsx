import React, { FC, useState } from 'react';
import { Event } from '../../types/events';
import EditEventForm from '../forms/EditEventForm';
import { showToast } from '../../utils/showToast';
import eventsApi from '../../api/eventsApi';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { CardContent, Menu, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

interface Props {
  activeEvent: Event;
  updateActiveEvent: React.Dispatch<React.SetStateAction<Event | null>>;
  events: Event[];
  updateEvents: (updatedEvents: Event[]) => void;
}

const EventPreview: FC<Props> = ({ activeEvent, updateActiveEvent, updateEvents, events }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [previewCardMenuOpen, setPreviewCardMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState<Partial<Event>>({});

  const handlePreviewMenuToggle = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setPreviewCardMenuOpen((prevState) => !prevState);
    if (previewCardMenuOpen) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedEvent(activeEvent);
    setPreviewCardMenuOpen((prevState) => !prevState);
    setAnchorEl(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedEvent({});
  };

  const handleUpdateEvent = async () => {
    if (activeEvent) {
      try {
        await eventsApi.updateEvent(activeEvent.id, editedEvent);
        setIsEditing(false);
        const updateCurrentEditedEvent = { ...activeEvent, ...editedEvent };
        updateActiveEvent(updateCurrentEditedEvent);
        const updatedEvents = events.map((event) =>
          event.id === activeEvent.id ? updateCurrentEditedEvent : event
        );
        updateEvents(updatedEvents);
      } catch (error) {
        console.error(error);
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
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <Box>
            <IconButton aria-label="settings" onClick={handlePreviewMenuToggle}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={previewCardMenuOpen}
              onClose={handlePreviewMenuToggle}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={() => activeEvent && handleDeleteEvent(activeEvent.id)}>
                Delete
              </MenuItem>
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
            </Menu>
          </Box>
        }
        title={
          isEditing ? (
            <EditEventForm
              eventData={editedEvent}
              setEventData={setEditedEvent}
              eventDate={activeEvent.eventDate}
            />
          ) : (
            activeEvent.eventName
          )
        }
        subheader={isEditing ? null : activeEvent.eventDate}
      />
      <CardContent>
        {isEditing ? (
          <Box>
            <IconButton onClick={handleUpdateEvent}>
              <SaveIcon />
            </IconButton>
            <IconButton onClick={handleCancelEdit}>
              <CancelIcon />
            </IconButton>
          </Box>
        ) : (
          activeEvent && <Typography variant="body2">{activeEvent.description}</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default EventPreview;
