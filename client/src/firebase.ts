// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
} from 'firebase/auth';
import { getMessaging } from 'firebase/messaging';

type ParamsWithoutFirst<T extends (...args: any[]) => any> = Parameters<T> extends [any, ...infer R]
  ? R
  : never;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBkJ6pXGeO7HkedG5Sy59QLWstZ_zTyhc4',
  authDomain: 'home-calendar-5bc63.firebaseapp.com',
  projectId: 'home-calendar-5bc63',
  storageBucket: 'home-calendar-5bc63.appspot.com',
  messagingSenderId: '779208631995',
  appId: '1:779208631995:web:216a2388d9407ddf5b6b9e',
  measurementId: 'G-NDE86ZCVDH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const messaging = getMessaging(app);

export const firebase = {
  auth: {
    instance: auth,

    signOut: (...args: ParamsWithoutFirst<typeof signOut>) => signOut(auth, ...args),

    signInWithEmailAndPassword: (...args: ParamsWithoutFirst<typeof signInWithEmailAndPassword>) =>
      signInWithEmailAndPassword(auth, ...args),

    createUserWithEmailAndPassword: (
      ...args: ParamsWithoutFirst<typeof createUserWithEmailAndPassword>
    ) => createUserWithEmailAndPassword(auth, ...args),

    updateProfile: (...args: Parameters<typeof updateProfile>) => updateProfile(...args),
  },
  analytics: {
    instance: analytics,
    logEvent: (...args: ParamsWithoutFirst<typeof logEvent>) =>
      Promise.resolve(logEvent(analytics, ...args)),
  },
  messaging: {
    instance: messaging,
  },
};
