import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Updated Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzDFQSBTsefhZjQ54O-oYdPidzeI6sU8M",
    authDomain: "civildoctor-bf649.firebaseapp.com",
    projectId: "civildoctor-bf649",
    storageBucket: "civildoctor-bf649.firebasestorage.app",
    messagingSenderId: "699788183616",
    appId: "1:699788183616:web:1c738c204124815c2cb7a5",
    measurementId: "G-7BYMWETNDB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export services for use in the app
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export { analytics };
export default app;

