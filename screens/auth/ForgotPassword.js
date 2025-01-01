import { Text, View, Image, StyleSheet, Alert, Platform, Modal, Button } from "react-native";
import BackIcon from "../../ui/BackIcon";
import Resources from "../../src/Resources";
import { TextInput } from "react-native-paper";

import sendResetPassword from "../../utils/sendPasswordResetEmail";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

function ForgotPassword() {
  const [email, setEmail] = useState('')

  const [dialogMessage, setDialogMessage] = useState(null);
  
  const showAlert = ({message}) => {
    if (Platform.OS === "web") {
      setDialogMessage(message)
    } else {
      Alert.alert("Success", message);
    }
  };

  const resetPassword = React.useCallback(async () => {
    sendResetPassword({
      email: email,
      onSuccess: (message) => {
        console.log(message); // Output: "Password reset email sent successfully"
        showAlert('Password reset email sent successfully')
      },
      onFailure: (error) => {
        console.log(error); // Output: Error message
        showAlert(error.message)

      },
    });
    
  }, [email]);
  return (
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
  }
}); 
export default ForgotPassword;
