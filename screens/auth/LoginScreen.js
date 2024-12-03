import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import { TextInput } from "react-native-paper";
import Resources from "../../src/Resources";
import { useNavigation } from "@react-navigation/native";
const WebComponent = React.memo(
  ({
    passwordVisible,
    setPasswordVisible,
    email,
    setEmail,
    password,
    setPassword,
    onClickSignUp
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

          {/* Email Input */}
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

          {/* Password Input */}
          <View>
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
          <TouchableOpacity>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Guest Login */}
          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>or login as a guest user</Text>
            <View style={styles.line} />
          </View>
          <TouchableOpacity style={styles.guestButton}>
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
    <View style={styles.logo} />
    <Text style={styles.title}>Welcome to LaborSeek</Text>
    <Text style={styles.subtitle}>Login your email and password</Text>
  </View>
  )
}
const MobileComponent = React.memo(
  ({
    passwordVisible,
    setPasswordVisible,
    email,
    setEmail,
    password,
    setPassword,
    onClickSignUp
  }) => {
    console.log("MobileComponent");
    return (
      <View style={styles.container}>
        {/* Welcome Message */}
        <TextBannerComponent /> 
       
        {/* Email Input */}
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

        {/* Password Input */}
        <View>
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
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Guest Login */}
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>or login as a guest user</Text>
          <View style={styles.line} />
        </View>
        <TouchableOpacity style={styles.guestButton}>
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
    );
  }
);
function LoginScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const onClickSignUp = React.useCallback(() => {
    navigation.navigate("SignUp");
  });
  if (Platform.OS === "web") {
    return (
      <WebComponent
        passwordVisible={passwordVisible}
        setPasswordVisible={setPasswordVisible}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onClickSignUp={onClickSignUp}
      />
    );
  }

  return (
    <MobileComponent
      passwordVisible={passwordVisible}
      setPasswordVisible={setPasswordVisible}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      onClickSignUp={onClickSignUp}
    />
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
  input: {
    borderBottomWidth: 1,
    borderColor: Resources.colors.royalBlue,
    backgroundColor: "white",
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 20,
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
