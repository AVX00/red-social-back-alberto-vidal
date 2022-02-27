require("dotenv").config();
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore/lite");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "social-react-aaa73.firebaseapp.com",
  projectId: "social-react-aaa73",
  storageBucket: "social-react-aaa73.appspot.com",
  messagingSenderId: "162460339599",
  appId: "1:162460339599:web:ee27500bab14eaf36d0ffa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebase = getFirestore(app);

module.exports = firebase;
