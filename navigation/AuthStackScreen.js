import React, { useState, useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { firebaseAuth } from '../firebaseconfig';
import { browserLocalPersistence, onAuthStateChanged } from 'firebase/auth';

import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import EmailVerification from '../screens/auth/EmailVerification';
import {NotificationScreen} from '../screens/jobs/NotificationsScreen'
import ForgotPassword from '../screens/auth/ForgotPassword';
import { MainTabNavigator } from './MainTabNavigator';
import {HomeScreen} from '../screens/jobs/HomeScreen';
import PremiumAccountScreen from '../screens/jobs/PremiumAccountScreen';
import SettingScreen from '../screens/jobs/SettingScreen';
import {UserProfile} from '../screens/jobs/UserProfile';
import ChangePassword from '../screens/auth/ChangePassword';
import {ServiceScreen} from '../screens/jobs/Service';
import {BookServiceScreen} from '../screens/jobs/BookServiceScreen';
import BookingsScreen from '../screens/jobs/BookingsScreen';
import SearchServices from '../screens/jobs/SearchServices';
import {PaymentPremium} from '../screens/jobs/PaymentPremium';
import ProfileScreen from '../screens/jobs/ProfileScreen';
import CancelPremiumScreen from '../screens/jobs/CancelPremiumScreen';
import VouchersScreen from '../screens/jobs/VouchersScreen';
import ServicePaymentScreen from '../screens/jobs/ServicePaymentScreen';

const Stack = createStackNavigator();

const AuthenticationStackScreen = () => {
  const [initialRoute, setInitialRoute] = useState(null); // Initialize as null to wait for user check
  const [loading, setLoading] = useState(true); // Add loading state
  const isWeb = Platform.OS === 'web'; 
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
              setInitialRoute("Main")
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
          setInitialRoute("Main")
          return;
        }
        setInitialRoute("Login")
      }
    };

    checkUser();
  }, []);

  if (loading) {
    return null; // Replace with a loading spinner or splash screen if needed
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator mode="card"  screenOptions={{ cardStyle: { flex: 1 } }} initialRouteName={initialRoute}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EmailVerification" component={EmailVerification} options={{ headerShown: false }} />
        {!isWeb ? (
          <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
        ) : ( <Stack.Screen name="Main" component={HomeScreen} options={{ headerShown: false }} />)}
        
        <Stack.Screen name="ServicePayment" component={ServicePaymentScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BookService" component={BookServiceScreen} options={{headerShown: false}} />
        <Stack.Screen name="Bookings" component={BookingsScreen} mode="card"  screenOptions={{ cardStyle: { flex: 1 }, headerShown: false}} />
        <Stack.Screen name="SearchServices" component={SearchServices} options={{ headerShown: false }}/>
        <Stack.Screen name="PaymentPremium" component={PaymentPremium} options={ {headerShown: false}}/>
        <Stack.Screen name="PremiumAccount" component={PremiumAccountScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingScreen}  options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen}options={{ headerShown: false }} />
        <Stack.Screen name="CancelPremiumScreen" component={CancelPremiumScreen} options={{ headerShown: false }} /> 
       <Stack.Screen name="ServicesScreen" component={ServiceScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Notification" component={NotificationScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }}/>
        <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }}/>
        <Stack.Screen name="VouchersScreen" component={VouchersScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </>
  );
};

export { AuthenticationStackScreen };
