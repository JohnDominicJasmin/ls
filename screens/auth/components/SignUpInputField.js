import { View, Text, StyleSheet, TextInput } from "react-native";
import Resources from "../../../src/Resources";

function InputField({
  style,
  value,
  setValue,
  placeholder,
  keyboardType,
  returnKeyType,
  errorMessage,
}) {
  return (
    <View
      style={[
        {
          width: "100%",
          alignSelf: "center",
        },
        style,
      ]}
    >
      <Text
        style={{
          fontSize: 14,
          marginBottom: 8, // Adds spacing below the label
        }}
      >
        {placeholder}
      </Text>

      <TextInput
        value={value}
        onChangeText={setValue}
        style={styles.input}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        secureTextEntry={keyboardType === "password"}
        theme={{
          colors: {
            primary: Resources.colors.alto,
            text: "#000",
            placeholder: "#aaa",
          },
        }}
      />

      {errorMessage && (
        <Text
          style={{
            color: Resources.colors.red,
            fontSize: 12,
            marginTop: 4, // Adds spacing above the error message
          }}
        >
          {errorMessage}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1, // Ensures the input stretches to fill the parent container
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Resources.colors.alto,
    backgroundColor: "#fff", // Optional: Adds a white background
  },
});

export default InputField;
