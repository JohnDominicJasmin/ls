import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
import { firebaseAuth } from "../../firebaseconfig";
import auth from "@react-native-firebase/auth";
import Resources from "../../src/Resources";
import BackIcon from "../../ui/BackIcon";
import { useNavigation } from "@react-navigation/native";
import CreateAnAccountSection from "../auth/components/CreateAnAccountSection";

const GuestAccountDisplay = ({
    onClickCreateAccount,
    onClickLogin,
  }) => (
    <View style={styles.guestContainer}>
        <View style={{
            alignItems: 'center'
        }}>
        <Image
        source={Resources.icons.ic_calendar_bookings}
        style={styles.calendarIcon}
      />
      <Text style={styles.guestTextTitle}>View your Bookings</Text>
      <Text style={styles.guestTextDescription}>
      Manage and view your bookings of home services
      here in LaborSeek
      </Text>
        </View>
  
      <CreateAnAccountSection style={{ marginTop: 28 }} onClickLogin={onClickLogin} onClickCreateAccount={onClickCreateAccount} />
    </View>
  );
  
  
function BookingsScreen() {

    const [user, setUser] = useState(null);
    const navigation = useNavigation()
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
  
    const onClickCreateAccount = () => {
      navigation.navigate("SignUp")
    }
  
    const onClickLogin = () => {
      navigation.navigate("Login")
    }

    return (
        <>
          <View style={styles.container}>
            <BackIcon
              style={{
                position: "absolute",
                top: 16,
                left: 20,
              }}
            />
            {user && user.isAnonymous && (
              <GuestAccountDisplay onClickCreateAccount={onClickCreateAccount} onClickLogin={onClickLogin}/>
            )}
          </View>
        </>
      );
  }


  const styles = StyleSheet.create({
    container: {
        flex: 1,
    
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Resources.colors.white,
      },
      guestContainer: {
        alignItems: "center",
        marginTop: 5,
        flexDirection: "column",
        gap: 40,
      },
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    calendarIcon: {
        height: 100,
        width: 300,
        borderWidth: 1,
        resizeMode: 'center',
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
  export default BookingsScreen;