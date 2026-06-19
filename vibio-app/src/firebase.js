import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu231xZ7ZTNkT_2_YYGYkc7DmwRcQSvv4",
  authDomain: "vibio-6d50b.firebaseapp.com",
  databaseURL: "https://vibio-6d50b-default-rtdb.firebaseio.com",
  projectId: "vibio-6d50b",
  storageBucket: "vibio-6d50b.firebasestorage.app",
  messagingSenderId: "243838856863",
  appId: "1:243838856863:web:2a2319bb4940fef2427caa",
  measurementId: "G-VM8J2DC759"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };
