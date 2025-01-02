import {
    View,
    Text,
    Image,
    TouchableOpacity,

  } from "react-native";
  import Resources from "../../../src/Resources";

const ProfileItem = ({ iconSource, buttonText, buttonOnPress }) => {
    return (
  
      <TouchableOpacity onPress={buttonOnPress}>
      <View
  style={{
    flexDirection: "row",
    gap: 12,
    width: "100%", // Match the parent width
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 2, // Add padding for better spacing
  }}
>
  <Image
    source={iconSource}
    style={{
      tintColor: Resources.colors.black,
      width: 22, // Fixed width for the icon
      height: 20, // Fixed height for the icon
      resizeMode: "contain", // Ensures the image fits without distortion
    }}
  />
  <Text
    style={{
      fontSize: 13,
      color: Resources.colors.black,
      flex: 1,
    }}
  >
    {buttonText}
  </Text>
</View>

      </TouchableOpacity>
  
    );
  };

  export default ProfileItem;