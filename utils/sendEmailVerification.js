import { sendEmailVerification } from "firebase/auth";
import { Platform } from "react-native";
export default async function sendEmailVerificationToUser(user) {
    console.log('sendEmailVerificationToUser:'+JSON.stringify(user));
    if (Platform.OS === 'web') {
        await sendEmailVerification(user).then(() => {
            console.log('Email verification sent for Web!');
        }).catch((error) => {
            console.error(error);
        })
    } else {
        await user.sendEmailVerification()
    }   
}