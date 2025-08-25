// This script is used to seed the Firestore database with initial product data.
// To run it, use: npm run db:seed

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { products } from './placeholder-data'; // Using the same placeholder data

// IMPORTANT:
// 1. Download your service account key JSON file from the Firebase console:
//    Project settings > Service accounts > Generate new private key.
// 2. Save it as 'serviceAccountKey.json' in the root of your project.
// 3. Make sure to add 'serviceAccountKey.json' to your .gitignore file
//    to prevent it from being committed to version control.

// This is a placeholder for the service account key.
// The script will try to load it from a file at the root of the project.
let serviceAccount: any;
try {
    serviceAccount = require('../../serviceAccountKey.json');
} catch (e) {
    console.error("Error: `serviceAccountKey.json` not found.");
    console.log("Please download your service account key from the Firebase console and save it as `serviceAccountKey.json` in the project root.");
    process.exit(1);
}


initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const productsCollection = db.collection('products');

async function seedDatabase() {
    console.log("Starting to seed database...");

    const existingProducts = await productsCollection.get();
    if (!existingProducts.empty) {
        console.log("Products collection is not empty. Aborting seeding.");
        return;
    }

    const batch = db.batch();

    products.forEach((product) => {
        // Use the product's string ID as the document ID in Firestore
        const docRef = productsCollection.doc(product.id);
        batch.set(docRef, product);
    });

    try {
        await batch.commit();
        console.log(`Successfully seeded ${products.length} products.`);
    } catch (error) {
        console.error("Error seeding database: ", error);
    }
}

seedDatabase();
