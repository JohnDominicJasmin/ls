import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Resources from "../src/Resources";
import SearchBar from "../screens/auth/components/SearchBar";
import { ProfileImage, NotificationButton } from "../screens/jobs/HomeScreen";

const NavigationBar = ({
  user,
  userPhoto,
  onClickProfileSelection,
  onClickNotification,
  onClickSignIn,
  onClickSignUp,
  onClickBookings,
  onClickSearch,
  isAccountPremium
}) => {
  return (
    <View
      style={{
        width: "100%",
        paddingVertical: 8,
        height: "auto",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 8,
      }}
    >
      <View
        style={{
          flex: 1,
          marginLeft: 32,
        alignItems: "center",

          flexDirection: "row",
        }}
      >
        <Image
          source={Resources.icons.app_logo}
          style={{ height: 64, width: 64 }}
        />

        <TouchableOpacity onPress={onClickBookings}>
          <Text style={{
            color: Resources.colors.black,
            fontSize: 16
          }}>{"Bookings"}</Text>
        </TouchableOpacity>
      </View>

      <SearchBar isEditable={false} styleContainer={{ marginTop: 16, width: 400 }} onPress={onClickSearch} />

      {user && !user?.isAnonymous && (
        <ProfileImage
        isAccountPremium={isAccountPremium}
          user={user}
          photoUrl={userPhoto}
          onPress={onClickProfileSelection}
        />
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
  );
};

export default NavigationBar;
