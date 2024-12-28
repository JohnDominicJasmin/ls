import { firebaseAuth } from '../firebaseconfig';
import { browserLocalPersistence, onAuthStateChanged } from 'firebase/auth';

const setPersistenceAndCheckUser = async () => {
  try {
    // Set Firebase Auth persistence to localStorage for web
    await firebaseAuth.setPersistence(browserLocalPersistence);

    // Add listener to detect changes in the user's sign-in state
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        console.log('User is signed in:', user);
      } else {
        console.log('No user is signed in.');
      }
    });
  } catch (error) {
    console.error('Error setting persistence:', error);
  }
};

export default setPersistenceAndCheckUser;
