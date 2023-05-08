import { Formik, Form, Field } from 'formik';
import useAddEvent from '../../hooks/useAddEvent';
import { useEffect, useState } from 'react';
import { useUser } from '../../hooks/useUser';

interface NewEvent {
  eventName: string;
  eventDate: string;
  description: string;
}

const NewEventForm = () => {
  const [userID, setUserID] = useState<string | undefined>();
  const today = new Date().toISOString().split('T')[0];

  const { user } = useUser();
  useEffect(() => {
    if (user) {
      setUserID(user.id);
    }
  }, [user, userID]);

  const initialValues: NewEvent = {
    eventName: '',
    eventDate: today,
    description: '',
  };

  const handleSubmit = (values: NewEvent, { resetForm }: { resetForm: () => void }) => {
    const newEvent = { ...values, userID: userID };
    useAddEvent(newEvent);
    resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <div>
          <label htmlFor="eventName">Event Name:</label>
          <Field type="text" name="eventName" />
        </div>

        <div>
          <label htmlFor="eventDate">Event Date:</label>
          <Field type="date" name="eventDate" min={today} />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <Field as="textarea" name="description" />
        </div>

        <button type="submit">Add Event</button>
      </Form>
    </Formik>
  );
};

export default NewEventForm;
