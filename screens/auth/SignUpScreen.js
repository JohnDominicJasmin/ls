import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Resources from "../../src/Resources";
import BackIcon from "../../ui/BackIcon";
import { useNavigation } from "@react-navigation/native";
import InputField from "./components/SignUpInputField";
import React from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Spinner from "react-native-loading-spinner-overlay";
import { firebaseAuth } from "../../firebaseconfig";
import auth from "@react-native-firebase/auth";
import { createUserData } from "../../utils/userDb";
function SignUpScreen() {
  const [firstName, setFirstName] = React.useState(null);
  const [firstNameError, setFirstNameError] = React.useState(null);

  const [lastName, setLastName] = React.useState(null);
  const [lastNameError, setLastNameError] = React.useState(null);

  const [email, setEmail] = React.useState(null);
  const [emailError, setEmailError] = React.useState(null);

  const [password, setPassword] = React.useState(null);
  const [passwordError, setPasswordError] = React.useState(null);

  const [confirmPassword, setConfirmPassword] = React.useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigation = useNavigation();
  const navigateToLogin = React.useCallback(() => {
    navigation.navigate("Login");
  });

  const handleInputValidation = React.useCallback(() => {
    if (firstName === "" || firstName === null) {
      setFirstNameError("First name is required!");
      return false;
    }
    if (lastName === "" || lastName === null) {
      setLastNameError("Last name is required!");
      return false;
    }

    if (email === "" || email === null) {
      setEmailError("Email is required!");
      return false;
    }
    if (password === "" || password === null) {
      setPasswordError("Password is required!");
      return false;
    }
    if (confirmPassword === "" || confirmPassword === null) {
      setConfirmPasswordError("Confirm password is required!");
      return false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match!");
      return false;
    }
    return true;
  }, [firstName, lastName, email, password, confirmPassword]);

  const updateFirstName = React.useCallback(
    (value) => {
      setFirstNameError(null);
      setFirstName(value);
    },
    [firstName, firstNameError]
  );

  const updateLastName = React.useCallback(
    (value) => {
      setLastNameError(null);
      setLastName(value);
    },
    [lastName, lastNameError]
  );

  const updateEmail = React.useCallback(
    (value) => {
      setEmailError(null);
      setEmail(value);
    },
    [email, emailError]
  );

  const updatePassword = React.useCallback(
    (value) => {
      setPasswordError(null);
      setPassword(value);
    },
    [password, passwordError]
  );

  const updateConfirmPassword = React.useCallback(
    (value) => {
      setConfirmPasswordError(null);
      setConfirmPassword(value);
    },
    [confirmPassword, confirmPasswordError]
  );
  const navigateToEmailVerification = React.useCallback(() => {
    navigation.navigate("EmailVerification", { email: email });
  }, [email]);
  const handleSignUp = React.useCallback(async () => {
    setIsLoading(true);

    const isInputValid = handleInputValidation();

    if (!isInputValid) {
      setIsLoading(false);

      return;
    }
    try {
      let userCredential;
      if (Platform.OS === "web") {
        userCredential = await createUserWithEmailAndPassword(
          firebaseAuth,
          email,
          password
        );
      } else {
        userCredential = await auth().createUserWithEmailAndPassword(
          email,
          password
        );
      }

      const updateUser = async (user) => {
        if (Platform.OS === "web") {
          return await updateProfile(user, {
            displayName: `${firstName} ${lastName}`,
          });
        }
        return await user.updateProfile({
          displayName: `${firstName} ${lastName}`, // Combine first and last name or use any desired format
        });
      };

      const userId = userCredential.user.uid; // Unique user ID (e.g., from authentication)

      const user = userCredential.user;
      if (user) {
        await updateUser(user);
        navigateToEmailVerification();
        const userData = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          userId: userId,
          createdAt: new Date().toISOString(), // Timestamp
        };
        createUserData(userId, userData)
          .then(() => {
            console.log("User data successfully created!");
          })
          .catch((error) => {
            console.error("Error creating user data:", error);
          });
      }
      setIsLoading(false);
    } catch (error) {
      console.log(`Sign up error: `, error);
      setIsLoading(false);

      if (error.code === "auth/email-already-in-use") {
        setEmailError("Email already in use!");
      } else if (error.code === "auth/invalid-email") {
        setEmailError("Invalid email!");
      } else if (error.code === "auth/weak-password") {
        setConfirmPasswordError("Weak password!");
      } else if (error.code === "auth/network-request-failed") {
        alert("Network error occurred! Please try again.");
      } else {
        alert("An error occurred while creating your account!" + error);
      }
    }
  }, [firstName, lastName, email, password, confirmPassword]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: Resources.colors.white,
        }}
      >
        <Spinner
          visible={isLoading}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
        <SafeAreaView>
          <ScrollView>
            <BackIcon
              style={{
                // position: "absolute",
                top: 12,
                left: 12,
              }}
            />

            <View
              style={{
                height: "100%",
                maxWidth: 400,
                width: "100%",
                alignSelf: "center",
              }}
            >
              <View
                style={{
                  gap: 4,
                  marginTop: 24,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 31,
                  }}
                >
                  {"Sign Up"}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                  }}
                >
                  {
                    "Create your account to book trusted home services quickly and conveniently for you"
                  }
                </Text>
              </View>

              <View
                style={{
                  marginTop: 24,
                  width: "90%",
                  alignSelf: "center",
                  gap: 8,
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
                  keyboardType={"default"}
                  returnKeyType={"next"}
                  placeholder={"Last name"}
                  value={lastName}
                  setValue={updateLastName}
                  errorMessage={lastNameError}
                />
                <InputField
                  returnKeyType={"next"}
                  keyboardType={"email-address"}
                  placeholder={"Email"}
                  value={email}
                  setValue={updateEmail}
                  errorMessage={emailError}
                />
                <InputField
                  returnKeyType={"next"}
                  keyboardType={"password"}
                  placeholder={"Password"}
                  value={password}
                  setValue={updatePassword}
                  errorMessage={passwordError}
                />
                <InputField
                  returnKeyType={"done"}
                  keyboardType={"password"}
                  placeholder={"Confirm Password"}
                  value={confirmPassword}
                  setValue={updateConfirmPassword}
                  errorMessage={confirmPasswordError}
                />
              </View>

              <View
                style={{
                  marginTop: 30,
                  width: "90%",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <TouchableOpacity
                  onPress={handleSignUp}
                  style={{
                    backgroundColor: Resources.colors.royalBlue,
                    padding: 12,
                    borderRadius: 12,
                    alignSelf: "center",
                    paddingVertical: 18,
                    width: "50%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      alignSelf: "center",
                      color: Resources.colors.white,
                    }}
                  >
                    {"Sign Up"}
                  </Text>
                </TouchableOpacity>

                <Text
                  style={{
                    marginTop: 12,
                    fontSize: 12,
                    textAlign: "center",
                  }}
                >
                  {"Already have an account? "}
                </Text>
                <TouchableOpacity onPress={navigateToLogin}>
                  <Text
                    style={{
                      color: Resources.colors.royalBlue,
                      fontSize: 12,
                      marginTop: 6,
                      textAlign: "center",
                    }}
                  >
                    {"Login"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
});
export default SignUpScreen;
