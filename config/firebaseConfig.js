// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Import neccessary FireBase services.
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5z8vh5ma5r8UItVjQ6tT4GzviTv8M5d0",
  authDomain: "cpan213-crossplatformmobiledev.firebaseapp.com",
  projectId: "cpan213-crossplatformmobiledev",
  storageBucket: "cpan213-crossplatformmobiledev.firebasestorage.app",
  messagingSenderId: "323674886076",
  appId: "1:323674886076:web:238c7ec1e51b64496ee5b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Associate Firestore with App.
export const db = getFirestore(app);