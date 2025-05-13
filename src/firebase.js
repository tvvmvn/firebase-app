// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBexVX73dB4nMnf-VisFIAmLtkxH12W0dU",
  authDomain: "instagram-8a332.firebaseapp.com",
  projectId: "instagram-8a332",
  storageBucket: "instagram-8a332.firebasestorage.app",
  messagingSenderId: "588187827486",
  appId: "1:588187827486:web:16baa90de21f03f1a79d0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)