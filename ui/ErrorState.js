import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ErrorState = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the component takes the full screen
    justifyContent: 'center', // Centers the content vertically
    alignItems: 'center', // Centers the content horizontally
    backgroundColor: '#fff', // Optional: Set a background color
  },
  text: {
    color: 'red', // Set the text color to red
    fontSize: 16, // Adjust font size as needed
    textAlign: 'center', // Center the text
    paddingHorizontal: 16, // Add some horizontal padding for longer error messages
  },
});

export default ErrorState;
