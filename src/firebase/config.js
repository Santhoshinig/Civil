import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration provided by user
const firebaseConfig = {
    apiKey: "AIzaSyAxOf6aMfBka4TpwzwLvOVpU0__NmMZ2io",
    authDomain: "civil-doctor.firebaseapp.com",
    projectId: "civil-doctor",
    storageBucket: "civil-doctor.firebasestorage.app",
    messagingSenderId: "1043016511371",
    appId: "1:1043016511371:web:0a0d90314e864a2c54498e",
    measurementId: "G-0EC0ZRTFMM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export services for use in the app
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
