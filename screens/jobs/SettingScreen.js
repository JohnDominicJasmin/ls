import { View, Text, Image, Platform, TouchableOpacity } from "react-native";
import Resources from "../../src/Resources";
import BackIcon from "../../ui/BackIcon";
import { useNavigation } from "@react-navigation/native";
import TopAppBar from "../auth/components/TopAppBar";
import ProfileItem from "../auth/components/ProfileItem";
import React, { useEffect, useState } from "react";
import { firebaseAuth } from "../../firebaseconfig";
import auth from "@react-native-firebase/auth";
import { ProfilePictureUI } from "../jobs/UserProfile";
import SignUpInputField from "../auth/components/SignUpInputField";
import Spinner from "react-native-loading-spinner-overlay";
import * as ImagePicker from "expo-image-picker";
import changePasswordUser from "../../utils/changePassword";

import { getUserData, updateUserField } from "../../utils/userDb";
import uploadToCloudinary from "../../utils/uploadProfile";
import alert from "../../utils/alert";
import { StyleSheet } from "react-native";
function MobileComponent({ onClickProfile, onClickChangePassword }) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      <TopAppBar title="Settings" />

      <View
        style={{
          marginTop: 44,
          gap: 20,
          paddingVertical: 24,
          paddingHorizontal: 16,
        }}
      >
        <ProfileItem
          iconSource={Resources.icons.ic_person}
          buttonText={"Your Profile"}
          buttonOnPress={onClickProfile}
        />
        <ProfileItem
          iconSource={Resources.icons.ic_key}
          buttonText={"Change Password"}
          buttonOnPress={onClickChangePassword}
        />
      </View>
    </View>
  );
}
function ChangePassword({
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
    <View style={{ flex: 1, marginTop: 50, paddingHorizontal: 16, gap: 18 }}>
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
  );
}
function UserProfile({
  firstName,
  setFirstName,
  firstNameError,

  lastName,
  setLastName,
  lastNameError,

  phoneNumber,
  setPhoneNumber,
  phoneNumberError,

  address,
  setAddress,
  addressError,

  barangay,
  setBarangay,
  barangayError,

  city,
  setCity,
  cityError,

  province,
  setProvince,
  provinceError,

  onClickCancel,
  onClickUpdate,

  onEditPicture,
  onRemovePhoto,
  imageUri,
}) {
  return (
    <View
      style={{
        flexDirection: "column",
        gap: 24,
      }}
    >
      <ProfilePictureUI
        imageUri={imageUri}
        onEditPicture={onEditPicture}
        onRemovePhoto={onRemovePhoto}
      />

      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          gap: 16,
        }}
      >
        <SignUpInputField
          returnKeyType={"next"}
          keyboardType={"default"}
          placeholder={"First name"}
          value={firstName}
          setValue={setFirstName}
          errorMessage={firstNameError}
          style={{ width: "auto", flex: 1 }}
        />
        <SignUpInputField
          returnKeyType={"next"}
          keyboardType={"default"}
          placeholder={"Last name"}
          value={lastName}
          setValue={setLastName}
          errorMessage={lastNameError}
          style={{ width: "auto", flex: 1 }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          gap: 16,
        }}
      >
        <SignUpInputField
          returnKeyType={"next"}
          keyboardType={"phone-pad"}
          placeholder={"Phone Number"}
          value={phoneNumber}
          setValue={setPhoneNumber}
          errorMessage={phoneNumberError}
          style={{ width: "auto", flex: 1 }}
        />
        <SignUpInputField
          returnKeyType={"next"}
          keyboardType={"default"}
          placeholder={"Address"}
          value={address}
          setValue={setAddress}
          errorMessage={addressError}
          style={{ width: "auto", flex: 1 }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 20,
          gap: 16,
        }}
      >
        <SignUpInputField
          returnKeyType={"next"}
          keyboardType={"default"}
          placeholder={"Barangay"}
          value={barangay}
          setValue={setBarangay}
          errorMessage={barangayError}
          style={{ width: "auto", flex: 1 }}
        />
        <SignUpInputField
          returnKeyType={"next"}
          keyboardType={"default"}
          placeholder={"City"}
          value={city}
          setValue={setCity}
          errorMessage={cityError}
          style={{ width: "auto", flex: 1 }}
        />
      </View>

      <SignUpInputField
        returnKeyType={"next"}
        keyboardType={"default"}
        placeholder={"Province"}
        value={province}
        setValue={setProvince}
        errorMessage={provinceError}
        style={{
          width: "50%",
          alignSelf: "flex-start",

          paddingLeft: 20,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          height: "auto",
          marginTop: 16,
          width: "50%",
          paddingLeft: 20,
        }}
      >
        <TouchableOpacity
          onPress={onClickCancel}
          style={{
            borderWidth: 1,
            flex: 1,
            borderRadius: 16,
            marginRight: 8,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: Resources.colors.black,
              fontWeight: "semibold",
              paddingVertical: 16,
            }}
          >
            {"Cancel"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onClickUpdate}
          style={{
            flex: 1,
            marginLeft: 8,
            backgroundColor: Resources.colors.royalBlue,
            borderRadius: 16,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: Resources.colors.white,
              fontWeight: "semibold",
              paddingVertical: 16,
            }}
          >
            {"Update"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity></TouchableOpacity>
      </View>
    </View>
  );
}

