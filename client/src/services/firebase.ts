import { initializeApp } from 'firebase/app';
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from 'firebase/auth';
import googleAuthProvider from './googleAuthProvider';

type ParamsWithoutFirst<T extends (...args: any[]) => any> = Parameters<T> extends [any, ...infer R]
  ? R
  : never;

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const firebase = {
  auth: {
    instance: auth,

    signOut: (...args: ParamsWithoutFirst<typeof signOut>) => signOut(auth, ...args),

    signInWithPopup: () => signInWithPopup(auth, googleAuthProvider),

    signInWithEmailAndPassword: (...args: ParamsWithoutFirst<typeof signInWithEmailAndPassword>) =>
      signInWithEmailAndPassword(auth, ...args),

    createUserWithEmailAndPassword: (
      ...args: ParamsWithoutFirst<typeof createUserWithEmailAndPassword>
    ) => createUserWithEmailAndPassword(auth, ...args),
  },
};
