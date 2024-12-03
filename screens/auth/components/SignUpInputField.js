import {  View, Text, StyleSheet, TextInput} from "react-native";
import Resources from "../../../src/Resources";

function SignUpInputField({ style, value, setValue, placeholder, keyboardType,returnKeyType, errorMessage }) {
    return (
        <View
        
         style={[style, {
            width: "100%",
            alignSelf: "center",
         }]}>

            <Text style={{
                fontSize: 14
            }}>
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

            <Text style={{
                color: Resources.colors.red,
                fontSize: 12,
            }}>
                {errorMessage}
            </Text>
        </View>
    )
}   

const styles = StyleSheet.create({
    input: {
        marginHorizontal: 12,
        marginTop: 8,
        borderRadius: 12,   
        width: "100%",
        alignSelf: "center",
        padding: 8,
        borderWidth: 1,
        borderColor: Resources.colors.alto,
    },
});

export default SignUpInputField;