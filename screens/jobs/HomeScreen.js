import {
  View,
  Text,
  Platform,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Resources from "../../src/Resources";
import { use } from "react";
import { firebaseAuth } from "../../firebaseconfig";
import auth, { firebase } from "@react-native-firebase/auth";
import SearchBar from "../auth/components/SearchBar";
import mockData from "../../data/mockData";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NewNotificationSection } from "../jobs/NotificationsScreen";
import {
  useNotificationsWeb,
  markNotificationAsReadWeb,
} from "../../utils/notificationsWeb";

const { width, height } = Dimensions.get("window");
const ProfilePopupItem = ({ iconSource, buttonText, buttonOnPress }) => {
  return (

    <TouchableOpacity onPress={buttonOnPress}>
    <View
      style={{
        flexDirection: "row",
        gap: 8,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={iconSource}
        style={{
          tintColor: Resources.colors.black,
          width: 18,
          height: 18,
          padding: 8,
        }}
      />
      <Text
        style={{
          fontSize: 13,
          color: Resources.colors.black,
        }}
      >
        {buttonText}
      </Text>
    </View>
    </TouchableOpacity>

  );
};
function WebComponent({
  user: user,
  onClickSignIn,
  onClickSignUp,
  onClickNewNotif,
  onClickPremiumAccount,
  onClickSettings,
  onClickLogout,
}) {
  const data = mockData();
  const [shouldShowNotification, setShouldShowNotification] = useState(false);
  const { notifications, error } = useNotificationsWeb(user?.uid);
  const [shouldShowProfileSelections, setShouldShowProfileSelections] =
    useState(false);
  const onClickNotification = React.useCallback(() => {
    setShouldShowNotification((prev) => !prev);
  }, []);
  const onClickProfileSelection = React.useCallback(() => {
    setShouldShowProfileSelections((prev) => !prev);
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <View style={[styles.gridItem, { marginHorizontal: 16 }]}>
        <View style={styles.gridCircle}>
          <Image style={styles.gridIcon} source={item.icon} />
        </View>

        <Text style={styles.itemText}>{item.serviceName}</Text>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        flexDirection: "column",
        paddingHorizontal: 32,
        paddingVertical: 16,
      }}
    >
      <View
        style={{
          width: "100%",
          paddingVertical: 8,
          height: "auto",
          flexDirection: "row",
          justifyContent: "end",
          alignItems: "center",
          gap: 8,
        }}
      >
        <View
          style={{
            flex: 1,
            marginLeft: 32,
          }}
        >
          <Image
            source={Resources.icons.app_logo}
            style={{ height: 64, width: 64 }}
          />
        </View>
        <SearchBar styleContainer={{ marginTop: 16, width: 400 }} />

        {user && !user.isAnonymous && (
          <ProfileImage user={user} onPress={onClickProfileSelection} />
        )}

        {user && !user.isAnonymous && (
          <NotificationButton onPress={onClickNotification} />
        )}

        {user && user.isAnonymous && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
              paddingHorizontal: 16,
            }}
          >
            <TouchableOpacity onPress={onClickSignIn}>
              <Text
                style={{
                  color: Resources.colors.royalBlue,
                }}
              >
                {"Log In"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: 12,
                borderRadius: 8,
                backgroundColor: Resources.colors.royalBlue_1,
              }}
              onPress={onClickSignUp}
            >
              <Text
                style={{
                  color: Resources.colors.royalBlue,
                }}
              >
                {"Sign Up"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View
        style={{
          flexDirection: "column",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            width: "auto",
            borderColor: "red",
            justifyContent: "flex-start",
            gap: 8,
          }}
        >
          {user?.displayName && user ? (
            <Text style={styles.helloTextWeb}>
              {"Hello, " + user?.displayName}
            </Text>
          ) : (
            <Text style={styles.helloTextWeb}>{"Hello, Guest User"}</Text>
          )}
          <Text
            style={{
              color: Resources.colors.gray_1,
              fontSize: 20,
            }}
          >
            {"Welcome back to LaborSeek!"}
          </Text>
        </View>

        <View
          style={{
            paddingVertical: 24,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <FlatList
            data={data.home_page.services}
            horizontal={true}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.grid}
          />
        </View>
      </View>

      <View
        style={{
          flex: 1,
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={Resources.images.ic_home_page_banner_web}
          style={{
            resizeMode: "center",
            width: width * 0.5,
            height: height * 0.5,
          }}
        />
      </View>
      {shouldShowNotification && (
        <View
          style={[
            {
              width: 350,
              maxHeight: 800,
              height: "auto",
            },
            styles.popUp,
          ]}
        >
          {notifications.length === 0 ? (
            <NoNotificationsYet />
          ) : (
            <NewNotificationSection
              notifications={notifications}
              onClickNewNotif={onClickNewNotif}
            />
          )}
        </View>
      )}

      {shouldShowProfileSelections && (
        <Pressable
          onPress={onClickProfileSelection}
          style={{
            width: "100%",
            height: "100%",
            flex: 1,
            position: "absolute",
          }}
        ></Pressable>
      )}

      {shouldShowNotification && (
        <Pressable
          onPress={onClickNotification}
          style={{
            width: "100%",
            height: "100%",
            flex: 1,
            position: "absolute",
          }}
        ></Pressable>
      )}

      {shouldShowProfileSelections && (
        <View
          style={[
            styles.popUp,
            {
              width: "auto",
              right: 70,
              height: "auto",
              padding: 16,
              alignItems: "flex-start",
              gap: 16,
            },
          ]}
        >
          <ProfilePopupItem
            iconSource={Resources.icons.ic_diamond_premium}
            buttonText={"Premium Account"}
            buttonOnPress={() => {
              onClickProfileSelection()
            }}
          />
          <ProfilePopupItem
            iconSource={Resources.icons.ic_setting}
            buttonText={"Setting"}
            buttonOnPress={() => {
              onClickProfileSelection()

            }}

          />
          <ProfilePopupItem
            iconSource={Resources.icons.ic_logout}
            buttonText={"Logout"}
            buttonOnPress={() => {
              onClickProfileSelection()

            }}

          />
        </View>
      )}
    </View>
  );
}

function MobileComponent({ user, navigateNotification }) {
  const route = useRoute();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView>
        <View
          style={{
            height: "100%",
            flexDirection: "column",
          }}
        >
          <ScrollView>
            <View style={styles.parentContainer}>
              <View style={styles.topNavigationContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    flex: 1,
                  }}
                >
                  {user && !user.isAnonymous && <ProfileImage user={user} />}

                  {user?.displayName && user ? (
                    <Text style={styles.helloText}>
                      {"Hello, " + user?.displayName}
                    </Text>
                  ) : (
                    <Text style={styles.helloText}>{"Hello, Guest User"}</Text>
                  )}
                </View>

                <TouchableOpacity onPress={navigateNotification}>
                  <Image
                    style={{
                      width: 32,
                      height: 32,
                    }}
                    source={Resources.icons.ic_notification}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.welcomeText}>
                {"Welcome back to LaborSeek!"}
              </Text>

              <SearchBar styleContainer={{ marginTop: 16 }} />
              <GridCategories />
              <PosterImage />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const NoNotificationsYet = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontWeight: "semibold",
          fontSize: 20,
          color: Resources.colors.black,
        }}
      >
        {"No Notification yet"}
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: 12,
          marginHorizontal: 30,
          marginTop: 8,
        }}
      >
        {
          "Any updates or important information will appear here, so check back soon to stay in the loop with your bookings and service alerts."
        }
      </Text>
    </View>
  );
};
const NotificationButton = ({ onPress }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Image
          style={{
            width: 32,
            height: 32,
          }}
          source={Resources.icons.ic_notification}
        />
      </TouchableOpacity>
    </View>
  );
};

