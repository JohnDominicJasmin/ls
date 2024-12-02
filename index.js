import { AppRegistry, Platform } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import './firebaseconfig'
if (Platform.OS === 'web') {
  // Web-specific setup
  const rootTag = document.getElementById('root') || document.createElement('div');
  if (!rootTag.parentNode) document.body.appendChild(rootTag);
  AppRegistry.runApplication(appName, { initialProps: {}, rootTag });
} else {
  // Mobile-specific setup (iOS and Android)
  AppRegistry.registerComponent(appName, () => App);
}
