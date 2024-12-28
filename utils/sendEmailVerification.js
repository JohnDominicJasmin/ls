import { sendEmailVerification } from "firebase/auth";
import { Platform } from "react-native";

export default async function sendEmailVerificationToUser(user, { onSuccess, onFailure }) {
  try {
    console.log('sendEmailVerificationToUser:', JSON.stringify(user));

    if (Platform.OS === 'web') {
      // Web-specific email verification
      await sendEmailVerification(user);
      console.log('Email verification sent for Web!');

      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(); // Call success callback
      }
    } else {
      // Mobile-specific email verification
      await user.sendEmailVerification();
      console.log('Email verification sent for Mobile!');

      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(); // Call success callback
      }
    }
  } catch (error) {
    console.error('Error sending email verification:', error);

    if (onFailure && typeof onFailure === 'function') {
      onFailure(error); // Call failure callback with error
    }

    throw error; // Rethrow for higher-level handling
  }
}
