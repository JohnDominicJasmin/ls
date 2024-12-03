import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthenticationStackScreen } from './navigation/AuthStackScreen';
import { LogBox } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

LogBox.ignoreLogs(['Setting a timer']); // Ignore timer warnings

const App = () => {
  console.log('App.js');
  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AuthenticationStackScreen />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
