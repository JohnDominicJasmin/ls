import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import SignUpInputField from "./components/SignUpInputField";
import TopAppBar from "./components/TopAppBar";
import Resources from "../../src/Resources";
import changePasswordUser from "../../utils/changePassword";
import Spinner from "react-native-loading-spinner-overlay"; 

function MobileComponent({
  currentPassword,
  updateCurrentPassword,
  currentPasswordError,

  newPassword,
  updateNewPassword,
  newPasswordError,

  confirmationPassword,
  updateConfirmationPassword,
  confirmationPasswordError,

  onSubmit,
}) {
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        <TopAppBar title="Change Password" />

        <View style={{ flex: 1, marginTop: 50, paddingHorizontal: 16 }}>
          <SignUpInputField
            returnKeyType={"next"}
            keyboardType={"password"}
            placeholder={"Current Password"}
            value={currentPassword}
            setValue={updateCurrentPassword}
            errorMessage={currentPasswordError}
          />

          <SignUpInputField
            returnKeyType={"next"}
            keyboardType={"password"}
            placeholder={"New Password"}
            value={newPassword}
            setValue={updateNewPassword}
            errorMessage={newPasswordError}
          />

          <SignUpInputField
            returnKeyType={"next"}
            keyboardType={"password"}
            placeholder={"Confirm Password"}
            value={confirmationPassword}
            setValue={updateConfirmationPassword}
            errorMessage={confirmationPasswordError}
          />

          <TouchableOpacity
            onPress={onSubmit}
            style={{
              padding: 16,
              marginTop: 22,
              borderRadius: 14,
              backgroundColor: Resources.colors.royalBlue,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              width: 200,
            }}
          >
            <Text
              style={{
                color: Resources.colors.white,
                fontSize: 14,
              }}
            >
              {"Submit"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

function WebComponent() {
  return <></>;
}
function ChangePassword() {
  const [currentPassword, updateCurrentPassword] = useState(null);
  const [newPassword, updateNewPassword] = useState(null);
  const [confirmationPassword, updateConfirmationPassword] = useState(null);

  const [currentPasswordError, updateCurrentPasswordError] = useState(null);
  const [newPasswordError, updateNewPasswordError] = useState(null);
  const [confirmationPasswordError, updateConfirmationPasswordError] =
    useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const validateChangePassword = () => {
    let isValid = true;

    // Reset errors
    updateCurrentPasswordError(null);
    updateNewPasswordError(null);
    updateConfirmationPasswordError(null);

    // Validate Current Password
    if (!currentPassword || currentPassword.trim() === "") {
      updateCurrentPasswordError("Current password is required.");
      isValid = false;
    }

    // Validate New Password
    if (!newPassword || newPassword.trim() === "") {
      updateNewPasswordError("New password is required.");
      isValid = false;
    } else if (newPassword.length < 6) {
      updateNewPasswordError(
        "New password must be at least 6 characters long."
      );
      isValid = false;
    } else if (newPassword === currentPassword) {
      updateNewPasswordError(
        "New password cannot be the same as the current password."
      );
      isValid = false;
    }

    // Validate Confirmation Password
    if (!confirmationPassword || confirmationPassword.trim() === "") {
      updateConfirmationPasswordError("Confirmation password is required.");
      isValid = false;
    } else if (confirmationPassword !== newPassword) {
      updateConfirmationPasswordError("Passwords do not match.");
      isValid = false;
    }

    return isValid;
  };

  const handleChangePassword = async () => {
    if (validateChangePassword()) {
      setIsLoading(true);
      // Attempt to change the password
      await changePasswordUser(
        currentPassword,
        confirmationPassword,
        () => {
          setIsLoading(false);
        },
        () => {
          setIsLoading(false);
        }
      );
    }
  };

  return (
    <>
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      />
      {Platform.OS === "web" ? (
        <WebComponent />
      ) : (
        <MobileComponent
          onSubmit={handleChangePassword}
          currentPassword={currentPassword}
          updateCurrentPassword={updateCurrentPassword}
          currentPasswordError={currentPasswordError}
          newPassword={newPassword}
          updateNewPassword={updateNewPassword}
          newPasswordError={newPasswordError}
          confirmationPassword={confirmationPassword}
          updateConfirmationPassword={updateConfirmationPassword}
          confirmationPasswordError={confirmationPasswordError}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
});
export default ChangePassword;
