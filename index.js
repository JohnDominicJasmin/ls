import { Platform } from 'react-native';
import App from './App';
import { initFirebase } from './firebaseconfig';
import registerRootComponent from 'expo/build/launch/registerRootComponent';

// Initialize Firebase
initFirebase();

// Register the root component
registerRootComponent(App);
