import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthenticationStackScreen } from './navigation/AuthStackScreen';
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { addNotification } from './utils/notificationsWeb';
import '@react-native-firebase/app';
import { firebase } from '@react-native-firebase/database'; // If necessary, use firebase.app()



LogBox.ignoreLogs(['Setting a timer']); // Ignore timer warnings

const App = () => {

  const handleAddNotification = async () => {
    const userId = "FFTRQK9rZZghOZ54FEdIbG8mmVA3"; // Replace with actual user ID
    const notification = {
      displayName: "New Notification",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      description: "This is a sample notification.",
      isRead: false, // Notification starts as unread
    };
    
    addNotification(userId, notification)
      .then((docId) => {
        console.log(`Notification added successfully with ID: ${docId}`);
      })
      .catch((error) => {
        console.error("Failed to add notification:", error);
      });
    

    
  };

  React.useEffect(() => {
    // handleAddNotification();

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
