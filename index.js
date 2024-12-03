import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import {initFirebase} from  './firebaseconfig'
import registerRootComponent from 'expo/build/launch/registerRootComponent';

initFirebase();
// AppRegistry.registerComponent("X", () => App);

// if (Platform.OS === 'web') {
//   const rootTag = document.getElementById('root') || document.createElement('div');
//   if (!rootTag.parentNode) document.body.appendChild(rootTag);
//   AppRegistry.runApplication("JobSeek", { initialProps: {}, rootTag });
// } else {
// }
AppRegistry.registerComponent("X", () => App);

registerRootComponent(App);
