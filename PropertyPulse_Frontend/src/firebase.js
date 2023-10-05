// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "propertypusle.firebaseapp.com",
  projectId: "propertypusle",
  storageBucket: "propertypusle.appspot.com",
  messagingSenderId: "994916116777",
  appId: "1:994916116777:web:551c148021497115826f38",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
