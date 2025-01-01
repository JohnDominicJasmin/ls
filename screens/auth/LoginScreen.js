import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Platform,
} from "react-native";
import { TextInput } from "react-native-paper";
import Resources from "../../src/Resources";
import { useNavigation } from "@react-navigation/native";
import { firebaseAuth } from "../../firebaseconfig";
import auth, { firebase, } from "@react-native-firebase/auth";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import Spinner from "react-native-loading-spinner-overlay"; 
import signInAsAnonymous from "../../utils/signInAnonymously"
const WebComponent = React.memo(
  ({
    emailError,
    passwordError,
    passwordVisible,
    setPasswordVisible,
    email,
    setEmail,
    password,
    setPassword,
    onClickSignUp,
    signInAsGuest,
    loginAccount,
    onClickForgotPassword
  }) => {
    console.log("WebComponent");

    return (
      <View
        style={{
          flexDirection: "row",
          height: "100%",
          width: "100%",
        }}
      >
        <Image
          style={{
            resizeMode: "center",
            height: "50%",
            width: "100%",
            flex: 0.7,
            alignSelf: "center",
          }}
          source={Resources.images.ic_banner}
        />

        <View style={[styles.container, { flex: 0.3 }]}>
          {/* Welcome Message */}
          <TextBannerComponent />

          <View
            style={[
              {
                width: "100%",
                alignSelf: "center",
              },
            ]}
          >
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.input}
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

            <Text
              style={{
                color: Resources.colors.red,
                fontSize: 12,
              }}
            >
              {emailError || ""}
            </Text>
          </View>
          {/* Password Input */}
          <View>
            <View
              style={[
                {
                  width: "100%",
                  alignSelf: "center",
                },
              ]}
            >
              <TextInput
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                placeholder="Password"
                label={"Password"}
                secureTextEntry={!passwordVisible}
                theme={{
                  colors: {
                    primary: Resources.colors.royalBlue,
                    text: "#000",
                    placeholder: "#aaa",
                  },
                }}
              />

              <Text
                style={{
                  color: Resources.colors.red,
                  fontSize: 12,
                }}
              >
                {passwordError || ""}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => setPasswordVisible((prev) => !prev)}
              style={{
                position: "absolute",
                right: 12,
                bottom: 30,
              }}
            >
              <Image
                style={{
                  width: 24,
                  height: 24,
                }}
                source={
                  passwordVisible
                    ? Resources.icons.ic_eye_open
                    : Resources.icons.ic_eye_close
                }
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity onPress={onClickForgotPassword}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity onPress={loginAccount} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Guest Login */}
          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>or login as a guest user</Text>
            <View style={styles.line} />
          </View>
          <TouchableOpacity onPress={signInAsGuest} style={styles.guestButton}>
            <Text style={styles.guestButtonText}>Login as Guest User</Text>
          </TouchableOpacity>

          {/* Sign Up */}
          <TouchableOpacity onPress={onClickSignUp}>
            <Text style={styles.signUp}>
              Don’t have an account?{" "}
              <Text style={styles.signUpLink}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
);

