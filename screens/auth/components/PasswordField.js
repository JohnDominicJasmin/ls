import { View, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import Resources from "../../../src/Resources";

const PasswordField = ({ passwordVisible, setPasswordVisible, password, setPassword }) => {
    return (

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
    )
};