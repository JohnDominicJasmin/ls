// AuthStackScreen.js
// import * as React from 'react';
import { Button, StatusBar, Text, View } from 'react-native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen'
import SignUpScreen from '../screens/auth/SignUpScreen';
import EmailVerification from '../screens/auth/EmailVerification';
const Stack = createStackNavigator();

const AuthenticationStackScreen = () => {
  return (

  <>
    <StatusBar barStyle="dark-content" />
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown:false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown:false }}/>
      <Stack.Screen name="EmailVerification" component={EmailVerification} options={{ headerShown:false }}/>
    </Stack.Navigator>
  </>
  );
};

export {AuthenticationStackScreen};
