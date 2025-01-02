import {
    View,
    Text,
    Image,
    Platform,
    TouchableOpacity,
  } from "react-native";
  import Resources from "../../src/Resources";
  import BackIcon from "../../ui/BackIcon";
  import { useNavigation } from "@react-navigation/native";
import TopAppBar from "../auth/components/TopAppBar";
import ProfileItem from "../auth/components/ProfileItem";
  function MobileComponent () {
    return (<View style={{
        flex: 1,
        flexDirection: 'column'
    }}>

        <TopAppBar title="Settings"/>

        <View  style={{
            marginTop: 44,
            gap :20,
            paddingVertical: 24,
            paddingHorizontal: 16
        }}>
        <ProfileItem iconSource={Resources.icons.ic_person} buttonText={"Your Profile"} />
        <ProfileItem iconSource={Resources.icons.ic_key} buttonText={"Change Password"} />
        </View>

    </View>)
  }

  function WebComponent () {
    return (
        <View>


        </View>
    )
  }
function SettingScreen(){
    const navigation = useNavigation()
    return <>{Platform.OS === "web" ? <WebComponent /> : <MobileComponent />}</>
}
export default SettingScreen;