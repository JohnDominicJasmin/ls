import { Platform } from 'react-native';
import { firebaseAuth } from '../firebaseconfig'; // Web Firebase configuration
import auth from '@react-native-firebase/auth'; // React Native Firebase Auth for mobile
import { signInAnonymously } from "firebase/auth";

const signInAsAnonymous = async ({ onSuccess, onFailure }) => {
  try {
    let userCredential;

    if (Platform.OS === 'web') {
      // Web: Use the Firebase Web SDK
       await signInAnonymously(firebaseAuth)
    } else {
      // Mobile: Use React Native Firebase
      await auth().signInAnonymously();
    }

    console.log('Signed in anonymously:', userCredential);

    if (onSuccess && typeof onSuccess === 'function') {
      onSuccess(); // Call the success callback with the userCredential
    }

  } catch (error) {
    console.log('Error signing in anonymously:', error);

    if (onFailure && typeof onFailure === 'function') {
      onFailure(error); // Call the failure callback with the error
    }

    throw error; // Rethrow the error for higher-level handling if needed
  }
};

export default signInAsAnonymous;
