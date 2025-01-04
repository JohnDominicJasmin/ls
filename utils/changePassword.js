import auth from '@react-native-firebase/auth';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { Platform } from 'react-native';
const changePasswordMobile = async (
    currentPassword,
    newPassword,
    onSuccess = () => {},
    onFailure = () => {}
  ) => {
    try {
      const user = auth().currentUser;
  
      if (!user) {
        throw new Error("No user is currently logged in.");
      }
  
      if (!user.email) {
        throw new Error("User is not logged in or email is missing.");
      }
  
      console.log(`Credentials: ${user.email}, Current Password: ${currentPassword}, New Password: ${newPassword}`);
  
      // Reauthenticate the user
      const credential = auth.EmailAuthProvider.credential(user.email, currentPassword);
      await user.reauthenticateWithCredential(credential);
  
      // Update the password
      await user.updatePassword(newPassword);
      console.log("Password updated successfully");
  
      // Call the success callback
      onSuccess({ success: true, message: "Password updated successfully" });
    } catch (error) {
      let errorMessage;
  
      if (error.code === "auth/wrong-password") {
        errorMessage = "The current password is incorrect.";
      } else if (error.code === "auth/invalid-credential") {
        errorMessage = "The supplied credentials are invalid or expired. Please try again.";
      } else {
        errorMessage = error.message || "An error occurred while changing the password.";
      }
  
      console.error("Failed to change password: ", errorMessage);
  
      // Call the failure callback
      onFailure({ success: false, message: errorMessage });
    }
  };
  


  const changePasswordWeb = async (
    currentPassword,
    newPassword,
    onSuccess = () => {},
    onFailure = () => {}
  ) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (!user) {
        throw new Error("No user is currently logged in.");
      }
  
      // Reauthenticate the user
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
  
      // Update the password
      await updatePassword(user, newPassword);
  
      console.log("Password updated successfully");
  
      // Call the success callback
      onSuccess({ success: true, message: "Password updated successfully" });
    } catch (error) {
      console.error("Error updating password:", error.message);
  
      // Call the failure callback
      onFailure({ success: false, message: error.message });
    }
  };
  


  const changePasswordUser = async (
    currentPassword,
    newPassword,
    onSuccess = () => {},
    onFailure = () => {}
  ) => {
    if (Platform.OS === "web") {
      return changePasswordWeb(currentPassword, newPassword, onSuccess, onFailure);
    } else {
      return changePasswordMobile(currentPassword, newPassword, onSuccess, onFailure);
    }
  };
  
export default changePasswordUser;