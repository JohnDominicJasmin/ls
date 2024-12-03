import { TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Resources from "../src/Resources";
function BackIcon({ style }) {
const navigation = useNavigation();
    const onPress = React.useCallback(() => {
        if(navigation.canGoBack()){
            navigation.goBack();
        }
    });
  return (
    <TouchableOpacity style={style} onPress={onPress}>
        <Image
            style={{
            width: 30,
            height: 30,
            }}
            source={Resources.icons.ic_back_arrow}
        />
    </TouchableOpacity>
  );
}
export default BackIcon;