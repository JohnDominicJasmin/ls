import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import Resources from "../../src/Resources";
import BackIcon from "../../ui/BackIcon";
import React, { useState } from "react";
import { Button, Dialog, CheckBox, ListItem, Avatar } from "@rneui/themed";
import { BulletPoints } from "./PaymentPremium";
import { cancelPremium } from "../../utils/userDb";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";

function CancelPremiumScreen({ route }) {
  const { userId } = route.params;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelPremiumDialogVisible, setCancelDialogVisibility] =
    useState(false);
  const onClickCancelPremium = React.useCallback(() => {
    setCancelDialogVisibility(true);
  }, []);

  const confirmBookingCancellation = React.useCallback(async () => {
    setCancelDialogVisibility(false);
    setIsLoading(true);
    await cancelPremium(
      userId,
      () => {
        setIsLoading(false);
        console.log(`Booking Cancellation success`);
        navigation.navigate("Profile");
      },
      () => {
        setIsLoading(false);
      }
    );
  }, [userId]);

  const dismissCancelPremiumDialog = React.useCallback(() => {
    setCancelDialogVisibility(false);
  }, []);
  return (
    <>
      <Dialog
        isVisible={isCancelPremiumDialogVisible}
        onBackdropPress={dismissCancelPremiumDialog}
      >
        <Dialog.Title title="Cancel Subscription" />
        <Text>Are you sure you want to cancel your premium subscription?</Text>
        <View style={{ justifyContent: "center" }}>
          <Text
            style={{
              alignSelf: "center",
              marginTop: 20,
            }}
          >
            You will lose access to:
          </Text>
          <BulletPoints />
        </View>
        <Dialog.Actions>
          <Dialog.Button
            title="Cancel Subscription"
            onPress={confirmBookingCancellation}
          />
          <Dialog.Button
            title="Keep Premium"
            onPress={dismissCancelPremiumDialog}
          />
        </Dialog.Actions>
      </Dialog>

      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={{
          color: Resources.colors.white,
        }}
      />

      <View
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
          backgroundColor: Resources.colors.white,
        }}
      >
        <ScrollView>
          <View>
            <BackIcon
              style={{
                top: 14,
                left: 14,
              }}
            />

            <View
              style={{
                flexDirection: "column",
                marginTop: 24,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Image
                source={Resources.images.ic_cancel_premium}
                style={{
                  resizeMode: "center",
                  borderWidth: 1,
                  height: 450,
                  width: 400,
                }}
              />

              <Text
                style={[
                  {
                    fontSize: 24,
                    fontWeight: "bold",
                    textAlign: "center",
                    paddingHorizontal: 20,
                  },
                ]}
              >
                {"Manage your Premium Subscription"}
              </Text>

              <Text
                style={[
                  { textAlign: "center", paddingHorizontal: 16, marginTop: 8 },
                ]}
              >
                {
                  "If you no longer need premium features, you can cancel your subscription anytime. Your account will return to the free version with standard access to services."
                }
              </Text>

              <TouchableOpacity
                style={{
                  backgroundColor: Resources.colors.royalBlue,
                  paddingVertical: 16,
                  paddingHorizontal: 32,
                  borderRadius: 8,
                  marginTop: 40,
                }}
                onPress={onClickCancelPremium}
              >
                <Text
                  style={{
                    color: Resources.colors.white,
                    fontSize: 16,
                  }}
                >
                  {"Cancel Premium"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

export default CancelPremiumScreen;
