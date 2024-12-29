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
} from "react-native";
import React, { useEffect, useState } from "react";
import Resources from "../../src/Resources";
import { use } from "react";
import { firebaseAuth } from "../../firebaseconfig";
import auth, { firebase } from "@react-native-firebase/auth";
import SearchBar from "../auth/components/SearchBar";
import mockData from "../../data/mockData";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

function WebComponent({ user: user, onClickSignIn, onClickSignUp }) {
  const data = mockData();
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
        {/* <SearchBar styleContainer={{ marginTop: 16 }} /> */}
        <ProfileImage user={user} />
        <NotificationButton />

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
            onPress={ onClickSignUp }
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
    </View>
  );
}

function MobileComponent({ user: user }) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView>
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
                <ProfileImage user={user} />

                {user?.displayName && user ? (
                  <Text style={styles.helloText}>
                    {"Hello, " + user?.displayName}
                  </Text>
                ) : (
                  <Text style={styles.helloText}>{"Hello, Guest User"}</Text>
                )}
              </View>
              <TouchableOpacity style={{}}>
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

            {/* <SearchBar styleContainer={{ marginTop: 16 }} /> */}
            <GridCategories />
            <PosterImage />
          </View>
        </ScrollView>
        <BottomNavigation />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const NotificationButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{}}>
      <Image
        style={{
          width: 32,
          height: 32,
        }}
        source={Resources.icons.ic_notification}
      />
    </TouchableOpacity>
  );
};

const ProfileImage = ({ user }) => {
  return (
    <View>
      <Image
        style={styles.roundImage}
        source={
          user?.photoURL
            ? { uri: user?.photoURL }
            : Resources.icons.ic_placeholder
        }
      />
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

const BottomNavigation = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        paddingVertical: 8,
      }}
    >
      <BottomNavigationItem
        style={{ flex: 1 }}
        textLabel={"Home"}
        imageSource={Resources.icons.ic_home}
      />
      <BottomNavigationItem
        style={{ flex: 1 }}
        textLabel={"Bookings"}
        imageSource={Resources.icons.ic_calendar}
      />
      <BottomNavigationItem
        style={{ flex: 1 }}
        textLabel={"Profile"}
        imageSource={Resources.icons.ic_person}
      />
    </View>
  );
};

const BottomNavigationItem = ({ style, textLabel, imageSource }) => {
  return (
    <View
      style={[
        {
          flexDirection: "column",
          alignItems: "center",
        },
        style,
      ]}
    >
      <Image
        style={{
          tintColor: Resources.colors.gray_1,
          width: 24,
          height: 24,
        }}
        source={imageSource}
      />

      <Text
        style={{
          color: Resources.colors.gray_1,
          fontSize: 13,
          fontWeight: "300",
        }}
      >
        {textLabel}
      </Text>
    </View>
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
  const navigation = useNavigation()

  const [user, setUser] = useState(null);
  const onClickSignIn = React.useCallback(() => {
    navigation.navigate("Login")
  
  },[])
  const onClickSignUp = React.useCallback(() => {
    navigation.navigate("SignUp")
  })
  useEffect(() => {
    const fetchUser = async () => {
      let currentUser;
      if (Platform.OS === "web") {
        currentUser = firebaseAuth.currentUser; // Web
      } else {
        currentUser = auth().currentUser; // Mobile
      }

      setUser(currentUser); // Set the user state
    };

    fetchUser();
  }, []);

  React.useEffect(() => {
    console.log(
      `User is ${JSON.stringify(user?.photoURL)} ${user?.displayName} `
    );
  }, [user]);

  if (Platform.OS === "web") {
    return <WebComponent user={user} onClickSignIn={onClickSignIn} onClickSignUp={onClickSignUp}/>;
  }

  return <MobileComponent user={user} />;
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
