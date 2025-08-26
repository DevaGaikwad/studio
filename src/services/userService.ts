
'use server';

import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
// This is a server-side only file.

const initializeAdminApp = () => {
    const adminAppAlreadyInitialized = getApps().find(app => app.name === 'admin');
    if (adminAppAlreadyInitialized) {
        return adminAppAlreadyInitialized;
    }

    let serviceAccount: any;
    try {
        // This is running on the server, so we can use require.
        serviceAccount = require('../../../serviceAccountKey.json');
    } catch (e) {
        console.warn("Could not find serviceAccountKey.json. Admin features like user listing will be disabled in local development. This is not an error and is expected if you have not set up a service account.");
        return null; // Gracefully exit if service account is not found
    }
    
    try {
        // Initialize Firebase Admin SDK if not already initialized
        return initializeApp({
            credential: cert(serviceAccount)
        }, 'admin');
    } catch (error) {
        console.error("Firebase Admin SDK initialization error:", error);
        return null;
    }
};


export async function getAllUsers() {
    const adminApp = initializeAdminApp();
    if (!adminApp) {
      console.log('Admin app not initialized, returning empty user list.');
      return [];
    }
    const auth = getAuth(adminApp);
    const userRecords = await auth.listUsers();
    const users = userRecords.users.map(user => user.toJSON());
    return users as any[]; // Type assertion to match UserInfo from client sdk for simplicity
}
