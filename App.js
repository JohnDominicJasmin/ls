import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthenticationStackScreen } from './navigation/AuthStackScreen';
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { addNotification } from './utils/notifications';
import '@react-native-firebase/app';
import { firebase } from '@react-native-firebase/database'; // If necessary, use firebase.app()



LogBox.ignoreLogs(['Setting a timer']); // Ignore timer warnings

const App = () => {

  const handleAddNotification = async () => {
    const userId = 'user123';  // Replace with the actual user ID
    const notification = {
      displayName: 'New Notification',
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      description: 'This is a sample notification.',
      isRead: false
    };

    try {
      console.log('Adding notification...');
      await addNotification(userId, notification);  // Call the function
      console.log('Notification added successfully!');
    } catch (error) {
      console.error('Failed to add notification:', error);
    }
  };

  React.useEffect(() => {
    handleAddNotification();
  }, []);

  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AuthenticationStackScreen />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
