import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login, logout, selectIsLoggedIn, selectUser } from '../features/user/userSlice';
import { firebase } from '../services/firebase';

export function useUser() {
  const user = useAppSelector(selectUser);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const logOutUser = async () => {
    await firebase.auth.instance.signOut();
    // todo handle logout with toast and redirect?
  };

  useEffect(() => {
    const unsubscribe = firebase.auth.instance.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        console.log(userAuth);
        dispatch(
          login({
            id: userAuth.uid,
            displayName: userAuth.displayName,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return {
    isLoggedIn,
    user,
    logOutUser,
  };
}
