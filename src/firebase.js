// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBexVX73dB4nMnf-VisFIAmLtkxH12W0dU",
  authDomain: "instagram-8a332.firebaseapp.com",
  projectId: "instagram-8a332",
  storageBucket: "instagram-8a332.appspot.com",
  messagingSenderId: "588187827486",
  appId: "1:588187827486:web:16baa90de21f03f1a79d0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;