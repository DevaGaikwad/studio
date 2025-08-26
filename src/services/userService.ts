
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
// This is a server-side only file.

let serviceAccount: any;
try {
    // This is running on the server, so we can use require.
    serviceAccount = require('../../../serviceAccountKey.json');
} catch (e) {
    console.error("Admin SDK setup error: `serviceAccountKey.json` not found.");
    // In a real app, you might want to handle this more gracefully.
    // For now, we'll let it fail during development if the file is missing.
    if (process.env.NODE_ENV === 'production') {
        throw new Error("serviceAccountKey.json is missing for production build.");
    }
}

// Initialize Firebase Admin SDK if not already initialized
if (!getApps().length) {
    initializeApp({
        credential: cert(serviceAccount)
    });
}


export async function getAllUsers() {
    const auth = getAuth();
    const userRecords = await auth.listUsers();
    const users = userRecords.users.map(user => user.toJSON());
    return users as any[]; // Type assertion to match UserInfo from client sdk for simplicity
}
