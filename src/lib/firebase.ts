import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  "projectId": "bombay-cloths",
  "appId": "1:743478873263:web:002d8376fa2b31157e985a",
  "storageBucket": "bombay-cloths.firebasestorage.app",
  "apiKey": "AIzaSyA_1dTrH5Rfpwh2EqxD_t1OfKwc9wyRAo8",
  "authDomain": "bombay-cloths.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "743478873263"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
