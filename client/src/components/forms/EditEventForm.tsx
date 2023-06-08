import React, { FC } from 'react';
import { Event } from '../../types/events';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface Props {
  eventData: Partial<Event>;
  setEventData: (eventData: (prevData: Partial<Event>) => Partial<Event>) => void;
  eventDate: string;
}

const EditEventForm: FC<Props> = ({
  eventData: { description, eventName },
  setEventData,
  eventDate,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <TextField
        name="eventName"
        label="Event Name"
        value={eventName || ''}
        onChange={handleInputChange}
      />
      <Typography>{eventDate}</Typography>
      <TextField
        name="description"
        label="Description"
        value={description || ''}
        onChange={handleInputChange}
      />
    </Box>
  );
};

export default EditEventForm;
