// AuthStackScreen.js
// import * as React from 'react';
import { Button, Text, View } from 'react-native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen'
import SignUpScreen from '../screens/auth/SignUpScreen';

const Stack = createStackNavigator();

const AuthenticationStackScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown:false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown:false }}/>
    </Stack.Navigator>
  );
};

export {AuthenticationStackScreen};
