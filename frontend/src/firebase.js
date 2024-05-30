// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASREaa8Ee1Fva-hd_8oxybKrkOai3Ntqw",
  authDomain: "art-porject.firebaseapp.com",
  projectId: "art-porject",
  storageBucket: "art-porject.appspot.com",
  messagingSenderId: "484476521048",
  appId: "1:484476521048:web:302536fae86643b162d82d",
  measurementId: "G-PQ2ZTG63Z7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);