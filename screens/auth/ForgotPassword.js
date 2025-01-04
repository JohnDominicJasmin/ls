import { Text, View, Image, StyleSheet, Alert, Platform, Modal, Button } from "react-native";
import BackIcon from "../../ui/BackIcon";
import Resources from "../../src/Resources";
import { TextInput } from "react-native-paper";
import Spinner from "react-native-loading-spinner-overlay"; 

import sendResetPassword from "../../utils/sendPasswordResetEmail";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setErorMessage] = useState(null)
  const navigation = useNavigation()
  const [dialogMessage, setDialogMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
  const showAlert = ({message,onDialogDismiss}) => {
    if (Platform.OS === "web") {
      setDialogMessage(message)
    } else {
      Alert.alert(
        "Success",
        message,
        [{ text: "OK", onPress: onDialogDismiss }]
      );
    }
  };

  const resetPassword = React.useCallback(async () => {
    const onDialogDismiss = () => {
      navigation.navigate('Login')
    }
    setIsLoading(true);
    
    sendResetPassword({
      email: email,
      onSuccess: (message) => {
    setIsLoading(false);

    setErorMessage(null)
        console.log(message); // Output: "Password reset email sent successfully"
        showAlert({message:'Password reset email sent successfully', onDialogDismiss: () => {onDialogDismiss()}})
      },
      onFailure: (error) => {
    setIsLoading(false);

    setErorMessage(error);

        console.log(error); // Output: Error message
        showAlert({message:error.message})

      },
    });
    
  }, [email]);
  return (
    <>
    <Spinner
          visible={isLoading}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
    <View
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
        justifyContent: "center",
        backgroundColor: Resources.colors.white,
      }}
    >
      <BackIcon
        style={{
          position: "absolute",
          top: 16,
          left: 20,
        }}
      />

      <View
        style={{
          gap: 34,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              color: Resources.colors.black,
              fontWeight: "regular",
            }}
          >
            Forgot Password
          </Text>
          <Text
            style={{
              textAlign: "center",
              paddingHorizontal: 55
              
            }}
          >
            Don’t worry! It happens. Please enter your email address associated
            with your account
          </Text>
          
        </View>
        <Image
          source={Resources.images.ic_forgot_password}
          style={{
            width: 320,
            height: 300,
            alignSelf: 'center'
          }}
        />
        
        
      </View>
      

      <View
  style={{
    justifyContent: "center",
    alignItems: "center", // Centers the content horizontally
    width: "100%",
  }}
>
  <View
    style={{
      width: "100%", // Ensures it takes up full width initially
      maxWidth: 600, // Restricts the maximum width to 600px
    }}
  >
    <TextInput
    
      value={email}
      onChangeText={setEmail}
      style={[styles.input]}
      placeholder="Email"
      label={"Email"}
      keyboardType="email-address"
      theme={{
        colors: {
          primary: Resources.colors.royalBlue,
          text: "#000",
          placeholder: "#aaa",
        },
      }}
    />

    {error && (
      <Text
        style={{
          color: Resources.colors.red,
          fontSize: 12,
          paddingHorizontal: 24 
        }}
      >
        {error}
      </Text>
    )}

    <TouchableOpacity style={styles.submitBttn} onPress={resetPassword}>
      <Text style={styles.submitText}>{"Submit"}</Text>
    </TouchableOpacity>
  </View>
</View>

{Platform.OS === "web" && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={dialogMessage != null}
          onRequestClose={() => setDialogMessage(null)}
        >
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
            <View style={{ padding: 20, backgroundColor: "white", borderRadius: 10 }}>
              <Text style={{
                fontSize: 16,
                color: Resources.colors.black
              }}>{dialogMessage}</Text>
              <TouchableOpacity onPress={() => setDialogMessage(null)} style={{
                marginTop: 24,
                backgroundColor: Resources.colors.royalBlue,
                justifyContent: 'center',
                alignSelf: 'center',
                width: 200,
                paddingVertical: 8,
                borderRadius: 8
              }}>
                <Text style={{
                  color: Resources.colors.white,
                  fontWeight: 'semibold',
                  fontSize: 16,
                  alignSelf: 'center'
                }}>
                  {"Close"}
                </Text>

              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      
    </View>
    </>
  );
}
const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 0.8,
    borderColor: Resources.colors.black,
    backgroundColor: "white",
    fontSize: 16,
    marginHorizontal: 24,
    paddingTop: 34,
    marginBottom: 4,
  },
  submitBttn: {
    marginTop: 24,
    backgroundColor: Resources.colors.royalBlue,
    width: 200,

    alignSelf: 'center',
    padding: 14,
    paddingHorizontal: 24,
    borderRadius: 8
  },
  submitText: {
    color: Resources.colors.white,
    fontSize: 16,
    alignSelf: 'center',

    fontWeight: 'semibold',
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
}); 
export default ForgotPassword;
