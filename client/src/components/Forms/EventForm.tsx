import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { useUser } from '../../hooks/useUser';
import { showToast } from '../../utils/showToast';
import getAuthErrorMessage from '../../utils/getAuthErrorMessage';
import TextField from '@mui/material/TextField';
import Button from '../../ui/Button/Button';
import eventsApi from '../../api/eventsApi';
import { NewEvent } from '../../types/events';

const NewEventForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useUser();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const formik = useFormik({
    initialValues: {
      eventName: '',
      description: '',
      eventDate: '',
      userID: '',
    },
    validationSchema: Yup.object().shape({
      eventName: Yup.string().required('Name is required').max(30, 'Name is too long'),
      description: Yup.string(),
      eventDate: Yup.date()
        .required('Deadline is required')
        .min(new Date(), 'Event cannot be planned for the past.')
        .max(maxDate, 'Event is too far in the future'),
    }),
    validateOnChange: true,
    onSubmit: async (values: NewEvent) => {
      try {
        setIsLoading(true);
        await eventsApi.addEvent({ ...values, userID: userId });
      } catch (e) {
        showToast('error', getAuthErrorMessage(e));
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="eventName"
          name="eventName"
          label="Event Name"
          value={formik.values.eventName}
          onChange={formik.handleChange}
          error={formik.touched.eventName && Boolean(formik.errors.eventName)}
          helperText={formik.touched.eventName && formik.errors.eventName}
        />
        <TextField
          fullWidth
          id="description"
          name="description"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <TextField
          fullWidth
          id="eventDate"
          name="eventDate"
          label="Event Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          value={formik.values.eventDate}
          onChange={formik.handleChange}
          error={formik.touched.eventDate && Boolean(formik.errors.eventDate)}
          helperText={formik.touched.eventDate && formik.errors.eventDate}
        />

        <Button fullWidth type="submit" loading={isLoading}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default NewEventForm;
