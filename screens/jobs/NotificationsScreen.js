import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Platform, ActivityIndicator } from "react-native";
import { firebaseAuth } from "../../firebaseconfig";
import auth from "@react-native-firebase/auth";
import Resources from "../../src/Resources";
import BackIcon from "../../ui/BackIcon";
import { useNavigation } from "@react-navigation/native";
import CreateAnAccountSection from "../auth/components/CreateAnAccountSection";
import { getNotifications } from "../../utils/notifications";


const GuestAccountDisplay = ({
  onClickCreateAccount,
  onClickLogin,
}) => (
  <View style={styles.guestContainer}>
    <Image
      source={Resources.icons.ic_notification_bell}
      style={styles.notificationIcon}
    />
    <Text style={styles.guestTextTitle}>Stay Updated</Text>
    <Text style={styles.guestTextDescription}>
      Receive real-time updates and notifications of your booked home services
    </Text>

    <CreateAnAccountSection style={{ marginTop: 28 }} onClickLogin={onClickLogin} onClickCreateAccount={onClickCreateAccount} />
  </View>
);




function NotificationScreen() {
  const [user, setUser] = useState(null);
  const navigation = useNavigation()

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = 'user123'
  useEffect(() => {
    // Fetch notifications when the component mounts
    const fetchUserNotifications = async () => {
      try {
        const data = await getNotifications(userId);
        if (data) {
          const formattedNotifications = Object.entries(data).map(([id, value]) => ({
            id,
            ...value,
          }));
          setNotifications(formattedNotifications);
        } else {
          setNotifications([]);
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserNotifications();
  }, [userId]);

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



  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Resources.colors.royalBlue} />
      </View>
    );
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestContainer: {
    alignItems: "center",
    marginTop: 5,
    flexDirection: "column",
    gap: 10,
  },
  notificationIcon: {
    height: 124,
    width: 110,
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
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Resources.colors.black,
  },
});

export default NotificationScreen;
