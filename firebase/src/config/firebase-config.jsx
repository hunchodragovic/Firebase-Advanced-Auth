// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB14cYddqwy5lZhdOFyhhTPqNtThGAnnMI",
  authDomain: "fir-auth-f92a5.firebaseapp.com",
  projectId: "fir-auth-f92a5",
  storageBucket: "fir-auth-f92a5.firebasestorage.app",
  messagingSenderId: "277929713660",
  appId: "1:277929713660:web:9706e736d86b06ab2a5c79",
  measurementId: "G-QGCX1W08PS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
