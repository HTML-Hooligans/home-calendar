import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { useUser } from '../../hooks/useUser';
import { showToast } from '../../utils/showToast';
import getAuthErrorMessage from '../../utils/getAuthErrorMessage';
import TextField from '@mui/material/TextField';
import Button from '../../ui/Button/Button';
import eventsApi from '../../api/eventsApi';

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
    },
    validationSchema: Yup.object().shape({
      eventName: Yup.string().required('Name is required').max(30, 'Name is too long'),
      description: Yup.string().required('Description is required'),
      eventDate: Yup.date()
        .required('Deadline is required')
        .min(new Date(), 'Deadline must be in the future')
        .max(maxDate, 'Deadline is too far in the future'),
    }),
    validateOnChange: true,
    onSubmit: async (values) => {
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
    <div
      style={{
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
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
