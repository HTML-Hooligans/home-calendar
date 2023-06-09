import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  login,
  logout,
  selectIsLoggedIn,
  selectUser,
  selectUserId,
} from '../features/user/userSlice';
import { firebase } from '../services/firebase';
import { useNavigate, useLocation } from 'react-router-dom';

export function useUser() {
  const user = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const userId = useAppSelector(selectUserId);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // todo: edit protected routes
  const protectedRoutes = ['/dashboard'];

  const logOutUser = () => {
    firebase.auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = firebase.auth.instance.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            id: userAuth.uid,
            displayName: userAuth.displayName,
            email: userAuth.email,
          })
        );
        userAuth.getIdToken().then((token) => {
          window.localStorage.setItem('token', token);
        });
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    if (protectedRoutes.includes(pathname) && isLoggedIn === false) {
      navigate('/auth/login');
    }
  }, [isLoggedIn, navigate, pathname]);

  return {
    isLoggedIn,
    user,
    logOutUser,
    userId,
  };
}
