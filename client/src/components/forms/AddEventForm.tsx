import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '../../ui/Button/Button';
import { EventForm } from '../../types/events';

interface Props {
  onSuccess: (values: EventForm) => void;
  initialValues?: EventForm;
  submitText: string;
  isLoading?: boolean;
  day?: string;
}

const AddEventForm = ({ onSuccess, initialValues, submitText, isLoading, day }: Props) => {
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const minDate = new Date();
  // todo add logic to check actual hour
  minDate.setHours(0, 0, 0, 0);

  const formik = useFormik({
    initialValues: {
      eventName: initialValues?.eventName || '',
      description: initialValues?.description || '',
      eventDate: day || initialValues?.eventDate || '',
    },
    validationSchema: Yup.object().shape({
      eventName: Yup.string().required('Name is required').max(30, 'Name is too long'),
      description: Yup.string(),
      eventDate: Yup.date()
        .required('Event date is required')
        .min(minDate, 'Event cannot be planned for the past.')
        .max(maxDate, 'Event is too far in the future'),
    }),
    validateOnChange: true,
    onSubmit: async (values) => {
      if (onSuccess) {
        onSuccess(values);
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
          disabled
        />

        <Button fullWidth type="submit" loading={isLoading} disabled={isLoading}>
          {submitText}
        </Button>
      </form>
    </div>
  );
};

export default AddEventForm;
