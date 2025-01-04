import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Platform, Alert } from "react-native";
import { firebaseAuth } from "../../firebaseconfig";
import auth from "@react-native-firebase/auth";
import Resources from "../../src/Resources";
import BackIcon from "../../ui/BackIcon";
import { useNavigation,CommonActions } from "@react-navigation/native";
import CreateAnAccountSection from "../auth/components/CreateAnAccountSection";
import ProfileItem from "../auth/components/ProfileItem";
import signOut from "../../utils/signOut";
import logout from "../../utils/signOut";
const GuestAccountDisplay = ({ onClickCreateAccount, onClickLogin }) => (
  <View style={styles.guestContainer}>
    <View
      style={{
        alignItems: "center",
      }}
    >
      <Image source={Resources.icons.ic_rocket} style={styles.calendarIcon} />
      <Text style={styles.guestTextTitle}>View your Bookings</Text>
      <Text style={styles.guestTextDescription}>
        Join LaborSeek to book trusted home services, enjoy easy payments, and
        access exclusive discounts
      </Text>
    </View>

    <CreateAnAccountSection
      style={{ marginTop: 28 }}
      onClickLogin={onClickLogin}
      onClickCreateAccount={onClickCreateAccount}
    />
  </View>
);

const ProfileScreenContent = ({
  imageSource,
  name,
  address,
  isFreeAccount,
  onClickPremiumAccount,
  onClickSettings,
  onClickLogout
}) => {
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 75,
      }}
    >
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Image
          source={imageSource}
          style={{
            height: 90,
            width: 90,
            borderRadius: 100,
          }}
        />

        <Text
          style={{
            color: Resources.colors.black,
            fontWeight: "medium",
            fontSize: 22,
          }}
        >
          {name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={Resources.icons.ic_location}
            style={{
              width: 24,
              resizeMode: "center",
              height: 24,
            }}
          />
          <Text style={{ color: Resources.colors.black, fontWeight: "medium" }}>
            {address}
          </Text>
        </View>
        {isFreeAccount ? (
          <>
            <Text
              style={{
                color: Resources.colors.emperor,
              }}
            >
              {"Free Account"}
            </Text>
          </>
        ) : (
          <>
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Image
                source={Resources.icons.ic_diamond_premium}
                style={{
                  width: 16,
                  height: 16,
                  tintColor: Resources.colors.royalBlue,
                }}
              />
              <Text
                style={{
                  color: Resources.colors.royalBlue,
                }}
              >
                {"Premium Account"}
              </Text>
            </View>
          </>
        )}
      </View>
      <View
        style={{
          marginTop: 30,
          flexDirection: "column",
          gap: 8,
          width: "100%",
          padding: 24,
          gap: 32,
          alignItems: "flex-start",
        }}
      >
        <ProfileItem
          iconSource={Resources.icons.ic_diamond_premium}
          buttonText={"Premium Account"}
          buttonOnPress={onClickPremiumAccount}
        />
        <ProfileItem
          iconSource={Resources.icons.ic_setting}
          buttonText={"Settings"}
          buttonOnPress={onClickSettings}
        />
        <ProfileItem
          iconSource={Resources.icons.ic_logout}
          buttonText={"Logout"}
          buttonOnPress={onClickLogout}
        />
      </View>
    </View>
  );
};

function ProfileScreen() {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const mockData = {
    photoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9FKvV2vt3otTUnhnrrCKP-hYKKsRuFLTSsZ6f5buBye7-x7hbDkqlhgQygXSYrJAZo5I",
    name: "John Doe",
    address: "123 Main St, City, Country",
    isFree: true,
  };
  useEffect(() => {
    const fetchUser = async () => {
      let currentUser =
        Platform.OS === "web"
          ? firebaseAuth.currentUser // Web
          : auth().currentUser; // Mobile

      setUser(currentUser); // Set the user state
      console.log("Current user is:", currentUser);
    };

    fetchUser();
  }, []);

  const onClickCreateAccount = React.useCallback(() => {
    navigation.navigate("SignUp");
  },[] );

  const onClickLogin = React.useCallback(() => {
    navigation.navigate("Login");
  }, []);

  const onClickPremiumAccount = React.useCallback(() => {
    navigation.navigate("PremiumAccount")
  }, [])

  const onClickSettings = React.useCallback(() => {
    navigation.navigate("Settings")
    
  }, [])

  const handleSuccess = () => {
    const onDialogDismiss  = () => {
        navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: 'Login' }, // The screen you want to navigate to
              ],
            })
          )
    }
    Alert.alert(
        "Success",
        "Logged out successfully",
        [{ text: "OK", onPress: onDialogDismiss }]
      );
      
    
  };
  
  const handleFailure = (error) => {
    Alert.alert("Error", `Failed to log out: ${error.message}`);
  };
  
  return (
    <>
      <View style={styles.container}>
        <BackIcon
          style={{
            top: 16,
            left: 20,
            position: "absolute",
          }}
        />
        {user && user.isAnonymous ? (
          <GuestAccountDisplay
            onClickCreateAccount={onClickCreateAccount}
            onClickLogin={onClickLogin}
          />
        ) : (
          <ProfileScreenContent
            imageSource={{ uri: mockData.photoUrl }}
            name={mockData.name}
            address={mockData.address}
            isFreeAccount={mockData.isFree}
            onClickPremiumAccount={onClickPremiumAccount}
            onClickSettings={onClickSettings}
            onClickLogout={() => {
                logout(handleSuccess, handleFailure)
            }}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "flex-start",
    backgroundColor: Resources.colors.white,
  },
  guestContainer: {
    alignItems: "center",
    marginTop: 5,
    flex: 1,
    justifyContent: 'center',
    verticalAlign:'middle',

    flexDirection: "column",
    gap: 40,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  calendarIcon: {
    height: 100,
    width: 300,
    borderWidth: 1,
    resizeMode: "center",
    marginBottom: 24,
  },
  guestTextTitle: {
    fontSize: 26,
    color: Resources.colors.black,
  },
  guestTextDescription: {
    fontSize: 13,
    maxWidth: 300,
    color: Resources.colors.black,
    textAlign: "center",
  },
});
export default ProfileScreen;
