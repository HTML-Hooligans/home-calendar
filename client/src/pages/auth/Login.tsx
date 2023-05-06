import React, { ReactElement, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import { firebase } from '../../services/firebase';
import { useUser } from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../utils/showToast';
import getAuthErrorMessage from '../../utils/getAuthErrorMessage';
import Button from '../../ui2/Button/Button';

function Login(): ReactElement {
  const { isLoggedIn } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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
      try {
        setIsLoading(true);
        await firebase.auth.signInWithEmailAndPassword(values.email, values.password);
      } catch (e) {
        showToast('error', getAuthErrorMessage(e));
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleRegisterWithGoogle = async () => {
    try {
      await firebase.auth.signInWithPopup();
    } catch (e) {
      showToast('error', getAuthErrorMessage(e));
    }
  };

  useEffect(() => {
    isLoggedIn && navigate('/');
  }, [isLoggedIn]);

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

        <Button fullWidth type="submit" loading={isLoading}>
          Submit
        </Button>

        <Button fullWidth onClick={handleRegisterWithGoogle}>
          Sign in with Google
        </Button>
      </form>
    </div>
  );
}

export default Login;