const ProfileImage = ({ user, onPress }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Image
          style={styles.roundImage}
          source={
            user?.photoURL
              ? { uri: user?.photoURL }
              : Resources.icons.ic_placeholder
          }
        />
      </TouchableOpacity>
    </View>
  );
};
const PosterImage = () => {
  return (
    <Image
      style={styles.posterImage}
      source={Resources.images.ic_home_page_banner}
    />
  );
};

const GridCategories = () => {
  const data = mockData();

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.gridItem}>
        <View style={styles.gridCircle}>
          <Image style={styles.gridIcon} source={item.icon} />
        </View>

        <Text style={styles.itemText}>{item.serviceName}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={data.home_page.services}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={4} // Number of columns in the grid
      contentContainerStyle={styles.grid}
    />
  );
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [user, setUser] = useState(null);
  const onClickSignIn = React.useCallback(() => {
    navigation.navigate("Login");
  }, []);
  const onClickSignUp = React.useCallback(() => {
    navigation.navigate("SignUp");
  });
  useEffect(() => {
    const fetchUser = async () => {
      let currentUser;
      if (Platform.OS === "web") {
        currentUser = firebaseAuth.currentUser; // Web
      } else {
        currentUser = auth().currentUser; // Mobile
      }

      setUser(currentUser); // Set the user state
      console.log("Current user is" + currentUser);
    };

    fetchUser();
  }, []);

  React.useEffect(() => {
    console.log(
      `User is ${JSON.stringify(user?.photoURL)} ${user?.displayName} `
    );
  }, [user]);
  const onClickNewNotif = React.useCallback(
    async (id) => {
      console.log(`Notification ${id} clicked`);
      try {
        if (!user?.uid) {
          console.log("User ID is not available");
          return;
        }

        await markNotificationAsReadWeb(user.uid, id);
        console.log(`Notification ${id} marked as read for user ${user.uid}`);
      } catch (error) {
        console.error("Error while marking notification as read:", error);
      }
    },
    [user?.uid]
  );
  const navigateToScreen = React.useCallback(
    (screenRoute) => {
      if (route.name === screenRoute) {
        console.log(`Already on the ${screenRoute} screen`);
        return; // Do nothing if already on the target screen
      }

      navigation.navigate(screenRoute);
    },
    [route.name, navigation]
  );

  if (Platform.OS === "web") {
    return (
      <WebComponent
        user={user}
        onClickSignIn={onClickSignIn}
        onClickSignUp={onClickSignUp}
        onClickNewNotif={onClickNewNotif}
      />
    );
  }

  return (
    <MobileComponent
      user={user}
      navigateNotification={() => {
        navigateToScreen("Notification");
      }}
    />
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    flexDirection: "column",
    marginHorizontal: 24,
    marginVertical: 16,
  },
  helloText: {
    fontSize: 24,
    color: Resources.colors.black,
  },
  helloTextWeb: {
    fontSize: 48,
    color: Resources.colors.black,
  },

  popUp: {
    position: "absolute",
    right: 40,
    top: 50,
    zIndex: 10,
    elevation: 2,
    shadowRadius: 1.5,
    shadowOpacity: 0.4,
    borderRadius: 16,
    marginTop: 44,
    // justifyContent: "center",
    backgroundColor: "white",
    pointerEvents: "auto",
  },

  roundImage: {
    width: 44, // Set width
    height: 44, // Set height (equal to width for a circle)
    borderRadius: 50, // Half of the width or height for a circle
    borderWidth: 2, // Optional: add a border
    borderColor: Resources.colors.royalBlue, // Optional: border color
  },
  topNavigationContainer: {
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 8,
    width: "100%",
  },

  posterImage: {
    flex: 1,
    width: "100%",
    marginTop: 16,
    height: 360,
    resizeMode: "center",
  },
  welcomeText: {
    color: Resources.colors.silver,
    fontSize: 20,
    paddingTop: 8,
    paddingHorizontal: 4,
  },

  gridIcon: {
    height: 35,
    width: 35,
    tintColor: Resources.colors.royalBlue,
  },

  gridCircle: {
    width: 60,
    height: 60,
    backgroundColor: "white",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  grid: {},
  gridItem: {
    flex: 1,
    margin: 5,
    padding: 8,
    flexDirection: "column",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(65, 105, 225, 0.2)", // Semi-transparent Royal Blue
    borderRadius: 10,
  },
  itemText: {
    fontSize: 10,
    paddingVertical: 3,
    color: Resources.colors.royalBlue,
    textAlign: "center",
  },
  seeMoreText: {
    fontSize: 16,
    color: "#007bff",
    fontWeight: "bold",
  },
});
