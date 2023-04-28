import React, { ReactElement } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { firebase } from '../../services/firebase';

function Login(): ReactElement {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Please enter a valid email address.').required('Required.'),
      password: Yup.string().required('Required.').min(8, 'At least 8 characters'),
    }),
    validateOnChange: true,
    onSubmit: async (values) => {
      // todo add errors handler
      await firebase.auth.signInWithEmailAndPassword(values.email, values.password);
      // todo add toast component with success message
    },
  });

  const handleRegisterWithGoogle = async () => {
    // todo add errors handler
    await firebase.auth.signInWithPopup();
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>

        <Button color="primary" variant="contained" fullWidth onClick={handleRegisterWithGoogle}>
          Sign in with Google
        </Button>
      </form>
    </div>
  );
}

export default Login;
