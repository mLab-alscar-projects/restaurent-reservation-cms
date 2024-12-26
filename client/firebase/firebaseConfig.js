
import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA79Nf7JGxorYZ0yd-Ld4ZEdAOSHmNhnYQ",
    authDomain: "employee-registration-23309.firebaseapp.com",
    projectId: "employee-registration-23309",
    storageBucket: "employee-registration-23309.appspot.com",
    messagingSenderId: "550538282993",
    appId: "1:550538282993:web:2ff802b876725a52ace650",
    measurementId: "G-SQWE3DVCZ9"
};

// Initialize Firebase app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

 export const storage = getStorage(app);

export default app;