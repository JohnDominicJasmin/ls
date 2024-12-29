import { Platform } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebase from '@react-native-firebase/app';
import { getDatabase } from "firebase/database";
import { getAnalytics } from 'firebase/analytics';
const firebaseConfig = {
    apiKey: "AIzaSyA5dzBBalkN5LkqzpYJEhUYalF7iTpnpao",
    authDomain: "jobseek-2d1c1.firebaseapp.com",
    databaseURL: "https://jobseek-2d1c1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "jobseek-2d1c1",
    storageBucket: "jobseek-2d1c1.firebasestorage.app",
    messagingSenderId: "128941670798",
    appId: "1:128941670798:web:7fe23770b9ff66cd8a64df",
    measurementId: "G-GS938P6W5F"
  };

let firebaseApp;
let firebaseAuth;
let firebaseFirestore;
let firebaseStorage;
let firebaseDb;
function initFirebase() {
  console.log('Initializing Firebase...');

  if (Platform.OS === 'web') {
    // Web-specific Firebase initialization
    if (!firebaseApp) {
      console.log('Connecting with Firebase (Web)');
      firebaseApp = initializeApp(firebaseConfig); // Initialize Firebase Web SDK
      getAnalytics(firebaseApp); // Optional for analytics on the web
      firebaseAuth = getAuth(firebaseApp); // Get Firebase Auth service

        firebaseFirestore = getFirestore(firebaseApp); // Get Firebase Firestore service
        firebaseStorage = getStorage(firebaseApp); // Get Firebase Storage service
        firebaseDb = getDatabase(firebaseApp); // Get Firebase Realtime Database service

    } else {
      console.log('Already connected with Firebase (Web)');
    }
  } else {
    // React Native (Mobile) Firebase initialization
    if (!firebase.apps.length) {
      console.log('Connecting with Firebase (Mobile)');
      firebaseApp = firebase.initializeApp(firebaseConfig); // Initialize Firebase Mobile SDK
    } else {
      console.log('Already connected with Firebase (Mobile)');
      firebaseApp = firebase.app() // Use the default Firebase app
    }
  }
}

export {initFirebase, firebaseApp, firebaseAuth, firebaseFirestore, firebaseStorage, firebaseDb};
