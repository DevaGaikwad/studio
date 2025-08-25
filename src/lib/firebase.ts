import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// This is a public configuration and is safe to expose.
// Security is handled by Firebase Security Rules and App Check.
const firebaseConfig = {
  projectId: "bombay-cloths",
  appId: "1:743478873263:web:002d8376fa2b31157e985a",
  storageBucket: "bombay-cloths.firebasestorage.app",
  apiKey: "AIzaSyA_1dTrH5Rfpwh2EqxD_t1OfKwc9wyRAo8",
  authDomain: "bombay-cloths.firebaseapp.com",
  messagingSenderId: "743478873263",
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
