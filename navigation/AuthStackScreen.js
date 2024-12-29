import React, { useState, useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { firebaseAuth } from '../firebaseconfig';
import { browserLocalPersistence, onAuthStateChanged } from 'firebase/auth';

import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import EmailVerification from '../screens/auth/EmailVerification';
import HomeScreen from '../screens/jobs/HomeScreen';

const Stack = createStackNavigator();

const AuthenticationStackScreen = () => {
  const [initialRoute, setInitialRoute] = useState(null); // Initialize as null to wait for user check
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const checkUser = async () => {
      if (Platform.OS === 'web') {
        try {
          // Set persistence for web
          await firebaseAuth.setPersistence(browserLocalPersistence);

          // Use onAuthStateChanged to listen for user state
          onAuthStateChanged(firebaseAuth, (user) => {
            console.log('Web - User state changed:', user);
            setLoading(false); // Stop loading

            if(user.isAnonymous){
              setInitialRoute("Login")
              return;
            }
            if(user.emailVerified){
              setInitialRoute("Home")
              return;
            }
            setInitialRoute("Login")
          });
        } catch (error) {
          console.error('Error checking user on web:', error);
        }
      } else {
        // For React Native Mobile
        const user = auth().currentUser;
        setLoading(false); 

        if(user.isAnonymous){
          setInitialRoute("Login")
          return;
        }
        if(user.emailVerified){
          setInitialRoute("Home")
          return;
        }
        setInitialRoute("Login")
      }
    };

    checkUser();
  }, []);

  // Show a loading indicator while checking user state
  if (loading) {
    return null; // Replace with a loading spinner or splash screen if needed
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EmailVerification" component={EmailVerification} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </>
  );
};

export { AuthenticationStackScreen };
