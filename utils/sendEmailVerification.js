import { sendEmailVerification } from "firebase/auth";
import { Platform } from "react-native";
export default async function sendEmailVerificationToUser(user) {
    if (Platform.OS === 'web') {
        await sendEmailVerification(user);
    } else {
        await user.sendEmailVerification();
    }   
}