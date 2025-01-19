import { Platform,AppRegistry } from 'react-native';
import App from './App';
import { initFirebase } from './firebaseconfig';
import registerRootComponent from 'expo/build/launch/registerRootComponent';

// Initialize Firebase
initFirebase();
AppRegistry.registerComponent("X", () => App);
// Register the root component
registerRootComponent(App);
