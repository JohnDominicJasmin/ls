import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { firebaseAuth } from "../../firebaseconfig";
import auth from "@react-native-firebase/auth";
import Resources from "../../src/Resources";
import BackIcon from "../../ui/BackIcon";
import { useNavigation } from "@react-navigation/native";
import CreateAnAccountSection from "../auth/components/CreateAnAccountSection";
import {
  markNotificationAsRead,
  useNotifications,
} from "../../utils/notificationsMobile";
import TopAppBar from "../auth/components/TopAppBar";
import {
  NewNotificationCard,
  RecentNotificationCard,
} from "../auth/components/notification/NotificationCard";
const GuestAccountDisplay = ({ onClickCreateAccount, onClickLogin }) => (
  <View style={styles.guestContainer}>
    <Image
      source={Resources.icons.ic_notification_bell}
      style={styles.notificationIcon}
    />
    <Text style={styles.guestTextTitle}>Stay Updated</Text>
    <Text style={styles.guestTextDescription}>
      Receive real-time updates and notifications of your booked home services
    </Text>

    <CreateAnAccountSection
      style={{ marginTop: 55 }}
      onClickLogin={onClickLogin}
      onClickCreateAccount={onClickCreateAccount}
    />
  </View>
);

function NotificationSection({ userId, onClickNewNotif}){
  const { notifications, error } = useNotifications(userId);
  return (
    <NewNotificationSection notifications={notifications} onClickNewNotif={onClickNewNotif}/>
  )
}
function NewNotificationSection({notifications, onClickNewNotif }) {

  // Check if notifications exist and handle the case where they might be empty or null
  const newNotifications = useMemo(() => {
    return notifications?.filter((notification) => !notification.isRead) || [];
  }, [notifications]);

  // Filter for old (read) notifications
  const oldNotifications = useMemo(() => {
    return notifications?.filter((notification) => notification.isRead) || [];
  }, [notifications]);

  React.useEffect(() => {
    console.log(`Notifs are ${JSON.stringify(notifications)}`);
  }, [notifications]);

  const renderNewNotificationCard = ({ item }) => (
    <NewNotificationCard
      name={item.displayName}
      date={item.date}
      time={item.time}
      description={item.description}
      onPress={() => {
        console.log(`Notification ${item.id} clicked`);
        onClickNewNotif(item.id);
      }}
    />
  );
  const renderOldNotificationCard = ({item}) => (
    <RecentNotificationCard
    name={item.displayName}
    date={item.date}
    time={item.time}
    description={item.description}
  />
  )
  return (
    <View
      style={{
        flexDirection: "column",
        marginTop: 24,
        flex: 1,
        width: "100%",
        paddingHorizontal: 12,
      }}
    >
      {newNotifications.length > 0 && (
        <Text style={styles.listTitle}>{"New Notifications"}</Text>
      )}
  
      <FlatList
        style={{
          flex: 1, // Takes up half of the screen's height
          height: "50%", // Explicitly set height to 50% of the screen
        }}
        showsHorizontalScrollIndicator={false}
        data={newNotifications}
        renderItem={renderNewNotificationCard}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={3}
      />
  
      {oldNotifications.length > 0 && (
        <Text style={styles.listTitle}>{"Recent Notifications"}</Text>
      )}
  
      <FlatList
        style={{
          flex: 1, // Takes up half of the screen's height
          height: "50%", // Explicitly set height to 50% of the screen
        }}
        showsHorizontalScrollIndicator={false}
        data={oldNotifications}
        renderItem={renderOldNotificationCard}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={3}
      />
    </View>
  );
  
}
function NotificationScreen() {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      let currentUser =
        Platform.OS === "web"
          ? firebaseAuth.currentUser // Web
          : auth().currentUser; // Mobile

      setUser(currentUser); // Set the user state
      console.log("Current user id is:", currentUser.uid);
      setLoading(false);
    };

    fetchUser();
  }, []);

  const onClickCreateAccount = () => {
    navigation.navigate("SignUp");
  };

  const onClickLogin = () => {
    navigation.navigate("Login");
  };
  const onClickNewNotif = React.useCallback(
    async (id) => {
      try {
        if (!user?.uid) {
          console.log("User ID is not available");
          return;
        }

        await markNotificationAsRead(user.uid, id);
        console.log(`Notification ${id} marked as read for user ${user.uid}`);
      } catch (error) {
        console.error("Error while marking notification as read:", error);
      }
    },
    [user?.uid]
  ); // Make sure to add `user.uid` as a dependency

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
        <TopAppBar title="Notifications" />

        {user && user.isAnonymous ? (
          <GuestAccountDisplay
            onClickCreateAccount={onClickCreateAccount}
            onClickLogin={onClickLogin}
          />
        ) : (
          <NotificationSection
            userId={user.uid}
            onClickNewNotif={onClickNewNotif}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: Resources.colors.white,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  guestContainer: {
    alignItems: "center",
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    verticalAlign:'middle',
    marginTop: 5,
    flex: 1,
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
  listTitle: {
    fontSize: 13,
    fontWeight: "semibold",
    paddingVertical: 8,
    color: Resources.colors.black,
  },
});

export { NotificationScreen, NewNotificationSection };
