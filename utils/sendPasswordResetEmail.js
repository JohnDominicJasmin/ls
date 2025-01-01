import { sendPasswordResetEmail } from "firebase/auth";
import { firebaseAuth } from "../firebaseconfig";
import auth from "@react-native-firebase/auth";
import { Platform } from "react-native";

export default async function sendResetPassword({ email, onSuccess, onFailure }) {
  try {
    if (!email) {
      throw new Error("Email is required");
    }

    if (Platform.OS === "web") {
      await sendPasswordResetEmail(firebaseAuth, email);
    } else {
      await auth().sendPasswordResetEmail(email);
    }

    // Call the success callback
    if (onSuccess) {
      onSuccess("Password reset email sent successfully");
    }
  } catch (error) {
    console.error("Error sending password reset email:", error);

    // Call the failure callback
    if (onFailure) {
      onFailure(error.message || "An error occurred");
    }
  }
}
