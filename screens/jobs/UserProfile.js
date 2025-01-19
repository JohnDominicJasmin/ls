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

import TopAppBar from "../auth/components/TopAppBar";
import Icon from "react-native-vector-icons/MaterialIcons"; // Install react-native-vector-icons
import InputField from "./../auth/components/SignUpInputField";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Resources from "../../src/Resources";
// import { getUserDataMobile, updateUserFieldsMobile } from "../../utils/userDb";
import { getUserData, updateUserField } from "../../utils/userDb";
import { firebaseAuth } from "../../firebaseconfig";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import * as ImagePicker from "expo-image-picker";
import uploadToCloudinary from "../../utils/uploadProfile";
const ProfilePictureUI = ({ imageUri, onEditPicture, onRemovePhoto }) => {
  return (
    <View style={styles.profilePictureContainer}>
      <Text style={styles.title}>Profile Picture</Text>
      <View style={styles.profileContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            gap: 16,
          }}
        >
          <View style={styles.imageWrapper}>
            {imageUri ? (
              <Image
                source={{ uri: imageUri }} // Replace with your image URL
                style={styles.profileImage}
              />
            ) : (
              <Image
                source={Resources.icons.ic_person} // Replace with your image URL
                style={[
                  styles.profileImage,
                  { resizeMode: "contain", tintColor: Resources.colors.gray },
                ]}
              />
            )}

            <TouchableOpacity style={styles.editIcon} onPress={onEditPicture}>
              <Icon name="edit" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.removeButton} onPress={onRemovePhoto}>
            <Text style={styles.removeButtonText}>Remove Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

function ProfileInputs({
  firstName,
  updateFirstName,
  firstNameError,

  lastName,
  updateLastName,
  lastNameError,

  phoneNumber,
  updatePhoneNumber,
  phoneNumberError,

  address,
  updateAddress,
  addressError,

  barangay,
  updateBarangay,
  barangayError,

  city,
  updateCity,
  cityError,

  province,
  updateProvince,
  provinceError,

  onClickCancel,
  onClickUpdate,
}) {
  return (
    <View
      style={{
        flexDirection: "column",
        paddingHorizontal: 16,
        marginBottom: 24,
      }}
    >
      <InputField
        returnKeyType={"next"}
        keyboardType={"default"}
        placeholder={"First name"}
        value={firstName}
        setValue={updateFirstName}
        errorMessage={firstNameError}
      />

      <InputField
        returnKeyType={"next"}
        keyboardType={"default"}
        placeholder={"Last name"}
        value={lastName}
        setValue={updateLastName}
        errorMessage={lastNameError}
      />

      <InputField
        returnKeyType={"next"}
        keyboardType={"phone-pad"}
        placeholder={"Phone Number"}
        value={phoneNumber}
        setValue={updatePhoneNumber}
        errorMessage={phoneNumberError}
      />

      <InputField
        returnKeyType={"next"}
        keyboardType={"default"}
        placeholder={"Address"}
        value={address}
        setValue={updateAddress}
        errorMessage={addressError}
      />

      <InputField
        returnKeyType={"next"}
        keyboardType={"default"}
        placeholder={"Barangay"}
        value={barangay}
        setValue={updateBarangay}
        errorMessage={barangayError}
      />

      <InputField
        returnKeyType={"next"}
        keyboardType={"default"}
        placeholder={"City"}
        value={city}
        setValue={updateCity}
        errorMessage={cityError}
      />

      <InputField
        returnKeyType={"next"}
        keyboardType={"default"}
        placeholder={"Province"}
        value={province}
        setValue={updateProvince}
        errorMessage={provinceError}
      />

      <View style={{ flexDirection: "row", height: "auto", marginTop: 16 }}>
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
const MobileComponent = ({
  imageUri,
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
}) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={20} // Adds extra scroll space when keyboard is visible
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.innerContainer}>
          <TopAppBar title="Your Profile" />
          <ProfilePictureUI
            imageUri={imageUri}
            onEditPicture={onEditPicture}
            onRemovePhoto={onRemovePhoto}
          />
          <ProfileInputs
            firstName={firstName}
            updateFirstName={setFirstName}
            firstNameError={firstNameError}
            lastName={lastName}
            updateLastName={setLastName}
            lastNameError={lastNameError}
            phoneNumber={phoneNumber}
            updatePhoneNumber={setPhoneNumber}
            phoneNumberError={phoneNumberError}
            address={address}
            updateAddress={setAddress}
            addressError={addressError}
            barangay={barangay}
            updateBarangay={setBarangay}
            barangayError={barangayError}
            city={city}
            updateCity={setCity}
            cityError={cityError}
            province={province}
            updateProvince={setProvince}
            provinceError={provinceError}
            onClickCancel={onClickCancel}
            onClickUpdate={onClickUpdate}
          />
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

const WebComponent = () => {
  return <></>;
};

function UserProfile() {
  const navigation = useNavigation();
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
      setImageUri(result.assets[0].uri);
    }
  };
  // Fetch current user
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

  // Fetch user data after user is set
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
      imageUri?.startsWith("http://") || imageUri?.startsWith("https://");

      
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
              Alert.alert("Success", "Profile updated successfully");
            },
            () => {
              setIsLoading(false);
              Alert.alert("Error", "Failed to update profile");
            }
          );
        },
        () => {
          console.log("Image upload failed");
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
        Alert.alert("Success", "Profile updated successfully");
      },
      () => {
        setIsLoading(false);
        Alert.alert("Error", "Failed to update profile");
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
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  profilePictureContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginTop: 26,
  },
  title: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    fontSize: 14,
    fontWeight: "regular",
  },
  profileContainer: {
    width: "100%",
    alignItems: "flex-start",
  },
  imageWrapper: {
    position: "relative",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: "cover",
    borderWidth: 2,
    borderColor: "#ccc",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#3f51b5",
    borderRadius: 15,
    padding: 5,
  },
  removeButton: {
    height: "auto",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#3f51b5",
    borderRadius: 8,
  },
  removeButtonText: {
    color: "#3f51b5",
    fontWeight: "bold",
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});

export { UserProfile, ProfilePictureUI };