function WebComponent({
  firstName,
  setFirstName,
  firstNameError,

  lastName,
  setLastName,
  lastNameError,

  phoneNumber,
  setPhoneNumber,
  phoneNumberError,

  address,
  setAddress,
  addressError,

  barangay,
  setBarangay,
  barangayError,

  city,
  setCity,
  cityError,

  province,
  setProvince,
  provinceError,

  onClickCancel,
  onClickUpdate,

  onEditPicture,
  onRemovePhoto,
  imageUri,

  currentScreen,
  setCurrentScreen,

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
    <View
      style={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      <TopAppBar title="Settings" />

      <View
        style={{
          flexDirection: "row",
          margin: 48,
          flex: 1,
          width: "100%",
          gap: 48,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            gap: 24,
          }}
        >
          <ProfileItem
            iconSource={Resources.icons.ic_person}
            buttonText={"Your Profile"}
            buttonOnPress={() => {
              setCurrentScreen("user_profile");
            }}
          />

          <ProfileItem
            iconSource={Resources.icons.ic_key}
            buttonText={"Change Password"}
            buttonOnPress={() => {
              setCurrentScreen("change_password");
            }}
          />
        </View>

        <View
          style={{
            height: "100%",
            width: "70%",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            borderRadius: 8,
            flexDirection: "column",
            paddingHorizontal: 34,
          }}
        >
          {currentScreen == "user_profile" ? (
            <UserProfile
              firstName={firstName}
              setFirstName={setFirstName}
              firstNameError={firstNameError}
              lastName={lastName}
              setLastName={setLastName}
              lastNameError={lastNameError}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              phoneNumberError={phoneNumberError}
              address={address}
              setAddress={setAddress}
              addressError={addressError}
              barangay={barangay}
              setBarangay={setBarangay}
              barangayError={barangayError}
              city={city}
              setCity={setCity}
              cityError={cityError}
              province={province}
              setProvince={setProvince}
              provinceError={provinceError}
              onClickCancel={onClickCancel}
              onClickUpdate={onClickUpdate}
              onEditPicture={onEditPicture}
              onRemovePhoto={onRemovePhoto}
              imageUri={imageUri}
            />
          ) : (
            <ChangePassword
              currentPassword={currentPassword}
              updateCurrentPassword={updateCurrentPassword}
              currentPasswordError={currentPasswordError}
              newPassword={newPassword}
              updateNewPassword={updateNewPassword}
              newPasswordError={newPasswordError}
              confirmationPassword={confirmationPassword}
              updateConfirmationPassword={updateConfirmationPassword}
              confirmationPasswordError={confirmationPasswordError}
              onSubmit={onSubmit}
            />
          )}
        </View>
      </View>
    </View>
  );
}
function SettingScreen() {
  const navigation = useNavigation();
  const onClickProfile = React.useCallback(() => {
    navigation.navigate("UserProfile");
  }, []);
  const onClickChangePassword = React.useCallback(() => {
    navigation.navigate("ChangePassword");
  }, []);

  const [isLoading, setIsLoading] = React.useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [currentUser, setUser] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(`Result is ${JSON.stringify(result)}`);
      setImageUri(result.assets[0].uri);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);

      let firebaseUser;
      if (Platform.OS === "web") {
        firebaseUser = firebaseAuth.currentUser; // Web Firebase Auth
      } else {
        firebaseUser = auth().currentUser; // Mobile Firebase Auth
      }

      setUser(firebaseUser); // Set the user state
    };

    fetchUser();
    setIsLoading(false);
  }, []);

  const { user, error } = getUserData(currentUser?.uid);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPhoneNumber(user.phoneNumber);
      setAddress(user.address);
      setBarangay(user.barangay);
      setCity(user.city);
      setProvince(user.province);
      setImageUri(user.photoUrl);
    }
  }, [user]);

  const onClickCancel = React.useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, []);

  const onRemovePhoto = React.useCallback(() => {
    setImageUri(null);
  }, []);

  const onClickUpdate = React.useCallback(() => {
    setIsLoading(true);
    console.log(`IMage URI: ${imageUri}`);
    const hasHttp =
      imageUri.startsWith("http://") || imageUri.startsWith("https://");

    if (imageUri != null && !hasHttp) {
      uploadToCloudinary(
        imageUri,
        (url) => {
          setIsLoading(false);

          updateUserField(
            currentUser?.uid,
            (fields = {
              firstName: firstName,
              lastName: lastName,
              phoneNumber: phoneNumber,
              address: address,
              barangay: barangay,
              city: city,
              province: province,
              photoUrl: url,
            }),
            () => {
              setIsLoading(false);
              alert("Success", "Profile updated successfully");
            },
            () => {
              setIsLoading(false);
              alert("Error", "Failed to update profile");
            }
          );
        },
        () => {
          alert("Failed", "Image upload failed");
          setIsLoading(false);
        }
      );
      return;
    }
    updateUserField(
      currentUser?.uid,
      (fields = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        address: address,
        barangay: barangay,
        city: city,
        province: province,
        photoUrl: imageUri,
      }),
      () => {
        setIsLoading(false);
        alert("Success", "Profile updated successfully");
      },
      () => {
        setIsLoading(false);
        alert("Error", "Failed to update profile");
      }
    );
  }, [
    currentUser,
    firstName,
    lastName,
    phoneNumber,
    address,
    barangay,
    city,
    province,
    imageUri,
  ]);

  const [currentScreen, setCurrentScreen] = useState("user_profile");
  const [currentPassword, updateCurrentPassword] = useState(null);
  const [newPassword, updateNewPassword] = useState(null);
  const [confirmationPassword, updateConfirmationPassword] = useState(null);

  const [currentPasswordError, updateCurrentPasswordError] = useState(null);
  const [newPasswordError, updateNewPasswordError] = useState(null);
  const [confirmationPasswordError, updateConfirmationPasswordError] =
    useState(null);

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
          alert("Success", "Password changed successfully");
        },
        () => {
          setIsLoading(false);
          alert("Error", "Failed to change password");
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
        <WebComponent
          imageUri={imageUri}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          address={address}
          setAddress={setAddress}
          barangay={barangay}
          setBarangay={setBarangay}
          city={city}
          setCity={setCity}
          province={province}
          setProvince={setProvince}
          onClickCancel={onClickCancel}
          onClickUpdate={onClickUpdate}
          onEditPicture={pickImage}
          onRemovePhoto={onRemovePhoto}
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
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
      ) : (
        <MobileComponent
          onClickProfile={onClickProfile}
          onClickChangePassword={onClickChangePassword}
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
export default SettingScreen;
