import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {HomeScreen} from '../screens/jobs/HomeScreen';
import BookingsScreen from '../screens/jobs/BookingsScreen';
import ProfileScreen from '../screens/jobs/ProfileScreen';
import Resources from '../src/Resources';
// Sample Screens


// Create Bottom Tabs
const Tab = createBottomTabNavigator();

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route, }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          } else if (route.name === 'Bookings') {
            iconName = 'calendar-outline';
          }
          return (
              <Icon style={{}} name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: Resources.colors.royalBlue,
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Bookings" component={BookingsScreen}options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen}options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
