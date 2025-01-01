import { View, Text, StyleSheet, Image, Platform } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import Resources from "../../../src/Resources";
const CreateAnAccountSection = ({
    style,
    onClickCreateAccount,
    onClickLogin,
  }) => {
    return (
      <View
        style={[
          {
            flexDirection: "column",
            gap: 8,
            alignItems: "center",
          },
          style,
        ]}
      >
        <TouchableOpacity
          onPress={onClickCreateAccount}
          style={{
            backgroundColor: Resources.colors.royalBlue,
            padding: 16,
            paddingHorizontal: 24,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: "medium",
              color: Resources.colors.white,
            }}
          >
            {"Create an Account"}
          </Text>
        </TouchableOpacity>
  
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 11,
              fontWeight: "light",
            }}
          >
            {"Already have an account?"}
          </Text>
  
          <TouchableOpacity onPress={onClickLogin}>
            <Text
              style={{
                fontSize: 11,
                textDecorationLine: "underline",
                color: Resources.colors.royalBlue,
                fontWeight: "light",
              }}
            >
              {"Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  export default CreateAnAccountSection;