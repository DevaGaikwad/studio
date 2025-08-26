
'use server';

import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
// This is a server-side only file.

let adminAppInitialized = false;

const initializeAdminApp = () => {
    // Check if the admin app is already initialized, in memory or on another serverless instance.
    if (getApps().some(app => app.name === 'admin')) {
        return getApps().find(app => app.name === 'admin');
    }

    try {
        // This is running on the server, so we can use require.
        // It will only be attempted once per server instance.
        const serviceAccount = require('../../../serviceAccountKey.json');
        
        return initializeApp({
            credential: cert(serviceAccount)
        }, 'admin');

    } catch (e) {
        console.warn("Could not find serviceAccountKey.json. Admin features like user listing will be disabled in local development. This is not an error and is expected if you have not set up a service account.");
        return null; // Gracefully exit if service account is not found
    }
};


export async function getAllUsers() {
    const adminApp = initializeAdminApp();
    
    if (!adminApp) {
      console.log('Admin app not initialized, returning empty user list.');
      return [];
    }
    
    const auth = getAuth(adminApp);
    
    try {
        const userRecords = await auth.listUsers();
        const users = userRecords.users.map(user => user.toJSON());
        return users as any[]; // Type assertion to match UserInfo from client sdk for simplicity
    } catch(error) {
        console.error("Error fetching users with Admin SDK:", error);
        return [];
    }
}
