import { View, Text, StyleSheet, Image,  TouchableOpacity, Linking, Platform, Pressable} from "react-native";
import BackIcon from "../../ui/BackIcon";
import React, { useState, useEffect, useLayoutEffect } from "react";
import Resources from "../../src/Resources";
import sendEmailVerificationToUser from "../../utils/sendEmailVerification";
import auth from "@react-native-firebase/auth";
import { firebaseAuth } from "../../firebaseconfig";
import { useNavigation, CommonActions } from "@react-navigation/native";
function EmailVerification({route}) {
    const DEFAULT_TIMER = 60;
    const { email } = route.params;
    const navigation = useNavigation();
    const [timer, setTimer] = useState(DEFAULT_TIMER); // Initialize timer at 60 seconds
    const [isRunning, setIsRunning] = useState(true);
    const navigateToHome = (navigation) => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: 'Main' }, // The screen you want to navigate to
          ],
        })
      );
    };

    useEffect(() => {
      const interval = setInterval(() => {
        const user = Platform.OS === 'web' ? firebaseAuth.currentUser : auth().currentUser;
        if (user) {
          user.reload() // Refresh user data from Firebase
            .then(() => {
              if (user.emailVerified) {
                navigateToHome(navigation)
                clearInterval(interval); // Stop the interval if verified
              }
            })
            .catch((error) => console.error('Error reloading user:', error));
        }
      }, 1500);
  
      return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, []);

    const verifyEmail = React.useCallback(() => {
        const mailto = `mailto:${email}`;
        
        Linking.openURL(mailto).catch((err) => {
          alert('Failed to open email app:', err);
        });
    },[email]);

    const currentUser = async () => { 
        if(Platform.OS === 'web'){
            return await firebaseAuth.currentUser;
        }else{
            return  auth().currentUser;
        }
    }


    useEffect(() => {
      let interval;
      console.log(`Is running ${isRunning} - Timer ${timer}`);
      if (isRunning && timer > 0) {
        interval = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000); // Decrease timer every second
      } else if (timer === 0 && isRunning) {
        setIsRunning(false); // Stop the timer at 0

      }
      return () => clearInterval(interval); // Cleanup interval on unmount or state change
    }, [isRunning, timer]);
  
    const startTimer = () => {
      setTimer(DEFAULT_TIMER) 

      setIsRunning(true);
    };

    const resetTimer = () => {
      setIsRunning(false);
      setTimer(DEFAULT_TIMER * 2); // Reset timer to 60 seconds
    };
    useLayoutEffect(() => {
        const sendEmail = async () => {
          sendEmailVerificationToUser(await currentUser(), {
            onSuccess: () => {
  
            }, onFailure: () => {
  
            }
          });

        }
        sendEmail()
        startTimer();
        return () => {
          resetTimer();
        };
        }, []);

    const resendEmail = React.useCallback((async() => {
        if(isRunning) return;

        sendEmailVerificationToUser(await currentUser(), {
          onSuccess: () => {

          }, onFailure: () => {

          }
        })
        startTimer();
}), [isRunning, timer]);
  
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Resources.colors.white,
      }}
    >
      <BackIcon style={{ marginTop: 20, marginLeft: 20 }} />
      <View
        style={{
          alignSelf: "center",
        }}
      >
        <Text style={styles.title}>Check your Email</Text>

        <Text style={styles.emailText}>We sent verification link to:</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      <Image

        source={Resources.images.ic_check_email}
        style={{
          resizeMode: "center",
          width: "90%",
          maxHeight: 400,
          marginVertical: 12,
          height: "50%",
          alignSelf: "center",
        }}
      />

      <View>
        <TouchableOpacity
        onPress={verifyEmail}
          style={{
            backgroundColor: Resources.colors.royalBlue,
            alignSelf: "center",
            width: "60%",
            maxWidth: 300,
            paddingVertical: 18,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: Resources.colors.white,
              alignSelf: "center",
            }}
          >
            {"Verify Email"}
          </Text>
        </TouchableOpacity>

        <Pressable  onPress={resendEmail}>
            <Text
                style={{
                fontSize: 16,
                color: isRunning ? Resources.colors.boulder : Resources.colors.royalBlue,
                alignSelf: "center",
                marginTop: 20,
                }}
            >
                {isRunning ? `Resend in ${timer}s` : "Resend Email"}
            </Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    title: {
        marginTop: 20,
          fontSize: 32,
          letterSpacing: 0.4,
          textAlign: "center",
    },
    emailText: {
        marginTop: 20,
        fontSize: 16,
        letterSpacing: 0.4,
        fontWeight: 'regular',
        textAlign: "center",
    },
    email: {
        marginTop: 4,
        fontSize: 16,
        letterSpacing: 0.4,
        fontWeight: '600',
        textAlign: "center",
    }   
});
export default EmailVerification;
