// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from '@react-native-firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5dzBBalkN5LkqzpYJEhUYalF7iTpnpao",
  authDomain: "jobseek-2d1c1.firebaseapp.com",
  projectId: "jobseek-2d1c1",
  storageBucket: "jobseek-2d1c1.firebasestorage.app",
  messagingSenderId: "128941670798",
  appId: "1:128941670798:web:7fe23770b9ff66cd8a64df",
  measurementId: "G-GS938P6W5F"
};

let firebaseApp;

if(!firebase.apps.length){
    console.log('Connected with Firebase')
  firebaseApp = firebase.initializeApp(firebaseConfig);
}
else{
    console.log('Already connected with Firebase')
  firebaseApp = firebase.app();
}
export {firebaseApp};