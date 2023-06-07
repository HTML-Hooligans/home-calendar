import React, { ReactElement, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { formatDate, isSameDay } from '../../utils/calendarUtils';
import eventsApi from '../../api/eventsApi';
import { Event, EventForm } from '../../types/events';
import AddEventForm from '../../components/forms/AddEventForm';
import { useUser } from '../../hooks/useUser';
import getAuthErrorMessage from '../../utils/getAuthErrorMessage';
import { showToast } from '../../utils/showToast';
import Modal from '../../ui/Modal/Modal';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { CardContent, Menu, MenuItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Dashboard(): ReactElement {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);
  const [activeDay, setActiveDay] = useState<string>();
  const { userId } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event: any) => {
    setMenuOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
    setAnchorEl(null);
  };

  const handleDelete = () => {
    console.log('Delete');
  };

  const handleEdit = () => {
    console.log('Edit');
  };

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
      // setIsModalOpen(true);
      setIsPreviewOpen(true);
      console.log(activeEvent);
    } else {
      setActiveEvent(null);
      setActiveDay(formatDate(day));
      setIsPreviewOpen(false);
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
      {isPreviewOpen ? (
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={<Avatar sx={{ backgroundColor: red[500] }} aria-label="recipe" />}
            action={
              <Box>
                <IconButton aria-label="settings" onClick={handleMenuOpen}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={handleDelete}>Delete</MenuItem>
                  <MenuItem onClick={handleEdit}>Edit</MenuItem>
                </Menu>
              </Box>
            }
            title={activeEvent?.eventName}
            subheader={activeEvent?.eventDate}
          />
          <CardContent>
            <Typography variant="body2">{activeEvent?.description}</Typography>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
