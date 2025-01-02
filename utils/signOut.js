import auth from '@react-native-firebase/auth';
import { getAuth, signOut } from "firebase/auth";
import { Platform } from 'react-native';

const logoutWeb = async (onSuccess, onFailure) => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      if (onSuccess) onSuccess(); // Call success callback
    } catch (error) {
      console.error("Error signing out:", error);
      if (onFailure) onFailure(error); // Call failure callback
    }
  };
  
  // Firebase Mobile Logout with Callbacks
  const logoutMobile = async (onSuccess, onFailure) => {
    try {
      await auth().signOut();
      console.log("User signed out successfully");
      if (onSuccess) onSuccess(); // Call success callback
    } catch (error) {
      console.error("Error signing out:", error);
      if (onFailure) onFailure(error); // Call failure callback
    }
  };
  const logout = async (onSuccess, onFailure) => {
    if (Platform.OS === "web") {
      logoutWeb(onSuccess, onFailure); // Pass callbacks to the web logout function
    } else {
      logoutMobile(onSuccess, onFailure); // Pass callbacks to the mobile logout function
    }
  };
  

export default logout