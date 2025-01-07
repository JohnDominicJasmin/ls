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
import {
  useNavigation,
  useRoute,
  CommonActions,
} from "@react-navigation/native";
import { NewNotificationSection } from "../jobs/NotificationsScreen";

import { useNotification, markNotificationAsRead } from "../../utils/userDb";
import ProfileItem from "../auth/components/ProfileItem";
import logout from "../../utils/signOut";
import { getUserData } from "../../utils/userDb";
import NavigationBar from "../../ui/NavigationBar";
const { width, height } = Dimensions.get("window");
import { getCategories } from "../../utils/userDb";

function WebComponent({
  user: user,
  onClickSignIn,
  onClickSignUp,
  onClickNewNotif,
  onClickPremiumAccount,
  onClickSettings,
  onClickLogout,
  userPhoto,
  displayName,
  onClickCategory,
  onClickBookings,
  categories
  
}) {
  const data = mockData();
  const [shouldShowNotification, setShouldShowNotification] = useState(false);
  const { notifications, error } = useNotification(user?.uid);
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
      <TouchableOpacity onPress={() => {
        onClick(item, index)
        console.log(item)
      }}>
        <View style={styles.gridItem}>
          <View style={styles.gridCircle}>
            <Image style={styles.gridIcon} source={{uri: item.icon}} />
          </View>
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
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
      <NavigationBar user={user} userPhoto={userPhoto} onClickProfileSelection={onClickProfileSelection} onClickNotification={onClickNotification} onClickSignIn={onClickSignIn} onClickSignUp={onClickSignUp} onClickBookings={onClickBookings}/>

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
          {user && !user?.isAnonymous ? (
                    <Text style={[styles.helloText, ]} numberOfLines={2} ellipsizeMode="tail">
                      {"Hello, " + displayName}
                    </Text>
                  ) : (
                    <Text style={styles.helloText}>{"Hello, Guest User"}</Text>
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
            data={categories}
            horizontal={true}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.id}
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
          {notifications?.length === 0 ? (
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
          <ProfileItem
            iconSource={Resources.icons.ic_diamond_premium}
            buttonText={"Premium Account"}
            buttonOnPress={() => {
              onClickProfileSelection();
              onClickPremiumAccount();
            }}
          />
          <ProfileItem
            iconSource={Resources.icons.ic_setting}
            buttonText={"Settings"}
            buttonOnPress={() => {
              onClickProfileSelection();
              onClickSettings();
            }}
          />
          <ProfileItem
            iconSource={Resources.icons.ic_logout}
            buttonText={"Logout"}
            buttonOnPress={() => {
              onClickProfileSelection();
              onClickLogout();
            }}
          />
        </View>
      )}
    </View>
  );
}

function MobileComponent({ user, displayName, userPhoto, navigateNotification, onClickCategory, categories }) {
  
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
                  {user && !user?.isAnonymous && <ProfileImage user={user} photoUrl={userPhoto} />}

                  {user && !user?.isAnonymous ? (
                    <Text style={[styles.helloText, ]} numberOfLines={2} ellipsizeMode="tail">
                      {"Hello, " + displayName}
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
              <GridCategories onClick={onClickCategory} categories={categories}/>
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

const ProfileImage = ({ photoUrl, onPress }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Image
          style={styles.roundImage}
          source={
            photoUrl
              ? { uri: photoUrl }
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

const GridCategories = ({ categories, onClick }) => {

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => {
        onClick(item, index)
      }}>
        <View style={styles.gridItem}>
          <View style={styles.gridCircle}>
            <Image style={styles.gridIcon} source={{uri: item.icon}} />
          </View>
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={categories}
      renderItem={renderItem}
      keyExtractor={(item) => item.id } // Use a unique key if available
      numColumns={4} // Number of columns in the grid
      contentContainerStyle={styles.grid}
    />
  );
};


 function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [currentUser, setUser] = useState(null);
  const [displayName, setDisplayName] = useState(null)
  const [userPhoto, setUserPhoto] = useState(null)
  const [categories, setCategories] = useState(null)
  const onClickSignIn = React.useCallback(() => {
    navigation.navigate("Login");
  }, []);
  const onClickSignUp = React.useCallback(() => {
    navigation.navigate("SignUp");
  });
  const onClickBookings = React.useCallback(() => {
    navigation.navigate("Bookings");
  }, []);

  const [loading, setLoading] = useState(true); 
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();  // Call the function
        setCategories(data);  // Set the categories data to state
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);  // Stop loading once data is fetched
      }
    };

    fetchCategories();
  }, []);

  const { user, error } = getUserData(currentUser?.uid);



  const onClickNewNotif = React.useCallback(
    async (id) => {
      console.log(`Notification ${id} clicked`);
      try {
        if (!currentUser?.uid) {
          console.log("User ID is not available");
          return;
        }

        await markNotificationAsRead(currentUser.uid, id);
        console.log(`Notification ${id} marked as read for user ${currentUser.uid}`);
      } catch (error) {
        console.error("Error while marking notification as read:", error);
      }
    },
    [currentUser?.uid]
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
  const handleSignOutSuccess = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: "Login" }, // The screen you want to navigate to
        ],
      })
    );
  };

  const handleSignOutFailure = (error) => {
    console.error("Error:" + `Failed to log out: ${error.message}`);
  };

  const onClickCategory = React.useCallback((item, index) => {
    navigation.navigate("ServicesScreen", {name: item.name, image: item.image})
  }, [])

  useEffect(() => {
    console.log(`User data is ${user}`)
    if (user) {
      setDisplayName(user.firstName + " " + user.lastName)
      setUserPhoto(user.photoUrl)
    }
  }, [user]);
  if (Platform.OS === "web") {
    return (
      <WebComponent
        user={currentUser}
        categories={categories}
        onClickBookings={onClickBookings}
        onClickSignIn={onClickSignIn}
        onClickSignUp={onClickSignUp}
        onClickNewNotif={onClickNewNotif}
        onClickCategory={onClickCategory}
        onClickPremiumAccount={() => {
          navigateToScreen("PremiumAccount");
        }}
        onClickSettings={() => {
          navigateToScreen("Settings");
        }}
        onClickLogout={() => {
          logout(handleSignOutSuccess, handleSignOutFailure);
        }}
        displayName={displayName}
        userPhoto={userPhoto}
      />
    );
  }

  return (
    < MobileComponent
    categories={categories}
      user={currentUser}
      displayName={displayName}
      userPhoto={userPhoto}
      onClickCategory={onClickCategory}
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
    marginRight: 40,
    
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
    height: 400,
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

export {HomeScreen, ProfileImage, NotificationButton}