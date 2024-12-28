import { Platform } from 'react-native';
import { firebaseAuth } from '../firebaseconfig'; // Web Firebase configuration
import auth from '@react-native-firebase/auth'; // React Native Firebase Auth for mobile

const signInAnonymously = async ({ onSuccess, onFailure }) => {
  try {
    let userCredential;

    if (Platform.OS === 'web') {
      // Web: Use the Firebase Web SDK
      userCredential = await firebaseAuth.signInAnonymously();
    } else {
      // Mobile: Use React Native Firebase
      userCredential = await auth().signInAnonymously();
    }

    console.log('Signed in anonymously:', userCredential);

    if (onSuccess && typeof onSuccess === 'function') {
      onSuccess(userCredential); // Call the success callback with the userCredential
    }

    return userCredential; // Return the userCredential for optional additional use
  } catch (error) {
    console.error('Error signing in anonymously:', error);

    if (onFailure && typeof onFailure === 'function') {
      onFailure(error); // Call the failure callback with the error
    }

    throw error; // Rethrow the error for higher-level handling if needed
  }
};

export default signInAnonymously;