const TextBannerComponent = () => {
  return (
    <View style={styles.logoContainer}>
      {/* <View style={styles.logo} /> */}
      <Image style={{height: 75, width: 75}} source={Resources.icons.app_logo}/>
      <Text style={styles.title}>Welcome to LaborSeek</Text>
      <Text style={styles.subtitle}>Login your email and password</Text>
    </View>
  );
};
const MobileComponent = React.memo(
  ({
    emailError,
    passwordError,
    passwordVisible,
    setPasswordVisible,
    email,
    setEmail,
    password,
    setPassword,
    onClickSignUp,
    signInAsGuest,
    loginAccount,
    onClickForgotPassword,
  }) => {
    console.log("MobileComponent");
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <SafeAreaView>
          <ScrollView>
            <View style={styles.container}>
              {/* Welcome Message */}
              <TextBannerComponent />
              <View
                style={[
                  {
                    width: "100%",
                    alignSelf: "center",
                  },
                ]}
              >
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  style={styles.input}
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

                <Text
                  style={{
                    color: Resources.colors.red,
                    fontSize: 12,
                  }}
                >
                  {emailError || ""}
                </Text>
              </View>

              {/* Password Input */}
              <View>
                <View
                  style={[
                    {
                      width: "100%",
                      alignSelf: "center",
                    },
                  ]}
                >
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    placeholder="Password"
                    label={"Password"}
                    secureTextEntry={!passwordVisible}
                    theme={{
                      colors: {
                        primary: Resources.colors.royalBlue,
                        text: "#000",
                        placeholder: "#aaa",
                      },
                    }}
                  />
                  <Text
                    style={{
                      color: Resources.colors.red,
                      fontSize: 12,
                    }}
                  >
                    {passwordError || ""}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => setPasswordVisible((prev) => !prev)}
                  style={{
                    position: "absolute",
                    right: 12,
                    bottom: 50,
                  }}
                >
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                    }}
                    source={
                      passwordVisible
                        ? Resources.icons.ic_eye_open
                        : Resources.icons.ic_eye_close
                    }
                  />
                </TouchableOpacity>
              </View>

              {/* Forgot Password */}
              <TouchableOpacity onPress={onClickForgotPassword}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                onPress={loginAccount}
                style={styles.loginButton}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

              {/* Guest Login */}
              <View style={styles.divider}>
                <View style={styles.line} />
                <Text style={styles.dividerText}>or login as a guest user</Text>
                <View style={styles.line} />
              </View>
              <TouchableOpacity onPress={signInAsGuest} style={styles.guestButton}>
                <Text style={styles.guestButtonText}>Login as Guest User</Text>
              </TouchableOpacity>

              {/* Sign Up */}
              <TouchableOpacity onPress={onClickSignUp}>
                <Text style={styles.signUp}>
                  Don’t have an account?{" "}
                  <Text style={styles.signUpLink}>Sign up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
);
function LoginScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const navigation = useNavigation();

  const onClickSignUp = React.useCallback(() => {
    navigation.navigate("SignUp");
  });
  const signIn = React.useCallback(async () => {
    try {
      let userCredential;
  
      if (Platform.OS === "web") {
        // Sign in using Firebase Web SDK
        userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      } else {
        // Sign in using React Native Firebase SDK
        userCredential = await auth().signInWithEmailAndPassword(email, password);
      }
  
      // Check if the email is verified
      if (userCredential.user.emailVerified) {
        console.log("Sign in successful and email is verified");
        return userCredential; // Return the userCredential for further use
      } else {
        console.warn("Email is not verified. Please verify your email.");
        return null; // Or handle unverified email case as needed
      }
    } catch (error) {
      console.error("Sign in failed: ", error.message);
      throw error; // Rethrow the error to handle it in the calling code
    }
  }, [email, password]);
  
  const signInAsGuest = React.useCallback(async () => {
    try{
      signInAsAnonymous({onSuccess: () => {
        console.log(`Signing in anon:`)
      navigation.replace('Main'); // Replace to go directly to MainTabNavigator without the option to go back

      navigation.navigate("Home");
      }, onFailure: (error) => {
        console.error(`signInAnonymously error: ${error.message}`)
      }})
      
    }catch(e){
    }
  })
  const loginAccount = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const userCredential = await signIn();
      if (!userCredential.user?.emailVerified) {
        navigation.navigate("EmailVerification", { email: userCredential.user.email });
        return;
      }
      //navigate to home page
      navigation.replace('Main'); // Replace to go directly to MainTabNavigator without the option to go back
      // Then navigate to Home within the MainTabNavigator
      navigation.navigate('Home');
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      if (e.code === "auth/invalid-email") {
        setEmailError("Invalid email");
      } else if (e.code === "auth/user-not-found") {
        setEmailError("User not found");
      } else if (e.code === "auth/wrong-password") {
        setPasswordError("Wrong password");
      } else if (e.code === "auth/invalid-credential") {
        alert("Invalid email or password. Please try again");
      }
    }
  });

  const updateEmail = React.useCallback(
    (value) => {
      setEmail(value);
      setEmailError(null);
    },
    [email, emailError]
  );

  const updatePassword = React.useCallback(
    (value) => {
      setPassword(value);
      setPasswordError(null);
    },
    [password, passwordError]
  );

  const onClickForgotPassword = React.useCallback(() => {
    navigation.navigate("ForgotPassword")
  }, [])

  return (
    <>
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

        {Platform.OS === "web" && (
          <WebComponent
            emailError={emailError}
            passwordError={passwordError}
            passwordVisible={passwordVisible}
            setPasswordVisible={setPasswordVisible}
            email={email}
            setEmail={updateEmail}
            password={password}
            setPassword={updatePassword}
            onClickSignUp={onClickSignUp}
            loginAccount={loginAccount}
            signInAsGuest={signInAsGuest}
            onClickForgotPassword={onClickForgotPassword}

          />
        )}

        {Platform.OS !== "web" && (
          <MobileComponent
            emailError={emailError}
            passwordError={passwordError}
            passwordVisible={passwordVisible}
            setPasswordVisible={setPasswordVisible}
            email={email}
            signInAsGuest={signInAsGuest}
            setEmail={updateEmail}
            password={password}
            setPassword={updatePassword}
            onClickSignUp={onClickSignUp}
            loginAccount={loginAccount}
            onClickForgotPassword={onClickForgotPassword}

          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 60,
    height: 60,
    backgroundColor: "#4C7DFD",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: Resources.colors.royalBlue,
    backgroundColor: "white",
    fontSize: 16,
    paddingTop: 10,
    marginBottom: 4,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  eyeIcon: {
    marginLeft: 10,
  },
  forgotPassword: {
    fontSize: 14,
    color: "#aaa",
    textAlign: "right",
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: "#4C7DFD",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: "#666",
  },
  guestButton: {
    backgroundColor: "#E6EDFD",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 20,
  },
  guestButtonText: {
    color: "#4C7DFD",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUp: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
  },
  signUpLink: {
    color: "#4C7DFD",
    fontWeight: "bold",
  },
});

export default LoginScreen;
